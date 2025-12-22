import Contact from "./Contact";

const Numbers = ({ persons, search, handleDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <Contact
          key={person.id}
          person={person}
          search={search}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Numbers;
