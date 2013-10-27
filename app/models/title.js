
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema

/**
 * Getters
 */

var getTags = function (tags) {
  return tags.join(',')
}

/**
 * Setters
 */

var setTags = function (tags) {
  return tags.split(',')
}

/**
 * Title Schema
 */

var TitleSchema = new Schema({
  TitleName: {type : String, default : '', trim : true},
  TitleType: {type : String, default : '', trim : true}
})

/**
 * Methods
 */

TitleSchema.methods = {
}

/**
 * Statics
 */

TitleSchema.statics = {

  /**
   * Find Title by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      //.populate('user', 'name email username')
      //.populate('comments.user')
      .exec(cb)
  },

  /**
   * List Titles
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      //.populate('user', 'name username')
      //.sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }

}

mongoose.model('Title', TitleSchema)
