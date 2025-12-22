import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Numbers from "./components/Numbers";
import NewContact from "./components/NewContact";
import Search from "./components/Search";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personsService.getAll().then((initialList) => {
      setPersons(initialList);
    });
  }, []);

  const addContact = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirm = window.confirm(
        `${newName} is already in the phonebook, do you want to overwrite it?`
      );
      if (confirm) {
        personsService
          .update(existingPerson.id, newPerson)
          .then((changedNumber) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? changedNumber : person
              )
            );
          });
      }
    } else {
      personsService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
    }
    setNewName("");
    setNewNumber("");
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

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deletePerson(person.id)
        .then(() => {
          setPersons(
            persons.filter((newPersons) => newPersons.id !== person.id)
          );
        })
        .catch((error) => {
          console.log(error);
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
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
      <Numbers persons={persons} search={search} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
