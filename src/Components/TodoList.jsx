import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import theme from "../Theme";

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

  const handleAddTodo = async () => {
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
    <Container maxWidth="xs">
      <Paper
        style={{
          marginTop: theme.spacing(3),
          padding: theme.spacing(0, 2),
        }}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              label="New Todo"
              value={newTodo}
              onChange={handleNewTodoChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleAddTodo}>
              Add Todo
            </Button>
          </Grid>
          <Grid item>
            <List>
              {todos?.map((todo, index) => (
                <ListItem key={todo._id}>
                  <ListItemText primary={todo.todo} />
                  <Button onClick={() => handleDeleteTodo(index, todo._id)}>
                    Delete
                  </Button>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TodoList;
