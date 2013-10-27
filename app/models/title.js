
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
  TitleId: {type : Number },
  TitleName: {type : String, default : '', trim : true},
  TitleType: {type : String, default : '', trim : true},
  TitleTypeCode: {type : String, default : '', trim : true},
  ReleaseYear: {type : Number},
  TitleTypeCode: {type : String, default : '', trim : true}
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

  load: function (tid, cb) {
  	console.log("Search id is "+ tid)
  	this.findOne({ "_id" : "\""+tid+"\"" })
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
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }

}

mongoose.model('Title', TitleSchema)
