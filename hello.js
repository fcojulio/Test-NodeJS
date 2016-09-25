var http = require("http");

var manejador = function(solicitud, respuesta){
	console.log("Nueva petición");
	console.log(solicitud);
	respuesta.end("Hey man");
};

var servidor = http.createServer(manejador);
servidor.listen(8080);