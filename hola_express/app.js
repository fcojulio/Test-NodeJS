var express = require("express");

var app = express();
app.set("view engine", "jade");

app.get("/", function(req,res) {
	//res.send("Hola Mundo");
	res.render("index", {hola: "Holaaa"});
})

app.listen(8080);
