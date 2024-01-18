const { auth } = require("express-oauth2-jwt-bearer");

class Authentication {
    oauth2 = auth({
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        issuer: process.env.ISSUER,
        jwksUri: process.env.JWKS_URI,
        audience: process.env.AUDIENCE,
      });
}

module.exports = new Authentication();