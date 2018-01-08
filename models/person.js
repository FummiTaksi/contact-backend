const mongoose = require('mongoose')

const url = 'mongodb://user:password@ds247327.mlab.com:47327/sandbox'

mongoose.connect(url, { useMongoClient: true })
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person