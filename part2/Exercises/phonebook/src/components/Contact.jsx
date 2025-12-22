const Contact = ({ person, search }) => {
  if (person.name.toLowerCase().includes(search))
    return (
      <>
        {person.name} {person.number}
        <br />
      </>
    );
};

export default Contact;
