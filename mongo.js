const mongoose = require('mongoose')

const url = 'mongodb://user:password@ds247327.mlab.com:47327/sandbox'

mongoose.connect(url, { useMongoClient: true })
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {
    name: String,
    number: String
  })

  if (process.argv.length === 2) {
      console.log("puhelinluettelo")
    Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(person.name + " " + person.number)
      })
      mongoose.connection.close()
    })
  }
  else if (process.argv.length === 4) {
    const name = process.argv[2]
    const number = process.argv[3];
  
    const person = new Person({
        name: name,
        number: number
    })
  
  
  
    person.save().then(response => {
        console.log("lisätään henkilö " + person.name + " " + person.number + " luetteloon")
        mongoose.connection.close();
    })
  }



