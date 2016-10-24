var express 	= require("express");
var bodyParser 	= require('body-parser');
var User 		= require("./models/user").User;
var app 		= express();


app.use("/static",express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "jade");

app.get("/", function(req,res) {
	//res.send("Hola Mundo");
	res.render("index");
})

app.get("/login", function(req,res){	
	User.find(function(err,doc){
		console.log(doc);
		res.render("login");
	});
	
});

app.post("/users", function(req, res){
	//console.log("E-mail: " + req.body.email);
	//console.log("Contraseña: " + req.body.pass);
	
	var user = new User({
							email: req.body.email, 
							password: req.body.pass, 
							password_confirmation: req.body.password_confirmation
						});
	
	user.save(function(){
		res.send("Guardamos tus datos");
	});
	

});

app.listen(8080);
