
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , should = require('should')
  , request = require('supertest')
  , app = require('../server')
  , context = describe
  , Title = mongoose.model('Title')
  , agent = request.agent(app)

var count

/**
 * Title tests
 */

describe('Titles', function () {
  describe('GET /titles', function () {
    it('should respond with Content-Type text/html', function (done) {
      agent
      .get('/titles')
      .expect('Content-Type', /html/)
      .expect(25)
      .expect(/Titles/)
      .end(done)
    })
  })
})
