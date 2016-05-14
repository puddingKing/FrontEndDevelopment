var mongoose = require('mongoose');
var ImageSchema = require('../schemas/image');
var UserImage = mongoose.model('UserImage',ImageSchema);

module.exports = UserImage;