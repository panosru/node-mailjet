/**
 * Mailjet Public API
 *
 * @package  API v0.1
 * @author   panosru
 * @link     http://api.mailjet.com/
 *
 */

/**
 * Mailjet Constructor
 * 
 * @param {string} apiKey
 * @param {string} secretKey
 * @param {object} options
 * 
 * @constructor
 */
function Mailjet (apiKey, secretKey, options) {
  "use strict";
  
  // Check if API and Secret Keys are provided
  if (!apiKey || !secretKey)
    throw new Error('Both API and Secret keys are required.');

  // defaults
  options         = options || {};
  this.version    = '0.1';
  this.apiUrl     = 'api.mailjet.com';
  this.apiKey     = apiKey;
  this.secretKey  = secretKey;
  
  // Choose your output : php, json, xml, serialize, html, csv
  this.output     = options.output || 'json';
  
  // Connect thru https protocol
  this.secure     = (undefined === options.secure ) ? true : options.secure;

  /**
   * API Request URL Builder
   * 
   * @param {string} method
   * @param {object} params
   * @param {string} request
   * 
   * @return {String}
   */
  this.requestUrlPathBuilder = function (method, params, request) {    
    // Get Querystring module
    var querystring = require('querystring');
    
    // Query Object
    var query = { output : this.output };
    
    for (var key in params) {
      if ('output' === key) this.output = params[key];
      query[key] = params[key];
    }
    
    return '/' + this.version + '/' + method + '/?' + querystring.stringify(query);
  }
}

/**
 * Send request call to the API
 * 
 * @param {string} method
 * @param {object} params
 * @param {string} request
 * @param {function} cb
 *  
 * @return {Mixed}
 */
Mailjet.prototype.sendRequest = function () {
  "use strict";
  
  // convert arguments to array
  var
    args = [].slice.call(arguments, 0),
    method, params, request, cb
  ;
  
  switch (args.length) {
    case 2:
      if ('function' === typeof(args[1])) {
        cb = args[1];
      } else params = args[1]; 
      break;
    
    case 3:
      params  = args[1];
      if ('function' === typeof(args[2])) {
        cb = args[2];
      } else request = args[2];
      break;
    
    default:
      params  = args[1];
      request = args[2];
      cb      = args[3];
  }
  
  method  = args[0] || false;
  params  = params  || {};
  request = request || 'GET';

  // Validate request
  if (-1 === 'GET|POST'.indexOf(request))
    throw new Error('Request must be either GET or POST, "' + request + '" provided.')
  
  // Build URL Path
  var path = this.requestUrlPathBuilder(method, params, request);
  
  // Check if callback is provided
  if (!cb) {
    // Since callback is not provided we will need promise
    var 
      EventEmitter = require('events').EventEmitter,
      Promise      = new EventEmitter()
    ;
    // Set listener
    Promise.on('complete', function (message) {
      return message;
    });
  }
  
  // Get proper http module
  var http = require(this.secure ? 'https' : 'http');
  
  // Request options data object
  var options = {
    host    : this.apiUrl,
    method  : request,
    path    : path,
    auth    : this.apiKey + ':' + this.secretKey
  };
  
  var query_string = path.split('?')[1];
  
  // If request is POST set headers
  if ('POST' === request) {
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': query_string.length
    };
  }
  
  
  // Make request
  var req = http.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      var data = chunk;
      try { data = JSON.parse(data); } catch (e) {}
      if (cb) {
        cb(null, res.statusCode, data, res.headers);
      } else Promise.emit('complete', {
        status  : res.statusCode,
        data    : data,
        headers : res.headers
      });
    });
  });

  req.on('error', function(e) {
    if (cb) {
      cb(e);
    } else Promise.emit('complete', e);
  });
  
  // write data to request body
  req.write(query_string);
  req.end();

  if (!cb)
    return Promise;
}

module.exports = Mailjet;