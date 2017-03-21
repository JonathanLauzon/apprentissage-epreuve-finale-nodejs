const fs = require("fs");
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID;
const app = express();
app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public
app.use(bodyParser.json())  // pour traiter les données JSON

var db; // Création de la base de données du serveur
// Connexion à la base de données du serveur
MongoClient.connect('mongodb://127.0.0.1:27017/ef2', (err, database) => {
	if (err) return console.log(err)
	// Récupération de la base de données sur le serveur
	db = database
	app.listen(8081, () => {
		console.log('connexion à la BD et on écoute sur le port 8081');
	})
})

// Routage de l'adresse '/' pour l'affichage de la page html du template
app.get('/',  (req, res) => {
	console.log('la route route get / = ' + req.url)
	var cursor = db.collection('adresses').find().toArray(function(err, resultat){
		if (err) return console.log(err);
		// Appel de la page ejs et distribution des informations de la base de données à celle-ci
		res.render('index.ejs', {liste: resultat});
	});
})

app.get('/fichier', (req, res) => {
	fs.readFile( __dirname + "/public/text/" + "collection_provinces.json", 'utf8', function (err, data) {
		console.log( data );
		res.end(data);
	});
})

app.get('/provinces', (req, res) => {
	fs.readFile( __dirname + "/public/text/" + "collection_provinces.json", 'utf8', function (err, data) {
		console.log( data );
		res.render('index.ejs', {texte: JSON.parse(data)});
	});
	
	
})