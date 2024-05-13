# hcaptcha

Verify hCaptcha/recaptcha/cf turnstile tokens

## Install

```
npm install node-challenges-validation
```

## Usage

```js
const {recaptcha, hcaptcha, turnstile} = require('hcaptcha');

const recaptcha_secret = 'recaptcha secret';
const recaptcha_token = 'token obtained from captcha widget';

recaptcha(secret, token)
  .then((data) => {
    if (data.success === true) {
      console.log('success!', data);
    } else {
      console.log('verification failed');
    }
  })
  .catch(console.error);
```
