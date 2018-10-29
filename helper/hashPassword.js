const crypto = require('crypto');

const hashPassword = (password,salt) => {

    const hashedPassword = crypto.pbkdf2Sync(password,salt,10000,512,'sha512');
    return ["pbkdf2Sync","10000",salt,hashedPassword.toString('hex')].join('$');

}

module.exports = hashPassword;
