import React, { useState } from "react";
import { useNavigate, Form, Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../images/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/ApiRoutes";
import axios from 'axios';

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
const isPassword = (pass) =>
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(pass);

const FormContainer = styled.div``;

function Register() {
  const navigate=useNavigate()
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("Please confirm the password correctly :)", toastOptions);
      return false;
    } else if (username.length <= 3) {
      toast.error("Username should be greater than 3 letters", toastOptions);
      return false;
    } else if (!isEmail(email)) {
      toast.error("Please enter a valid email", toastOptions);
      return false;
    } else if (!isPassword(password)) {
      toast.error(
        "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Please enter an email", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Please enter a password", toastOptions);
      return false;
    } else if (username === "") {
      toast.error("Please enter a username", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
     if(data.status===401){
      toast.error("this username is already exist", toastOptions);
     }
    else if(data.status===402){
      toast.error("this email is already exist", toastOptions);
     }
     else if(data.status===400){
      toast.error("there is something wrong happened please try agin ", toastOptions);
     } else if(data.status===200){
      localStorage.setItem('chat-app-user', JSON.stringify(data.user));
      navigate('/')
    }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>CHATIFY</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/Login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

export default Register;
