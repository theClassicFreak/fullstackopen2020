const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
var uniqueValidator = require('mongoose-unique-validator')

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: 1,
        unique: true,
        required: true
    },
    author: {
        type: String,
        minlength: 1,
        unique: false,
        required: true
    },
    url: {
        type: String,
        unique: false,
        required: false
    },
    likes: {
        type: Number,
        unique: false,
        default: 0
    }
})

blogSchema.plugin(uniqueValidator)
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
