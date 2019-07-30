// IMPORT
let express = require("express")
let path = require("path")
let app = express()

// Database Connexion
const MongoClient = require("mongodb").MongoClient
const url = "mongodb://localhost:27017/otamatone_fr"
const param = { useNewUrlParser: true }

MongoClient.connect(url, param, (err, db) => {

	if (err) throw err

	console.log("Connected to database !")

})


// TEMPLATE ENGINE EJS
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// STATIC FILES
app.use("/assets", express.static(path.join(__dirname, "public")))


// ROUTING


// LANDING PAGE
app.get("/", (request, response) => {

	console.log("Page d'acceuil")

	MongoClient.connect(url, param, (err, db) => {

        if (err) throw err

        let dbo = db.db("otamatone_fr")

        let executionNumber = 0
        let renderVideos = {}
        let renderCourses = {}
        let renderPosts = {}
        let renderArticles = {}

        function getDataVideos (err, dataVideos) {

            if (err) throw err

            renderVideos = dataVideos

            executionNumber++

            if (executionNumber === 4) {
                renderData()
            }
        }

        function renderData() {

            response.render("layouts/home/accueil", {

                videos: renderVideos,
                courses: renderCourses,
                posts: renderPosts,
                articles: renderArticles

            })

        }

        function getDataCourses (err, dataCourses) {

            if (err) throw err

            executionNumber++
            renderCourses = dataCourses

            if (executionNumber === 4) {
                renderData()
            }
        }

        function getDataPosts (err, dataPosts) {

            if (err) throw err

            executionNumber++
            renderPosts = dataPosts

            if (executionNumber === 4) {
                renderData()
            }

        }

        function getDataArticles (err, dataArticles) {

            if (err) throw err

            executionNumber++
            renderArticles = dataArticles

            if (executionNumber === 4) {
                renderData()
            }

        }

        dbo.collection("videos").find().limit(3).toArray(getDataVideos)
        dbo.collection("courses").find().toArray(getDataCourses)
        dbo.collection("posts").find().toArray(getDataPosts)
        dbo.collection("articles").find().limit(3).toArray(getDataArticles)

    })

})

// LEARN OTAMATONE
app.get("/apprendre", (request, response) => {

	console.log("Apprendre l'otamatone")

	MongoClient.connect(url, param, (err, db) => {

		if (err) throw err

		let dbo = db.db("otamatone_fr")

		dbo.collection("courses").find().toArray( (err, results) => {
 
			if (err) throw err

			response.render("layouts/learn/apprendre", {courses: results})

		})

	})

})

// NEWS PAGE
app.get("/news", (request, response) => {

	console.log("Page de news")

	response.render("layouts/news/newsPage")

})

// SHOP 
app.get("/shop", (request, response) => {

	console.log("Page shopping")

    MongoClient.connect(url, param, (err, db) => {

        let dbo = db.db("otamatone_fr")

        dbo.collection("articles").find().toArray( (err, dataArticles) => {

            if (err) throw err

            response.render("layouts/shop/shopping", {

                articles: dataArticles

            })

        })

    })	

})

// VIDEO PAGE
app.get("/videos", (request, response) => {

	console.log("Page vidéos")

    MongoClient.connect(url, param, (err, db) => {

        let dbo = db.db("otamatone_fr")

        dbo.collection("videos").find().toArray( (err, dataVideos) => {

            response.render("layouts/videos/video", {

                videos: dataVideos

            })

        })

    })

})

// CONTACT PAGE
app.get("/contact", (request, response) => {

	console.log('Page de contact')

})


// LISTEN PORT

app.listen(8080)