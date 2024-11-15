// import "./login.css";

import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const [inputValues, setInputValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmit) {
      const timer = setTimeout(() => {
        navigate("/dashBoard");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSubmit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)
    
    try {
      const response = await fetch("https://workforcepanel.onrender.com/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: inputValues.email,
          password: inputValues.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "An unexpected error occurred"); // Display backend error message
        return;

      }

      const responseData = await response.json();

      if (responseData.token) {
        localStorage.setItem("token", responseData.token);
      }

      setIsSubmit(true);
      console.log("User registered successfully:", responseData);
    } catch (error) {
      setError(`Registration failed: ${error.message}`);
    }
  };

  return (
    <div className="wrapper">
      <div className="login-form">
        <h2 className="flex-container">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="InputBox">
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={inputValues.email}
              onChange={handleChange}
            />
          </div>
          <div className="InputBox">
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={inputValues.password}
              onChange={handleChange}
            />
          </div>
          <div className="InputBox">
            <button type="submit">Submit</button>
          </div>
          <div className="flex-end">
            <a href="/forgotPassword">Forgot Password?</a>
            <h3>
               Don't have an account? <Link to="/signup">SignUp</Link>
            </h3>
          </div>
          <div>{error && <h4>{error}</h4>}</div>
        </form>
      </div>
    </div>
  );
};

export default Login;
