import Contact from "./Contact";

const Numbers = ({ persons, search }) => {
  return (
    <div>
      {persons.map((person) => (
        <Contact key={person.id} person={person} search={search} />
      ))}
    </div>
  );
};

export default Numbers;
