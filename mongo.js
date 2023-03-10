const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://jyriadmin:${password}@cluster0.wms1whp.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(name && number){
  const person = new Person({
    name: name,
    number: number
  })
  person.save().then(result => {
    console.log(result)
    console.log('person saved!')
    mongoose.connection.close()
  })
  console.log(`added ${name} number ${number} to phonembook`)
}else{

  Person.find({}).then(result => {
    console.log('phonebook contains:')
    result.forEach(person => {
      console.log(`${person.name} number ${person.number}`)
    })
    mongoose.connection.close()
  })
}
