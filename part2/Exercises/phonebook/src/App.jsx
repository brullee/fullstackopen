import { useState } from "react";

const Contact = ({ person }) => {
  return (
    <>
      {person.name} {person.number}
      <br />
    </>
  );
};

const Numbers = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Contact key={person.id} person={person} />
      ))}
    </div>
  );
};

const NewContactForm = ({
  addContact,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <>
      <h2>Add New Contact</h2>
      <form onSubmit={addContact}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
          <br />
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addContact = (event) => {
    event.preventDefault();
    const names = persons.map((person) => person.name);

    if (!names.includes(newName)) {
      const newPersons = persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      });

      setPersons(newPersons);
      setNewName("");
      setNewNumber("");
      console.log("Submit: ", newPersons);
    } else {
      alert(`${newName} is already in the phonebook`);
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <NewContactForm
        addContact={addContact}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Numbers persons={persons} />
    </div>
  );
};

export default App;
