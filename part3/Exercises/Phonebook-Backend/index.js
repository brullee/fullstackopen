const express = require("express");
var morgan = require("morgan");
require("dotenv").config();
const Person = require("./models/person");

const app = express();
app.use(express.static("dist"));

morgan.token("postData", function getPostData(req) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :postData"
  )
);

app.get("/info", (req, res) => {
  const TimeOfRequest = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${TimeOfRequest}</p>
    `
  );
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res) => {
  // const id = req.params.id;
  // const person = persons.find((person) => person.id === id);
  // if (person) {
  //   res.json(person);
  // } else {
  //   res.statusMessage = "There're no entries with these parameters";
  //   res.status(404).end();
  // }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  // const existingPerson = Person.find({}).then((persons) => {
  //   persons.find((person) => person.name === body.name);
  // });
  // const existingPerson = persons.find((person) => person.name === body.name);

  if (!body.name || !body.number) {
    return res.status(403).json({
      error: "content missing",
    });
  } else if (existingPerson) {
    return res.status(403).json({
      error: "name must be unique",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((newPerson) => {
    res.json(newPerson);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
