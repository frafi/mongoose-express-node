
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
  var User = mongoose.model('User')

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
 * New Title
 */

exports.new = function(req, res){
  res.render('titles/new', {
    title: 'New Title',
    title: new Title({})
  })
}

/**
 * Create an Title
 */

exports.create = function (req, res) {
  var title = new Title(req.body)
  title.user = req.user

  title.uploadAndSave(req.files.image, function (err) {
    if (!err) {
      req.flash('success', 'Successfully created Title!')
      return res.redirect('/titles/'+title._id)
    }

    res.render('titles/new', {
      title: 'New Title',
      title: title,
      errors: utils.errors(err.errors || err)
    })
  })
}

/**
 * Edit an Title
 */

exports.edit = function (req, res) {
  res.render('titles/edit', {
    title: 'Edit ' + req.title.title,
    title: req.title
  })
}

/**
 * Update Title
 */

exports.update = function(req, res){
  var title = req.title
  title = _.extend(title, req.body)

  Title.uploadAndSave(req.files.image, function(err) {
    if (!err) {
      return res.redirect('/titles/' + title._id)
    }

    res.render('titles/edit', {
      title: 'Edit Title',
      title: title,
      errors: err.errors
    })
  })
}

/**
 * Show
 */

exports.show = function(req, res){
  res.render('titles/show', {
    title: req.title.title,
    title: req.title
  })
}

/**
 * Delete an Title
 */

exports.destroy = function(req, res){
  var title = req.title
  title.remove(function(err){
    req.flash('info', 'Deleted successfully')
    res.redirect('/titles')
  })
}
