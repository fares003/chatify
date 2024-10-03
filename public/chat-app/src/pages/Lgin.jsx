import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../images/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/ApiRoutes";
import axios from 'axios';

const FormContainer = styled.div``;
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
const isPassword = (pass) =>
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(pass);

function Lgin() {
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { email, password } = values;
    if (email.length <= 3) {
      toast.error("Email should be greater than 3 letters", toastOptions);
      return false;
    } else if (!isEmail(email)) {
      toast.error("Please enter a valid email", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Please enter an email", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Please enter a password", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, password } = values;
      const { data } = await axios.post(loginRoute, {
        email,
        password
      });
      if (data.status === 404) {
        toast.error(data.msg, toastOptions);
      } else if (data.status === 200) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div className="brand">
          <img src={Logo} alt="Logo" />
          <h1>CHATIFY</h1>
        </div>
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
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </FormContainer>
  );
}

export default Lgin;
