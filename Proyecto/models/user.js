var mongoose	= require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/fotos");

var Schema = mongoose.Schema;

var user_schema = new mongoose.Schema({
	name: String,
	username: String,
	password: String,
	age: Number,
	email: String,
	date_of_birth: Date
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;