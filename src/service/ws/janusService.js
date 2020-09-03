import janus from "@/plugins/janus";

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


class JanusService {
  /**
   *
   * @param {Janus} janusApi
   */
  constructor(janusApi) {
    this.api = janusApi;
    this.connection = null;
    this.session = null;
    this.audioBridgePlugin = null;
  }

  /**
   *
   * @param {String} id
   * @returns {Promise<void>}
   */
  async connect() {
    try {
      if (this.connection === null) {
        this.connection = await this.api.createConnection();
        this.session = await this.connection.createSession();

        this.audioBridgePlugin = await this.session.attachPlugin("janus.plugin.audiobridge");
        this.audioBridgePlugin.createPeerConnection(iseServers);
        await this.audioBridgePlugin.createOffer();

        // await this.audioBridgePlugin.createPeerConnection(iseServers);

        // this.audioBridgePlugin.getPeerConnection().ontrack = (e) => console.log(e);
        //

        this.audioBridgePlugin.on('message', async (response) => {
          const jsep = response.get('jsep');

          if (jsep) {
            console.log(jsep);
            await this.audioBridgePlugin.setRemoteSDP(jsep);
          }
        });

        this.audioBridgePlugin.on('remotestream', async (stream) => {
          console.error("KEK", stream);
        });

        this.audioBridgePlugin.on('localstream', async (stream) => {
          console.error("LOL", stream);
        });

        // this.connection.on("*", (m) => console.warn(m));
      }

      return this.connection;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async createAudioRoom() {
    try {
      return (await this.audioBridgePlugin.create()).getPluginData();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async joinAudioRoom(id) {
    try {
      await this.audioBridgePlugin.join(id);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async leaveAudioRoom() {
    try {
      this.audioBridgePlugin.leave();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   *
   * @param {Object} config
   * @param {} jsep
   * @returns {Promise<any>}
   */
  async configureAudioBridgePlugin(config = { muted: false }, jsep) {
    try {
      console.log(jsep)
      return await this.audioBridgePlugin.configure(config, jsep);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   *
   * @param { MediaStream } stream
   * @returns {Promise<never>}
   */
  async openAndSendAudioStream() {
    try {
      const stream = await this.audioBridgePlugin.getUserMedia({ audio: true });

      await this.audioBridgePlugin.setRemoteSDP(await this.audioBridgePlugin.offerStream(stream, {}, iseServers));
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

const janusService = new JanusService(janus);

export default janusService;
