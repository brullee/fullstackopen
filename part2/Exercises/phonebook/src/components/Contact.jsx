const Contact = ({ person, search, handleDelete }) => {
  if (person.name.toLowerCase().includes(search))
    return (
      <li>
        {person.name} {person.number}{" "}
        <button onClick={() => handleDelete(person)}>Delete</button>
      </li>
    );
};

export default Contact;
