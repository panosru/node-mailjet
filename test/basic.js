// Dependencies
var
    vows          = require('vows')
  , chai          = require('chai')
  , Mailjet       = require('../index')
  , fixtures      = require('./fixtures')
  , EventEmitter  = require('events').EventEmitter
  , suite         = vows.describe('Module Tests')
  , assert        = chai.assert
  , expect        = chai.expect
  , should        = chai.should()
;

suite.addBatch({
  'Secure Connection' : {
    topic : function () {
      var mailjet = new Mailjet(fixtures.apiKey, fixtures.secretKey);
          mailjet.sendRequest('HelpStatus', this.callback);
    },
    'returns status 200' : function (err, status) {
      assert.equal(status, 200);
    }
  },
  'Non Secure Connection' : {
    topic : function () {
      var mailjet = new Mailjet(fixtures.apiKey, fixtures.secretKey, { secure : false} );
          mailjet.sendRequest('HelpStatus', this.callback);
    },
    'returns status 200' : function (err, status) {
      assert.equal(status, 200);
    }
  }
}).export(module);