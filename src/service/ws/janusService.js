import { Janus } from 'janus-gateway';

const iseServers = {
  'iceServers': [
    { 'urls': 'stun:stun.l.google.com:19302' },
    { 'urls': 'stun:stun1.l.google.com:19302' },
    { 'urls': 'stun:stun2.l.google.com:19302' },
    { 'urls': 'stun:stun3.l.google.com:19302' },
    { 'urls': 'stun:stun4.l.google.com:19302' },
    { 'urls': 'stun:stun01.sipphone.com' },
    { 'urls': 'stun:stun.rixtelecom.se' },
    { 'urls': 'stun:stun.schlund.de' },
    { 'urls': 'stun:stun.softjoys.com' },
    { 'urls': 'stun:stun.voipbuster.com' },
    { 'urls': 'stun:stun.voxgratia.org' },
    { 'urls': 'stun:stun.voipstunt.com' },
    { 'urls': 'stun:stun.voiparound.com' },
    { 'urls': 'stun:stun.xten.com' },
  ]
}

const socketServer = "ws://localhost:8188/";
const httpServer = "http://localhost:8088/janus";

class JanusService {
  /**
   *
   * @param {Function} success
   * @param {Function} error
   * @param {Function} destroyed
   */
  constructor(success, error, destroyed) {
    this.janus = new Janus({
      server: [
        socketServer, httpServer
      ],
      iseServers,
      success,
      error,
      destroyed
    });

    console.error(this.janus);
  }
}

const janusService = new JanusService();

export default janusService;
