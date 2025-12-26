const express = require("express");
var morgan = require("morgan");

const cors = require("cors");
const app = express();

morgan.token("postData", function getPostData(req) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :postData"
  )
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  const TimeOfRequest = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${TimeOfRequest}</p>
    `
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.statusMessage = "There're no entries with these parameters";
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const existingPerson = persons.find((person) => person.name === body.name);

  if (!body.name || !body.number) {
    return res.status(403).json({
      error: "content missing",
    });
  } else if (existingPerson) {
    return res.status(403).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: Math.floor(Math.random() * 999),
    name: body.name,
    important: body.number,
  };

  persons = persons.concat(person);
  res.json(person);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
