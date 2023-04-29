import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../Api/axios";
import useAuth from "../Hooks/useAuth";
import useToggle from "../Hooks/useToggle";

const LoginPage = () => {
  const [check, toggleCheck] = useToggle("persist", false);
  const { setAuth } = useAuth();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post("/auth/login", formData, {
        withCredentials: true,
      });
      const accessToken = response?.data?.accessToken;
      const name = response?.data?.name;
      const user = formData.username;
      setAuth({ user, accessToken, name });
      navigate(from, { replace: true });
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
      </label>
      <label>
        Keep Login:
        <input type="checkbox" onChange={toggleCheck} checked={check} />
      </label>
      <button type="submit">Log in</button>
      <p>
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default LoginPage;
