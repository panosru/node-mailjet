// Dependencies
var
    vows          = require('vows')
  , chai          = require('chai')
  , Mailjet       = require('../index')
  , fixtures      = require('./fixtures')
  , EventEmitter  = require('events').EventEmitter
  , suite         = vows.describe('Help Methods')
  , assert        = chai.assert
  , expect        = chai.expect
  , should        = chai.should()
;

suite.addBatch({
  'List all categories of methods available and documented in our API.' : {
    topic : function () {
      var mailjet = new Mailjet(fixtures.apiKey, fixtures.secretKey);
          mailjet.sendRequest('HelpCategories', this.callback);
    },
    'Categories Method - GET' : function (err, status) {
      assert.equal(status, 200);
    }
  },
  'Description of a category and embeded methods available and documented in our API.' : {
    topic : function () {
      var mailjet = new Mailjet(fixtures.apiKey, fixtures.secretKey, { secure : false} );
          mailjet.sendRequest('HelpCategory', { name : 'Help' }, this.callback);
    },
    'Category Method - GET' : function (err, status) {
      assert.equal(status, 200);
    }
  },
  'Description of a specific method available and documented in our API.' : {
    topic : function () {
      var mailjet = new Mailjet(fixtures.apiKey, fixtures.secretKey, { secure : false} );
          mailjet.sendRequest('HelpMethod', { name : 'HelpMethod' }, this.callback);
    },
    'Method Method - GET' : function (err, status) {
      assert.equal(status, 200);
    }
  },
  'Lists all methods of a specific category available and documented in our API.' : {
    topic : function () {
      var mailjet = new Mailjet(fixtures.apiKey, fixtures.secretKey, { secure : false} );
          mailjet.sendRequest('HelpMethods', { category : 'Help' }, this.callback);
    },
    'Methods Method - GET' : function (err, status) {
      assert.equal(status, 200);
    }
  },
  'Response status and status code you\'ll encounter when calling our API.' : {
    topic : function () {
      var mailjet = new Mailjet(fixtures.apiKey, fixtures.secretKey, { secure : false} );
      mailjet.sendRequest('HelpStatus', { code : 400 }, this.callback);
    },
    'Status Method - GET' : function (err, status) {
      assert.equal(status, 200);
    }
  }
}).export(module);