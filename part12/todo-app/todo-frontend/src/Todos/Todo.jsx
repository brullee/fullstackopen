const Todo = ({ text, done, onDelete, onComplete }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "70%",
        margin: "auto",
      }}
    >
      <span>{text}</span>

      <span>{done ? "This todo is done" : "This todo is not done"}</span>

      <span>
        <button onClick={onDelete}>Delete</button>

        {!done && <button onClick={onComplete}>Set as done</button>}
      </span>
    </div>
  );
};

export default Todo;
