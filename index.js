const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config()
const PORT = process.env.PORT || 3003
const genres = require('./data/genres.json')

let myMovie = 1;
// let { myMovie1 } = require('./public/main.js')
// console.log(myMovie1)
app.set('view engine', 'ejs')

app.listen(PORT, () => {
  console.log(`listening at localhost ${PORT}`);
})
let genreType = "";
app.use(express.static('public'))
const getData = async (myMovie) => {
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreType}&api_key=${process.env.MY_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${myMovie}`)
  const data = await response.json()
  return data
}

// with_genres=28&
getData()
  .then((data) => {
    app.use('/movies', (req, res, next) => {
      let changeGenre = () => {
        genreType = "28"
      }
      changeGenre()
      next()
    })
    app.get('/', (req, res) => {
      res.redirect('/movies')
    })
    app.get("/movies", (req, res) => {
      res.render("pages/index", { data, myMovie: myMovie })
    })

    app.get("/movies/:id", (req, res) => {
      let movie = data.results.find(elt => Number(req.params.id) == Number(elt.id))
      // console.log(movie);
      res.render("pages/movieDetails", { movie: movie, genres })
    })
    app.get("/movies/api/:i", (req, res) => {
      console.log(req.params.i, 'hier ist sean');
      myMovie = req.params.i
      getData(myMovie)
      res.render("/pages/index")
    })

  })




