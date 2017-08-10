var should = require('should');
var sinon = require('sinon');

describe('Book Controller Tests:', function() {
  describe('Post', function() {
    it('should not allow an empty title on post', function() {

      var Book = function(book) {
        this.save = function() {}
      };

      var req = {
        body: {
          author: 'Jon'
        }
      }

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      }

      res.status.callledWith(400).should.equal(true, 'Bad Status' + res.status.args[0][0]);
    });
  });
});