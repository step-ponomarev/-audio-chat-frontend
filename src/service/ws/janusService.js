import janus from "@/plugins/janus";

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
}

const janusService = new JanusService(janus);

export default janusService;
