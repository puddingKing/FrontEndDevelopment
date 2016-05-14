var mongoose = require('mongoose');
var LayoutSchema = require('../schemas/layout');
var Layout = mongoose.model('Layout',LayoutSchema);

module.exports = Layout;