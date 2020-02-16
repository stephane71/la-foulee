import getCredentials, { isCredentialsNeedsRefresh } from "./getCredentials";
import getAPIGatewayClient from "./getAPIGatewayClient";

export default class Api {
  constructor() {
    this.api = [];
    this.awaitingCredentials = Promise.resolve(null);
  }

  async getAPI(name) {
    if (isCredentialsNeedsRefresh(this.credentials)) {
      const credentials = await this.awaitingCredentials;
      if (!credentials) {
        this.awaitingCredentials = getCredentials(this.credentials);
      }
      this.credentials = await this.awaitingCredentials;
    }

    if (!this.api[name]) {
      this.api[name] = getAPIGatewayClient(name, this.credentials);
    }

    return this.api[name];
  }
}
