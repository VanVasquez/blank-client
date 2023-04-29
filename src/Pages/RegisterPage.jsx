import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Api/axios";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      await axios.post("/auth/register", formData, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      setError(error?.response?.data?.message);
      console.log(error);
    }
    // You can add your logic for submitting the form data here
  };
  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </label>{" "}
      <p>
        Already have an account? <Link to="/login">Log in</Link>{" "}
        {/* Add the Link component */}
      </p>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
