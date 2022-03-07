import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useReducer, useRef } from "react";
import { Button } from "react-bootstrap";

interface Todo {
  id: number;
  text: string;
  date: string;
}
type ActionType =
  | { type: "ADD"; text: string; date: string }
  | { type: "REMOVE"; id: number };

function App() {
  function reducer(state: Todo[], action: ActionType) {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
            date: action.date,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }

  const [todos, dispatch] = useReducer(reducer, []);
  const newTodoRef = useRef<HTMLInputElement>(null);
  const newTodoDateRef = useRef<HTMLInputElement>(null);
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current && newTodoDateRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
        date: newTodoDateRef.current.value,
      });
      newTodoRef.current.value = "";
      newTodoDateRef.current.value = "";
    }
  }, []);

  return (
    <div>
      <div className="text-center mt-5">
        <p className="fs-1"> Add Your Task </p>

        <input className="mx-2" type="text" ref={newTodoRef} />
        <input className="mx-2" type="date" ref={newTodoDateRef} />
        <Button className="mx-2" variant="primary" onClick={onAddTodo}>
          Add
        </Button>
      </div>
      <div className="mx-5 my-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">Task Name</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <th scope="row">{todo.id + 1}</th>
                <td>{todo.text}</td>
                <td>{todo.date}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => dispatch({ type: "REMOVE", id: todo.id })}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
