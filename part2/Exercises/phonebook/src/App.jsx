import { useState } from "react";

const Contact = ({ person, search }) => {
  if (person.name.toLowerCase().includes(search))
    return (
      <>
        {person.name} {person.number}
        <br />
      </>
    );
};

const Numbers = ({ persons, search }) => {
  return (
    <div>
      {persons.map((person) => (
        <Contact key={person.id} person={person} search={search} />
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

const Search = ({ search, handleSearch }) => {
  return (
    <>
      Search: <input value={search} onChange={handleSearch}></input>
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
  const [search, setSearch] = useState("");

  const addContact = (event) => {
    event.preventDefault();
    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already in the phonebook`);
    } else {
      const newPersons = persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      });

      setPersons(newPersons);
      setNewName("");
      setNewNumber("");
      console.log("Submit: ", newPersons);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} handleSearch={handleSearch} />
      <h2>Add New Contact</h2>
      <NewContactForm
        addContact={addContact}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Numbers persons={persons} search={search} />
    </div>
  );
};

export default App;
