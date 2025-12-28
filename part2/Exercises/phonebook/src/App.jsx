import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Numbers from "./components/Numbers";
import NewContact from "./components/NewContact";
import Search from "./components/Search";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState();

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
          })
          .catch(() => {
            setPersons(
              persons.map((person) => person.id !== existingPerson.id)
            );
            setMessageColor("red");
            setMessage(
              `${existingPerson.name}' couldn't be found on the server`
            );
            setTimeout(() => {
              setMessage(null);
              setMessageColor();
            }, 5000);
          });
      }
    } else {
      personsService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessageColor();
        setMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
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
        .catch(() => {
          setMessageColor("red");
          setMessage(`${person.name}' couldn't be found on the server`);
          setTimeout(() => {
            setMessage(null);
            setMessageColor();
          }, 5000);
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={messageColor} />
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
