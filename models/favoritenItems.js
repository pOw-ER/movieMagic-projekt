const mongoose = require('mongoose')
const { Schema } = mongoose;

const favoriteMoviesSchema = new Schema({
  _id: string,
  required: true,
})

const favoriteItem = mongoose.model('favoriteMovie', favoriteMoviesSchema)
module.exports = favoriteItem;
