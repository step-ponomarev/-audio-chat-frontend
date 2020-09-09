import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import { onUserJoined, onUserLeaved, getCurrentUser, onMessageReceived } from "@/service/ws/wsCallbacks";

class RoomSocketService {
  constructor() {
    this._stompClient = null;
  }

  init(roomId) {
    this._stompClient = Stomp.over(
      new SockJS('http://localhost:8080/chat-app')
    );

    const successCallBack = () => {
      this._stompClient.subscribe(`/user/queue/room/${ roomId }/guestHasJoined`, onUserJoined);
      this._stompClient.subscribe(`/queue/room/${ roomId }/guestHasLeaved`, onUserLeaved);
      this._stompClient.subscribe(`/user/queue/room/${ roomId }/currentUser`, getCurrentUser);
      this._stompClient.subscribe(`/queue/room/${ roomId }/newMessage`, onMessageReceived);

      this._stompClient.send(`/app/guest/room/${ roomId }/registerGuest`);
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
  sendMessage(roomId, msg) {
    if (this._stompClient === null) {
      throw new Error("Failed message sending");
    }

    this._stompClient.send(`/app/message/room/${ roomId }/sendMessage`, {}, msg);
  }

  disconnect() {
    if (this._stompClient !== null) {
      this._stompClient.disconnect(() => {
      });
    }
  }
}

const roomSocketService = new RoomSocketService();

export default roomSocketService;
