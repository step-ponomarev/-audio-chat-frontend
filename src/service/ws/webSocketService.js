import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";
import { onUserJoined, onUserLeaved, getCurrentUser } from "@/service/ws/callBacks";

class RoomSocketService {
  constructor() {
    this.stompClient = null;
  }

  init() {
    this.stompClient = Stomp.over(
      new SockJS('http://localhost:8080/chat-app')
    );
  }

  /**
   *
   * @param {String} roomId
   * @param {Function} errorCallback
   */
  connect(roomId, errorCallback) {
    const successCallBack = () => {
      this.stompClient.subscribe(`/user/queue/room/${ roomId }/guestHasJoined`, onUserJoined);
      this.stompClient.subscribe(`/queue/room/${ roomId }/guestHasLeaved`, onUserLeaved);
      this.stompClient.subscribe(`/user/queue/room/${ roomId }/currentUser`, getCurrentUser);

      this.stompClient.send(`/app/room/${ roomId }/registerGuest`);
      console.warn('SOCKED SUCCESSFUL CONNECTED');
    }

    this.stompClient.connect({}, successCallBack, errorCallback);
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
