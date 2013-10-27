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

  // article routes
  app.get('/titles', titles.index)
  //app.get('/titles/new', auth.requiresLogin, titles.new)
  //app.post('/titles', auth.requiresLogin, titles.create)
  app.get('/titles/:id', titles.show)
  //app.get('/titles/:id/edit', articleAuth, titles.edit)
  //app.put('/titles/:id', articleAuth, titles.update)
  //app.del('/titles/:id', articleAuth, titles.destroy)

  app.param('id', titles.load)

  // home route
  app.get('/', titles.index)
}
