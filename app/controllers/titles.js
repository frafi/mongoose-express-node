
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
  Title.load(id, function (err, title) {
    if (err) return next(err)
    if (!title) return next(new Error('not found item'))
    req.title = title
    next()
  })
}

/**
 * List
 */
exports.index = function(req, res){
  if (typeof(req.param('title')) !== "undefined") {
 	var regExpSearch = (req.param('title') != '') ? new RegExp(req.param('title'), "i") : /./
 	var searchTitle = (req.param('title') != 'undefined' && req.param('title') != '') ? '/'+req.param('title')+'/i' : ''
    var page = (req.param('page') > 0 ? req.param('page') : 1) - 1
    var perPage = 30
    var options = {
      perPage: perPage,
      page: page,
      criteria: {
    	TitleNameSortable: regExpSearch
      }
    }
    Title.list(options, function(err, titles) {
      if (err) return res.render('500')
      Title.count().exec(function (err, count) {
        res.render('titles/index', {
          title: 'Movie Titles',
          titles: titles,
          page: page + 1,
          pages: Math.ceil(count / perPage)
        })
      })
    })  
  }
  else
  {
  	res.render('titles/index', {
      title: 'Movie Titles',
      titles: []
    })
  }
}

/**
 * Show
 */
exports.show = function(req, res){
  res.render('titles/show', {
    title: req.title
  })
}

