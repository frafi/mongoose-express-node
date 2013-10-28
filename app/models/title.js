
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema
  , ObjectId = mongoose.Types.ObjectId

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
  TitleNameSortable: {type : String, default : '', trim : true},
  TitleType: {type : String, default : '', trim : true},
  TitleTypeCode: {type : String, default : '', trim : true},
  ReleaseYear: {type : Number},
  TitleTypeCode: {type : String, default : '', trim : true},
  PerformanceMode: {type : String, default : '', trim : true},
  AnimationMode: {type : String, default : '', trim : true},
  Genres: [ {type: String} ],
  Ratings: [ {
    RatingDescriptors: [{ Rating: {type: String} }],
  	RatingSystem: {type: String} 
  }],
  OtherNames: [{
  	TitleNameLanguage: {type: String},
  	TitleNameType: {type: String},
  	TitleName: {type: String}	
  }],
  Storylines: [{
  	Description: {type:String},
  	Language: {type: String},
  	Type: {type:String}
  }],
  Participants: [{
  	RoleType: {type: String},
  	IsOnScreen: {type: Boolean},
  	IsKey: {type: Boolean},
  	ParticipantType: {type: String},
  	Name: {type: String},
  	ParticipantId: {type: Number}
  }],
  Awards : [{
  	AwardWon: {type: Boolean},
  	AwardYear: {type: Number},
  	Participants: [{type:String}],
  	Award: {type: String},
  	AwardCompany: {type: String}
  }],
  NetworkLevels: [{type:String}],
  ExternalSources: [{
  	Key: {type: Number},
  	Name: {type: String}
  }]
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
   	  this.findOne({ TitleId : id} )
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
      .sort({'TitleNameSortable': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }

}

mongoose.model('Title', TitleSchema)
