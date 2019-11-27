const jwt = require('jsonwebtoken');

class JWT {

  mint(username, role='datafest') {
    return jwt.sign({username, role}, process.env.PGPASSWORD);
  }

  verify(token) {
    return jwt.verify(token, process.env.PGPASSWORD);
  }

}

module.exports = new JWT();