const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('bodyjson', function (req, res) {
    return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status :bodyjson :res[content-length] - :response-time ms'))

const formatPerson = (person) => {
  return ({
    id: person._id,
    name: person.name,
    number: person.number
  })
}

app.get('/info', (req, res) => {
    const infoText = "<p>puhelinluettelossa on " + persons.length + " henkilön tiedot</p>";
    const timeStamp = "<br/><p> " + new Date() + "</p>";
    res.send(infoText + timeStamp);
})



app.get('/api/persons', (req, res) => {
  Person
  .find({})
  .then(persons => {
    res.json(persons.map(formatPerson))
  }).catch( error => {
    console.log(error);
    res.status(400).end()
  })
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id).then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send(error).end()
    })
  })

  app.put('/api/persons/:id', (request, response) => {
   const body = request.body
   const person = {
     name: body.name,
     number: body.number
   }
   Person.findByIdAndUpdate(request.params.id, person, {new: false} )
   .then(updatedPerson => {
     response.json(formatPerson(updatedPerson))
   })
   .catch(error => {
     response.status(400).send(error)
   })
  })

  function checkIfFieldIsDefined(object, name, response) {
    if (!object) {
      response.status(400).json({error: name + " missing"})
      return false;
    }
    return true;
  }

  app.post('/api/persons/', (request, response) => {
    const generatedId = getRandomInt(10000)
    const body = request.body

    const nameDefined = checkIfFieldIsDefined(body.name, "name", response);
    const numberDefined = checkIfFieldIsDefined(body.number, "number", response);


    if (nameDefined && numberDefined) {
      const person = new Person({
        name: body.name,
        number: body.number
      })
      person.save().then((response) => {       
      }).catch( error => {
        response.status(400).json(error)
      })
      response.status(201).json(person)
    }


  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })


