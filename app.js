"use strict";
// IMPORT
let express = require('express')
let path = require('path')
let app = express()

// Database Connexion
const MongoClient = require('mongodb').MongoClient

const url = "mongodb://localhost:27017/otamatone_fr"

const param = { useNewUrlParser: true }

MongoClient.connect(url, param, (err, db) => {

	if (err) throw err

	console.log("Connected to database !")

	

})


// TEMPLATE ENGINE EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

// STATIC FILES
app.use('/assets', express.static(path.join(__dirname, 'public')))


// ROUTING


// LANDING PAGE
app.get('/accueil', (request, response) => {

	console.log('Page d\'acceuil')

	MongoClient.connect(url, param, (err, db) => {

		if (err) throw err

		let dbo = db.db("otamatone_fr")

		dbo.collection("videos").find().limit(3).toArray((err, results) => {

			if (err) throw err
		
			response.render('layouts/home/accueil', {resultats: results})

		})

	})


})

// LEARN OTAMATONE
app.get('/apprendre', (request, response) => {

	console.log('Apprendre l\'otamatone')

	response.render('layouts/learn/apprendre')

})

// NEWS PAGE
app.get('/news', (request, response) => {

	console.log('Page de news')

	response.render('layouts/news/newsPage')

})

// SHOP 
app.get('/shop', (request, response) => {

	console.log('Page shopping')

	response.render('layouts/shop/shopping')

})

// VIDEO PAGE
app.get('/videos', (request, response) => {

	console.log('Page vidéos')

})

// CONTACT PAGE
app.get('/contact', (request, response) => {

	console.log('Page de contact')

})


// LISTEN PORT

app.listen(8080)