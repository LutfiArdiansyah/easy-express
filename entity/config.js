class Config {
  env = process.env.NODE_ENV;
  port = process.env.PORT;

  get env() {
    return this.env;
  }

  get port() {
    return this.port;
  }
}

module.exports = Config;
