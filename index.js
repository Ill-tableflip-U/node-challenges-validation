const https = require('https');
const querystring = require('querystring');
const verify = (host, path, secret, token, remoteip = null, sitekey = null) => {
  return new Promise(function verifyPromise(resolve, reject) {
    const payload = {secret, response: token};
    if (remoteip) {
      payload.remoteip = remoteip;
    }
    if (sitekey) {
      payload.sitekey = sitekey;
    }
    const data = querystring.stringify(payload);
    const options = {
      host,
      path,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'content-length': Buffer.byteLength(data),
      },
    };
    const request = https.request(options, (response) => {
      response.setEncoding('utf8');

      let buffer = '';

      response
        .on('error', reject)
        .on('data', (chunk) => buffer += chunk)
        .on('end', () => {
          try {
            const json = JSON.parse(buffer);
            resolve(json);
          } catch (error) {
            reject(error);
          }
        });
    });

    request.on('error', reject);
    request.write(data);
    request.end();
  });
};

const hcaptcha = (secret, token, remoteip = null, sitekey = null) => {
  verify('hcaptcha.com', '/siteverify', secret, token, remoteip, sitekey)
}
const turnstile = (secret, token, remoteip = null, sitekey = null) => {
  verify('challenges.cloudflare.com', '/turnstile/v0/siteverify, secret, token, remoteip, sitekey)
}
const recaptcha = (secret, token, remoteip = null, sitekey = null) => {
  verify('www.google.com', '/recaptcha/api/siteverify, secret, token, remoteip, sitekey)
}

module.exports = {
  verify,
  hcaptcha,
  recaptcha,
  turnstile
};
