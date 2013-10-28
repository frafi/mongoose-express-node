/*!
 * Module dependencies.
 */

var async = require('async')

/**
 * Controllers
 */

var titles = require('../app/controllers/titles')
/**
 * Expose routes
 */

module.exports = function (app) {

  // title routes
  app.get('/titles', titles.index)
  app.get('/titles/:id', titles.show)

  app.param('id', titles.load)

  // home route
  app.get('/', titles.index)
}
