var express 	= require("express");
var bodyParser 	= require('body-parser');
var User 		= require("./models/user").User;
var session 	= require("express-session");
var routes_app	= require("./routes_app");

var app 		= express();


app.use("/static",express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// /app -> usuario logeado
// / 	-> usuario no logeado

app.use(session({
	secret: "AASD=efiaf09af9003209q3r9wefpasfAFS",
	resave: false,
	saveUninitialized: false
}));

app.set("view engine", "jade");


app.get("/", function(req,res) {
	//res.send("Hola Mundo");
	console.log(req.session.user_id);
	res.render("index");
})

app.get("/login", function(req,res){	
	User.find(function(err,doc){
		console.log(doc);
		res.render("login");
	});
	
});

app.get("/signup", function(req,res){	
	User.find(function(err,doc){
		console.log(doc);
		res.render("signup");
	});
	
});

app.post("/users", function(req, res){
	//console.log("E-mail: " + req.body.email);
	//console.log("Contraseña: " + req.body.pass);
	
	var user = new User({
							email: req.body.email, 
							password: req.body.pass, 
							password_confirmation: req.body.password_confirmation,
							username: req.body.username
						});
	
	user.save().then(function(us){
		res.send("Guardamos tu usuario");
	},function(err){
		console.log(String(err));
		res.send("No pudimos guardar la informacion");
	});
	

});

app.post("/sessions", function(req,res){

	User.findOne({email:req.body.email,password:req.body.pass}, function(err, user){
		console.log(user);

		req.session.user_id = user._id;
		res.send("Ey man");
	});

});

app.use("/app", routes_app);

app.listen(8080);
