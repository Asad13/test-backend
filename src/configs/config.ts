import type { Server } from 'http';

class Config {
  private _server: Server | null;

  constructor() {
    this._server = null;
  }

  get server(): Server | null {
    return this._server;
  }

  set server(s: Server | null) {
    this._server = s;
  }
}

const config = new Config();

export default config;
