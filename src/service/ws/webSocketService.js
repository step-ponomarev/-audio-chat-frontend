import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import { onUserJoined, onUserLeaved, getCurrentUser, onMessageReceived } from "@/service/ws/callBacks";

class RoomSocketService {
  constructor() {
    this.stompClient = null;
  }

  init(roomId) {
    this.stompClient = Stomp.over(
      new SockJS('http://localhost:8080/chat-app')
    );

    const successCallBack = () => {
      this.stompClient.subscribe(`/user/queue/room/${ roomId }/guestHasJoined`, onUserJoined);
      this.stompClient.subscribe(`/queue/room/${ roomId }/guestHasLeaved`, onUserLeaved);
      this.stompClient.subscribe(`/user/queue/room/${ roomId }/currentUser`, getCurrentUser);
      this.stompClient.subscribe(`/queue/room/${ roomId }/newMessage`, onMessageReceived);

      this.stompClient.send(`/app/room/${ roomId }/registerGuest`);
    }

    const errorCallback = (e) => {
      console.error("FAILED WS CONNECTION", e);
    }

    this.stompClient.connect({}, successCallBack, errorCallback);
  }

  sendMessage(msg) {
    if (this.stompClient === null) {
      throw new Error("Failed message sending");
    }

    this.stompClient.send(`/app/sendMessage`, {}, msg);
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect(() => {
      });
    }
  }
}

const roomSocketService = new RoomSocketService();

export default roomSocketService;
