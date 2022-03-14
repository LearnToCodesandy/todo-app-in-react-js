import { useState } from "react";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const TodoContainer = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // create todos
  const getTodos = () => {
    if (todo.length !== 0) {
      let newTodos = [
        ...todos,
        { todo: todo, isDoneState: false, _id: makeid(5) }
      ];
      setTodos(newTodos);
      setTodo("");
    }
  };

  // handle toggle todo state
  const handleToggle = (id) => {
    let mapped = todos.map((task) => {
      return task._id === id
        ? { ...task, isDoneState: !task.isDoneState }
        : { ...task };
    });
    setTodos(mapped);
  };

  // handle todo delete
  const handleDelete = (id) => {
    let mapped = todos.filter((todo) => id !== todo._id);
    setTodos(mapped);
  };

  // load todo data from localStorage!

  return (
    <div className="container">
      <div className="container-head">
        <input
          type="text"
          placeholder="enter a todo item..."
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button className="btn" onClick={getTodos}>
          Add Todo
        </button>
      </div>
      <div className="container-body">
        {todos.length !== 0 ? (
          todos.map((todo, index) => (
            <li
              key={todo._id}
              className={
                todo.isDoneState ? "todo-item todo-item-done" : "todo-item"
              }
              onClick={() => handleToggle(todo._id)}
              onDoubleClick={() => handleDelete(todo._id)}
            >
              {todo.todo}
            </li>
          ))
        ) : (
          <p>Sorry no todos yet!</p>
        )}
      </div>
    </div>
  );
};

export default TodoContainer;
