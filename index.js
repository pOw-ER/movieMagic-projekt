const { response } = require('express')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const FavoriteItem = require('./models/favoritenItems')
const fetch = require('node-fetch');
require('dotenv').config()
const PORT = process.env.PORT || 3003
// const genres = require('./data/genres.json')



app.set('view engine', 'ejs')

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening at localhost ${PORT}`);
    })
  })
  .catch(err => console.log(err))


app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

let genreType = ``;
let myPage = 1;

const getData = async (genreType, myPage) => {
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreType}&api_key=${process.env.MY_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${myPage}`)
  const data = await response.json()
  return data
}
const getDetail = async (movie_id) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.MY_API_KEY}&language=en-US`)
  const detailData = await response.json()

  return detailData
}

getData("", myPage)
  .then((data) => {
    app.get('/', (req, res) => {
      res.redirect('/movies')
    })
    app.get("/movies", (req, res) => {
      let myPage = 1;
      res.render("pages/index", { data: data.results, myPage })
    })

    app.get("/movies/:id", (req, res) => {
      getDetail(req.params.id)
        .then((data) => {
          console.log(data);
          res.render("pages/movieDetails", { movie: data })
        })
    })
    app.get("/movies/api/:id", (req, res) => {
      let myPage = req.params.id
      getData("", myPage)
        .then((data) => {
          res.render("pages/index", { data: data.results, myPage })
        })
    })
    app.get("/favorite/:id", (req, res) => {
      getDetail(req.params.id)
        .then((data) => {
          // console.log(data);
          new FavoriteItem({
            _id: data.id,
            title: data.title,
            poster_path: data.poster_path
          }).save();
          res.redirect('/')
        })
    })
    app.get('/movie/favorites', (req, res) => {
      FavoriteItem.find()
        .then(movies => {
          res.render('pages/favorites', { movies: movies })
        })
    })
    app.get('/movie/delete/:id', (req, res) => {
      FavoriteItem.findOneAndDelete(req.params.id)
        .then(movies => {
          res.redirect('/')
        })
    })
    ///// GENRES /////////
    app.get("/movies/genres/action", (req, res) => {
      let myPage = 1
      getData("28", myPage)
        .then((data) => {
          res.render("pages/action", { data: data.results, myPage, totalPages: data.total_pages })
        })
    })
    app.get("/movies/genres/action/:id", (req, res) => {
      let myPage = req.params.id
      getData("28", myPage)
        .then((data) => {
          console.log(data);
          res.render("pages/action", { data: data.results, myPage, totalPages: data.total_pages })
        })
    })
    app.get("/movies/genres/drama", (req, res) => {
      let myPage = 1
      getData("18", myPage)
        .then((data) => {
          res.render("pages/drama", { data: data.results, myPage, totalPages: data.total_pages })
        })
    })
    app.get("/movies/genres/drama/:id", (req, res) => {
      let myPage = req.params.id
      getData("18", myPage)
        .then((data) => {
          res.render("pages/drama", { data: data.results, myPage, totalPages: data.total_pages })
        })
    })
    app.get("/movies/genres/comedy", (req, res) => {
      let myPage = 1
      getData("35", myPage)
        .then((data) => {
          res.render("pages/comedy", { data: data.results, myPage, totalPages: data.total_pages })
        })
    })
    app.get("/movies/genres/comedy/:id", (req, res) => {
      let myPage = req.params.id
      getData("35", myPage)
        .then((data) => {
          res.render("pages/comedy", { data: data.results, myPage, totalPages: data.total_pages })
        })
    })
    app.get("/movies/genres/crime", (req, res) => {
      let myPage = 1
      getData("80", myPage)
        .then((data) => {
          res.render("pages/index", { data: data.results, myPage })
        })
    })
    app.get("/movies/genres/horror", (req, res) => {
      let myPage = 1
      getData("27", myPage)
        .then((data) => {
          res.render("pages/horror", { data: data.results, myPage, totalPages: data.total_pages })
        })
    })
    app.get("/movies/genres/horror/:id", (req, res) => {
      let myPage = req.params.id
      getData("27", myPage)
        .then((data) => {
          res.render("pages/horror", { data: data.results, myPage, totalPages: data.total_pages })
        })
    })
    app.get("/movies/genres/science_fiction", (req, res) => {
      let myPage = 1
      getData("878", myPage)
        .then((data) => {
          res.render("pages/sfiction", { data: data.results, myPage, totalPages: data.total_pages })
        })
    })
    app.get("/movies/genres/science_fiction/:id", (req, res) => {
      let myPage = req.params.id
      getData("878", myPage)
        .then((data) => {
          res.render("pages/sfiction", { data: data.results, myPage, totalPages: data.total_pages })
        })
    })
    app.get("/movies/genres/thriller", (req, res) => {
      let myPage = 1
      getData("53", myPage)
        .then((data) => {
          res.render("pages/thriller", { data: data.results, myPage, totalPages: data.total_pages })
        })
    })
    app.get("/movies/genres/thriller/:id", (req, res) => {
      let myPage = req.params.id
      getData("53", myPage)
        .then((data) => {
          res.render("pages/thriller", { data: data.results, myPage, totalPages: data.total_pages })
        })
    })
    app.get("/movies/genres/fantasy", (req, res) => {
      let myPage = 1
      getData("14", myPage)
        .then((data) => {
          res.render("pages/fantasy", { data: data.results, myPage, totalPages: data.total_pages })
        })
    })
    app.get("/movies/genres/fantasy/:id", (req, res) => {
      let myPage = req.params.id
      getData("14", myPage)
        .then((data) => {
          res.render("pages/fantasy", { data: data.results, myPage, totalPages: data.total_pages })
        })
    })
    let word;
    app.post('/search', (req, res) => {
      console.log(req.body.input)
      word = req.body.input;
      res.redirect(`/search/${req.body.input}/1`)
    })

    app.get('/search/:word/:page', (req, res) => {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MY_API_KEY}&language=en-US&query=${req.params.word}&page=${req.params.page}&include_adult=false`)
        .then(result => result.json())
        .then(data => {
          console.log(data);
          res.render('pages/search', { data: data.results, totalPages: data.total_pages, myPage: req.params.page, word: req.params.word })
        })
    })
  })




