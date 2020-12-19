import getCredentials, { isCredentialsNeedsRefresh } from "./getCredentials";
import getAPIGatewayClient from "./getAPIGatewayClient";

export async function getApi(name) {
  // const credentials = await getCredentials();
  // return getAPIGatewayClient(name, credentials);
  return getAPIGatewayClient(name);
}

export default class Api {
  constructor() {
    this.api = {};
    this.awaitingCredentials = Promise.resolve(null);
    this.credentials = {};
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


