var mongoose = require('mongoose');
var LayoutsSchema = require('../schemas/layouts');
var Layouts = mongoose.model('Layouts',LayoutsSchema);

module.exports = Layouts;