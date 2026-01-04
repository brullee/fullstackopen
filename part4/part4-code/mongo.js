const mongoose = require('mongoose')
const config = require('./utils/config')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: "HTML is easy",
//   important: true,
// });

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

const Fetch = () => {
  Note.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}
const Add = (content, important) => {
  const note = new Note({
    content: content,
    important: important,
  })

  note.save().then(() => {
    console.log('Added to notes')
    mongoose.connection.close()
  })
}

if (process.argv.length === 2) {
  Fetch()
} else if (process.argv.length === 4) {
  const content = process.argv[2]
  const important = process.argv[3]
  Add(content, important)
}
