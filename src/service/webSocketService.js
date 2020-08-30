import SockJS from 'sockjs-client';
import { Stomp } from "@stomp/stompjs";

class WebSocketService {
  constructor() {
    this.stompClient = Stomp.over(
      new SockJS('http://localhost:8080/chat-app')
    );
  }

  /**
   *
   * @param {Function} successCallBack
   * @param {Function} errorCallback
   */
  connect(successCallBack, errorCallback) {
    this.stompClient.connect({}, successCallBack, errorCallback);
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }
}

const webSocketService = new WebSocketService();

export default webSocketService;
