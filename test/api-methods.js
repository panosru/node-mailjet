// Dependencies
var
    vows          = require('vows')
  , chai          = require('chai')
  , Mailjet       = require('../index')
  , fixtures      = require('./fixtures')
  , EventEmitter  = require('events').EventEmitter
  , suite         = vows.describe('API Methods')
  , assert        = chai.assert
  , expect        = chai.expect
  , should        = chai.should()
;

suite.addBatch({
  'Secure Connection' : {
    topic : function () {
      var HttpsMailjet = new Mailjet(fixtures.apiKey, fixtures.secretKey);
      HttpsMailjet.sendRequest('HelpStatus', this.callback);
    },
    'returns status 200' : function (err, status) {
      assert.equal(status, 200);
    }
  },
  'Non Secure Connection' : {
    topic : function () {
      var HttpMailjet = new Mailjet(fixtures.apiKey, fixtures.secretKey, { secure : false} );
      HttpMailjet.sendRequest('HelpStatus', this.callback);
    },
    'returns status 200' : function (err, status) {
      assert.equal(status, 200);
    }
  }
}).export(module);