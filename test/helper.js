
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , async = require('async')
  , Title = mongoose.model('Title')

/**
 * Clear database
 *
 * @param {Function} done
 * @api public
 */

exports.clearDb = function (done) {
  async.parallel([
    function (cb) {
      Title.collection.remove(cb)
    }
  ], done)
}
