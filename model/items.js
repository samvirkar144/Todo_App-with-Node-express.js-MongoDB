var mongoose = require('mongoose');
const { string } = require('yargs');
var Schema = mongoose.Schema;

itemSchema = new Schema( {
	unique_id: Number,
	name: String,
	price: String
}),
Item = mongoose.model('items', itemSchema);

module.exports = Item;