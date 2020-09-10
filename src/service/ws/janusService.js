import { Janus } from 'janus-gateway';
import store from "@/store";

import { onJenusSuccessfullyCreated, onJenusFailedCreated, onJunusDestroyed } from "@/service/ws/jenusCallbacks";

const PLUGIN = {
  AUDIO_BRIDGE: "janus.plugin.audiobridge"
}

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
    this._audioBridge = null;
    this._audioElement = null;
    this._isWebRtcUp = false;
  }

  attachPlugin({ roomId, userId }) {
    this.janus.attach(
      {
        plugin: PLUGIN.AUDIO_BRIDGE,
        success: (pluginHandle) => {
          this._audioBridge = pluginHandle;
          this._joinRoom(pluginHandle, { roomId, userId });
        },
        error
          (cause) {
          console.error(cause);
        },
        consentDialog(on) {
          console.log(on);
        },
        onmessage: (msg, jsep) => {
          this._handleEvent(msg);
          this._handleJsep(jsep);
        },
        onlocalstream: (stream) => {
          //TODO: Убрать
          console.error("Local", stream);
        },
        onremotestream: (stream) => {
          this._audioElement.srcObject = stream;
          //TODO: прочитать про то, как метод работает
          //Janus.attachMediaStream(this.audioElement, stream);
        },
        oncleanup: () => {

        },
        detached: () => {

        }
      });
  }

  startAudioTranslation() {
    if (this._audioBridge === null) {
      return;
    }

    this._audioBridge.createOffer(
      {
        media: { video: false, audio: true },
        success: (jsep) => {
          const publish = { "request": "configure", "muted": true };
          this._audioBridge.send({ "message": publish, "jsep": jsep });
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  /**
   *
   * @param {boolean} isMicActive value to configure microphone state
   */
  configureMicrophoneSettings(isMicActive) {
    if (this._audioBridge === null) {
      return;
    }

    const muted = !isMicActive;
    const publish = { "request": "configure", "muted": muted };

    this._audioBridge.send({ "message": publish });
  }

  setAudioElement(element) {
    this._audioElement = element;
  }

  _joinRoom(plugin, { roomId, userId }) {
    const message = {
      request: "join",
      room: roomId,
      id: userId
    }

    plugin.send({ message });
  }

  /**
   *
   * @param {String} event
   * @private
   */
  _handleEvent(msg) {
    const event = msg['audiobridge'];

    if (event === undefined || event === null) {
      return;
    }

    switch (event) {
      case "joined":
        this._handleJoinedEvent();
        break;
      case "event": {
        this._handleChangedMicState(msg);
        break;
      }
    }
  }

  _handleJoinedEvent() {
    if (this._isWebRtcUp) {
      return;
    }

    this._isWebRtcUp = true;
    this.startAudioTranslation();
  }

  _handleJsep(jsep) {
    if (jsep === undefined || jsep === null) {
      return;
    }

    this._audioBridge.handleRemoteJsep({ jsep: jsep });
  }

  _handleChangedMicState(msg) {
    const guests = msg['participants'];

    if (guests === null || guests === undefined) {
      return;
    }

    const { dispatch } = store;
    guests.forEach(g => {
      const voiceState = {
        id: g.id,
        voiceState: !g.muted
      }

      dispatch('guest/setVoiceState', voiceState);
    });
  }
}

const janusService = new JanusService(onJenusSuccessfullyCreated, onJenusFailedCreated, onJunusDestroyed);

export default janusService;
