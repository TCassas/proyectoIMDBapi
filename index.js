var express = require("express");
var app = express();
var request = require("request");
var partials = require("express-partials");
app.set("view engine", "ejs");
app.use(partials());
app.use(express.static("css"));
app.use(express.static("imgs"));

app.get('/', function(req, res) {
	res.render("busqueda");
});

app.get('/resultados', function(req, res) {
	var busqueda = req.query.busqueda;
	var url = "http://www.omdbapi.com/?s=" + busqueda + "&apikey=thewdb";

	request(url, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			var resultadosInfo = [];

			// console.log(resultadosInfo);
			//
			// data.Search.forEach(function(movie) {
			// 	var urlPlot = "http://www.omdbapi.com/?i=" + movie.imdbID + "&apikey=thewdb ";
			//
			// 	console.log(resultadosInfo);
			//
			// 	resultadosInfo.push(armarInformacion(urlPlot, movie));
			// });


			res.render("resultados", {data: data});
		}
	});

	function armarInformacion(urlPlot, movie) {
		request(urlPlot, function(error, response, body) {
			var auxiliar = [];

			console.log(urlPlot);
			console.log(movie);

			if(!error && response.statusCode == 200) {
				var plot = JSON.parse(body);

				auxiliar = [movie.Title, movie.Year, movie.imdbID, movie.Type, movie.Poster, plot.Plot];

				return auxiliar;
			}
		});
	}
});

app.get('/resultado', function(req, res) {
	var busqueda = req.query.busqueda;
	var url = "http://www.omdbapi.com/?i=" + busqueda + "&apikey=thewdb ";

	request(url, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("resultado", {data: data});
		}
	});
});


app.listen(3000, function() {
	console.log("Servidor encendido correctamente!");
});
