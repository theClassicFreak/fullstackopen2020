const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    unique: true,
    required: true,
  },
  author: {
    type: String,
    unique: false,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  url: {
    type: String,
    unique: false,
    required: false,
  },
  likes: {
    type: Number,
    unique: false,
    default: 0,
  },
})

blogSchema.plugin(uniqueValidator)
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
