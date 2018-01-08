const mongoose = require('mongoose')

const url = 'mongodb://user:password@ds247327.mlab.com:47327/sandbox'

mongoose.connect(url, { useMongoClient: true })
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {
    name: String,
    number: String
  })

  const alphabeticalOrder = (a, b) => {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
  }

  const returnEmpty = (amount) => {
      let returnValue =  "";
      for (let i = 0; i < amount; i++) {
          returnValue += " ";
      }
      return returnValue;
  }

  const longestNameOfList = (list) => {
    let longestName = -1;
    list.forEach(person => {
      let nameLength = person.name.length;
      if (nameLength > longestName) {
          longestName = nameLength
      }
    })
    return longestName;
  }

  if (process.argv.length === 2) {
      console.log("puhelinluettelo:")
    Person
    .find({})
    .then(result => {
      const list = result;
      let longestName = longestNameOfList(list)
      list.sort(alphabeticalOrder).forEach(person =>{
        console.log(person.name + returnEmpty(longestName - person.name.length + 1)  + person.number)
      });
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



