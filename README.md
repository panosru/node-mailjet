Mailjet is a real-time Cloud Emailing platform: scalable, agile and flexible!
=======

Mailjet unique algorithm boosts your deliverability and the platform provides in-depth insight so you can optimize more than ever.

More info on [Mailjet.com](https://www.mailjet.com/)

Mailjet Web API
=======

Info on the API can be found [here](https://www.mailjet.com/docs/api)

Install
=======
To install maljet run `npm install mailjet`

Usage
=======

In order to use mailjet you need to require it and instantiate it first:

```js
var Mailjet = require('mailjet');

var instance = new Mailjet('APIKEY', 'SECRETKEY', {
  secure : true, // When true uses https when false it uses http, default is true
  output : 'json' // The output type you prefer, default is json, you can choose between php, json, xml, serialize, html, csv
});
```

The options object can be skiped so you can simply get an instance like this: `var instance = new Mailjet('APIKEY', 'SECRETKEY');` of course you replace *APIKEY* with your API key and *SECRETKEY* with your Secret key
To call a method from API you use `sendRequest` method. This method gets 4 optional parameters:

1. `method` *(String) / Required*: Is the method you need to call.
2. `params` *(Object) / Optional*: The params you want to send.
3. `request` *(String) / Optional*: The type of request you want to make, it's either `GET` or `POST`, by default is `GET`.
4. `cb` *(Function) / Optional*: This is the callback method that will be triggered when the API request is done. Callback returns 4 params as well:
    1. `err`: Error object in case of failure
    2. `status`: The request status code
    3. `data`: The returned data object *(WARNING: In case of API error (like internal errors) this may also be html instead of object)*
    4. `headers`: The returned headers
    

## Examples

### Usage with 3 params and a callback

```js
instance.sendRequest('userinfos', {}, 'GET', function (err, status, data, headers) {
  console.log('Error: ' + err);
  console.log('Status: ' + status);
  console.log('Data: '); console.log(data);
  console.log('Headers: '); console.log(headers);
});
```

In this example all the params are used.

### Usage with 2 params and a callback
    
```js
instance.sendRequest('userinfos', {}, function (err, status, data, headers) {
  console.log('Error: ' + err);
  console.log('Status: ' + status);
  console.log('Data: '); console.log(data);
  console.log('Headers: '); console.log(headers);
});
```

In this example the `request` param is omited.

### Usage with 1 param and a callback

```js
instance.sendRequest('userinfos', function (err, status, data, headers) {
  console.log('Error: ' + err);
  console.log('Status: ' + status);
  console.log('Data: '); console.log(data);
  console.log('Headers: '); console.log(headers);
});
```

In this example the `params` and `request` params are omited as we don't need them.

### Usage without a callback function

In case callback function is not provided then a promise is returned.

```js
var promise = instance.sendRequest('userinfos');

promise.once('complete', function (result) {
  if (result.status) {
    console.log(result);
  } else {
    // Handle error
  }
});
```

`result` in case of failure is an error object, otherwise it's an object with `status`, `data` and `headers` properties which are same as in callback method.


Deps, Tests & Lint
=======

Simply run `make` in mailjet root directory.

```
# make

* Project Tasks
make deps             Install Dependencies
make deps-clean       Removes the node_modules directory
make lint             Run Code Analysis tool (scans entire project)

* Test Suites
make tests            Run All tests
make test-basic       Run Basic tests (module specific tests)
make test-api         Run API Methods tests (test fixtures required)
make test-user        Run User Methods tests (test fixtures required)
make test-contact     Run Contact Methods tests (test fixtures required)
make test-lists       Run Lists Methods tests (test fixtures required)
make test-message     Run Message Methods tests (test fixtures required)
make test-report      Run Report Methods tests (test fixtures required)
make test-cleanup     Run Cleanup Methods tests (test fixtures required)
```