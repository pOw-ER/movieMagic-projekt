const { response } = require('express')
const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config()
const PORT = process.env.PORT || 3003
// const genres = require('./data/genres.json')



app.set('view engine', 'ejs')

app.listen(PORT, () => {
  console.log(`listening at localhost ${PORT}`);
})

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

    ///// GENRES /////////
    app.get("/movies/genres/action", (req, res) => {
      let myPage = 1
      getData("28", myPage)
        .then((data) => {
          res.render("pages/index", { data: data.results, myPage })
        })
    })
    // app.get("/movies/genres/action/:id", (req, res) => {
    //   getDetail(req.params.id)
    //     .then((data) => {
    //       res.render("pages/movieDetails", { movie: data })
    //     })

    // })
    app.get("/movies/genres/drama", (req, res) => {
      let myPage = 1
      getData("18", myPage)
        .then((data) => {
          res.render("pages/index", { data: data.results, myPage })
        })
    })
    app.get("/movies/genres/comedy", (req, res) => {
      let myPage = 1
      getData("35", myPage)
        .then((data) => {
          res.render("pages/index", { data: data.results, myPage })
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
          res.render("pages/index", { data: data.results, myPage })
        })
    })
    app.get("/movies/genres/science_fiction", (req, res) => {
      let myPage = 1
      getData("878", myPage)
        .then((data) => {
          res.render("pages/index", { data: data.results, myPage })
        })
    })
    app.get("/movies/genres/thriller", (req, res) => {
      let myPage = 1
      getData("53", myPage)
        .then((data) => {
          res.render("pages/index", { data: data.results, myPage })
        })
    })
  })




