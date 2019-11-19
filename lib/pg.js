const {Pool} = require('pg');

class Pg {

  constructor() {
    this.connected = false;
    this.client = new Pool();
  }

  async connect() {
    if( this.connected ) return;
    this.connected = true;
    return this.client.connect();
  }

  async query(cmd, args) {
    await this.connect();
    return this.client.query(cmd, args);
  }

}

module.exports = new Pg();