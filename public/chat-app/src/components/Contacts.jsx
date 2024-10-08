import React, { useEffect, useState } from "react";
import { useNavigate, Form, Link } from "react-router-dom";
import styled from "styled-components";
import loader from "../images/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contactsRoute, setAvatarRoute } from "../utils/ApiRoutes";
import axios from 'axios';
import { Buffer } from "buffer";
import Logo from "../images/logo.svg";
const Container=styled.div`
      display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
`
export default function Contacts({ contacts, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    useEffect(() => {
        const fetchData = async () => {
          const data = await JSON.parse(localStorage.getItem('chat-app-user'));
          setCurrentUserName(data.username);
          setCurrentUserImage(data.avatarImage);
        };
      
        fetchData();
      }, []);
    const changeCurrentChat = (index, contact) => {
      setCurrentSelected(index);
      changeChat(contact);
    };


    return (
<div className="contact-part">
        <div className='contacts'>
            <div className="title">
                <img src={Logo} alt="" />
                <h1>CHATFY</h1>
            </div>
            {
                contacts.map((contact, index) => {
                    return (
                        <div className={`contact ${currentSelected === index ? 'selected-contact' : ''}`} key={contact._id} onClick={() => {  changeCurrentChat(index, contact) }}>
                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" className="avatar"></img>
                            <h3 className="username">{contact.username}</h3>
                        </div>
                    )
                })
            }
        </div>
        <div className="currentUser">
            <div className="avatar-user">
                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="" />
            </div>
            <div className="username">
                <h1>{currentUserName}</h1>
            </div>
        </div>
        </div>
    )
}
