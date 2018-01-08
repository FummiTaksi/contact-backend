const mongoose = require('mongoose')

const url = 'mongodb://user:password@ds247327.mlab.com:47327/sandbox'

mongoose.connect(url, { useMongoClient: true })
mongoose.Promise = global.Promise;

const Person = mongoose.model('Note', {
    name: String,
    number: String
  })

  const name = process.argv[2]
  const number = process.argv[3];

  const person = new Person({
      name: name,
      number: number
  })

  person.save().then(response => {
      console.log("person saved to mongoDB")
      mongoose.connection.close();
  })


