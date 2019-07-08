// IMPORT
let express = require('express')
let app = express()


// TEMPLATE ENGINE EJS
app.set('view engine', 'ejs')

// STATIC FILES
app.use('/assets', express.static('public'))
app.use('/assets', express.static('images'))


// ROUTING


// LANDING PAGE
app.get('/accueil', (request, response) => {

	console.log('Page d\'acceuil')

	let Test = require('./models/test')

	response.render('layouts/home/accueil')

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