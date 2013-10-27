
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Title = mongoose.model('Title')
  , utils = require('../../lib/utils')
  , _ = require('underscore')

/**
 * Load
 */

exports.load = function(req, res, next, id){
  //var User = mongoose.model('Title')

  Title.load(id, function (err, title) {
    if (err) return next(err)
    if (!title) return next(new Error('not found'))
    req.title = title
    next()
  })
}

/**
 * List
 */

exports.index = function(req, res){
  var page = (req.param('page') > 0 ? req.param('page') : 1) - 1
  var perPage = 30
  var options = {
    perPage: perPage,
    page: page
  }

  Title.list(options, function(err, titles) {
    if (err) return res.render('500')
    Title.count().exec(function (err, count) {
      res.render('titles/index', {
        title: 'Titles',
        titles: titles,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      })
    })
  })  
}

/**
 * Show
 */

exports.show = function(req, res){
  res.render('titles/show', {
    title: req.title.TitleName,
    title_item: req.title
  })
}

