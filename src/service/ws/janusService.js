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
    if (this.connection === null) {
      this.connection = await this.api.createConnection();
      this.session = await this.connection.createSession();
      this.audioBridgePlugin = await this.session.attachPlugin("janus.plugin.audiobridge");
    }

    return this.connection;
  }

  async createAudioRoom() {
    return (await this.audioBridgePlugin.create()).getPluginData();
  }


}

const janusService = new JanusService(janus);

export default janusService;
