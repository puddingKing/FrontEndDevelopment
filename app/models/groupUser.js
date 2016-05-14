var mongoose = require('mongoose');
var GroupUserSchema = require('../schemas/groupUser');
var GroupUser = mongoose.model('GroupUser',GroupUserSchema);

module.exports = GroupUser;