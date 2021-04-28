const mongoose = require('mongoose')
const { Schema } = mongoose;

const favoriteMoviesSchema = new Schema({
  _id: String,
  title: String,
  poster_path: String,
})

const favoriteItem = mongoose.model('favoriteMovie', favoriteMoviesSchema)
module.exports = favoriteItem;
