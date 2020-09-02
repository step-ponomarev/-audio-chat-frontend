import janus from "@/plugins/janus";

class JanusService {
  /**
   *
   * @param {Janus} janusApi
   */
  constructor(janusApi) {
    this.api = janusApi;
  }

  /**
   *
   * @param {String} id
   * @returns {Promise<void>}
   */
  async getConnection(id) {
    return await this.api.createConnection(id);
  }
}

const janusService = new JanusService(janus);

export default janusService;
