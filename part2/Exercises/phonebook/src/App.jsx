import { useState, useEffect } from "react";
import axios from "axios";
import Numbers from "./components/Numbers";
import NewContact from "./components/NewContact";
import Search from "./components/Search";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const hook = () => {
    console.log("effect");
    const eventHandler = (response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    };
    const promise = axios.get("http://localhost:3001/persons");
    promise.then(eventHandler);
  };

  useEffect(hook, []);
  console.log("render", persons.length, "persons");

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
      <NewContact
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
