var express = require("express");

var app = express();
app.set("view engine", "jade");

app.get("/", function(req,res) {
	//res.send("Hola Mundo");
	res.render("index");
})

app.get("/:asd", function(req,res){
	console.log(req.params.asd);
	res.render("form", {nombre: req.params.asd} );
});

app.listen(8080);
