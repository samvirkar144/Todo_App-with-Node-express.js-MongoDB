var mongoose = require('mongoose');
var Schema = mongoose.Schema;

itemSchema = new Schema( {
	unique_id: Number,
	name: String,
	price: String,
	quantity:Number
}),
Item = mongoose.model('items', itemSchema);

module.exports = Item;