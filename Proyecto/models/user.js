var mongoose		= require("mongoose");
mongoose.Promise 	= global.Promise;
mongoose.connect("mongodb://localhost/fotos");

//var Schema = mongoose.Schema;
var posibles_valores = ["M", "F"];
var email_match = [ /\S+@\S+\.\S+/ , "Coloca un mail valido"];

var user_schema = new mongoose.Schema({
	name: String,
	last_name: String,
	username: {type: String, require: true, maxlength: [50, "Username muy grande"]},
	password: {
		type: String, 
		minlength: [8, "El password debe ser de 8 caracteres minimo"],
		validate: {
			validator: function(p){
				return this.password_confirmation == p;
			},	
			message: "Las contraseñas no son iguales"
		}
	},
	age: {type: Number, min: [5, "La edad no puede ser menor que 5"], max: [100, "La edad no puede ser mayor que 100"]},
	email: {type: String, require: "El mail es obligatorio", match: email_match},
	date_of_birth: Date,
	sex: {type: String, enum: {values: posibles_valores, message: "Opcion no válida"} }
});

user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c = password;
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;