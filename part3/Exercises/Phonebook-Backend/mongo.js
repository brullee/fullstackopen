const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://abdalla_db_user:${password}@cluster0.9ujtpbd.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

const { argv } = require('node:process')

// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})

const Add = (name, number) => {
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then((person) => {
    console.log(`Added ${person.name} Number: ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}

const Fetch = () => {
  Person.find({}).then((people) => {
    console.log('Phonebook:')
    people.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length < 3) {
  console.log('The Password argument is missing')
  process.exit(1)
} else if (process.argv.length === 3) {
  Fetch()
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  Add(name, number)
}
