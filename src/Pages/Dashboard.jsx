import React from "react";
import TodoList from "../Components/TodoList";
import useAuth from "../Hooks/useAuth";
import useLogout from "../Hooks/useLogout";

const Dashboard = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  console.log(auth);
  return (
    <div>
      <p>Hello {auth.name}</p>
      <button onClick={logout}>logout</button>
      <TodoList />
    </div>
  );
};

export default Dashboard;
