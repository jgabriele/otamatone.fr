// IMPORT
let express = require('express')
let path = require('path')
let app = express()


// TEMPLATE ENGINE EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

// STATIC FILES
app.use('/assets', express.static(path.join(__dirname, 'public')))


// ROUTING


// LANDING PAGE
app.get('/accueil', (request, response) => {

	console.log('Page d\'acceuil')

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