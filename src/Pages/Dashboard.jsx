import React from "react";
import TodoList from "../Components/TodoList";
import useAuth from "../Hooks/useAuth";

const Dashboard = () => {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <div>
      <p>Hello {auth.name}</p>
      <TodoList />
    </div>
  );
};

export default Dashboard;
