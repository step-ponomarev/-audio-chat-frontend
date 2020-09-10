import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import {
  onUserJoined,
  onUserLeaved,
  onMessageReceived
} from "@/service/ws/wsCallbacks";

class RoomSocketService {
  constructor() {
    this._stompClient = null;
    this._socket = null;
  }

  //TODO: переписать на подписку по ID юзера
  init(roomId, userId) {
    this._socket = new SockJS('http://localhost:8080/chat-app')
    this._stompClient = Stomp.over(this._socket);

    const successCallBack = () => {
      this._stompClient.subscribe(`/queue/guest/${ userId }/room/${ roomId }/guestHasJoined`, onUserJoined);
      this._stompClient.subscribe(`/queue/room/${ roomId }/guestHasLeaved`, onUserLeaved);
      this._stompClient.subscribe(`/queue/room/${ roomId }/newMessage`, onMessageReceived);

      this._stompClient.send(`/app/guest/${ userId }/room/${ roomId }/registerGuest`);
    }

    const errorCallback = (e) => {
      console.error("FAILED WS CONNECTION", e);
    }

    this._stompClient.connect({}, successCallBack, errorCallback);
  }

  /**
   *
   * @param {String} roomId
   * @param {String} msg
   */
  sendMessage(roomId, guestId, msg) {
    if (this._stompClient === null) {
      throw new Error("Failed message sending");
    }

    this._stompClient.send(`/app/message/room/${ roomId }/guest/${ guestId }/sendMessage`, {}, msg);
  }

  disconnect() {
    if (this._stompClient !== null) {
      this._stompClient.disconnect(async () => {
      });
    }
  }
}

const roomSocketService = new RoomSocketService();

export default roomSocketService;
