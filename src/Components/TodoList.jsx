import React, { useState, useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const TodoList = () => {
  const { auth } = useAuth();
  const instance = useAxiosPrivate();
  const [todos, setTodos] = useState();
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const user = auth.user;
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getTodos = async () => {
      try {
        const response = await instance.get(`/todo/get?user=${user}`);
        isMounted && setTodos(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [instance, user]);

  const handleNewTodoChange = (event) => setNewTodo(event.target.value);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      if (newTodo.trim() !== "") {
        const response = await instance.post("/todo/add", {
          user: user,
          todo: newTodo,
        });
        const newTodoItem = {
          _id: response?.data?.id,
          author: user,
          todo: newTodo.trim(),
          createdAt: new Date().toISOString(),
        };
        setTodos([...todos, newTodoItem]);
        setNewTodo("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTodo = (index, id) => {
    try {
      instance.delete(`/todo/delete?id=${id}`);
      setTodos(todos.filter((_, i) => i !== index));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(todos);
  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <label>
          Add todo:
          <input type="text" value={newTodo} onChange={handleNewTodoChange} />
        </label>
        <button type="submit">Add Todo</button>
      </form>{" "}
      <ul>
        {loading ? (
          <p>Loading todos...</p>
        ) : todos?.length === 0 ? (
          <p>No todos yet</p>
        ) : (
          todos?.map((todo, index) => (
            <li key={todo._id}>
              {todo.todo}
              <button onClick={() => handleDeleteTodo(index, todo._id)}>
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;
