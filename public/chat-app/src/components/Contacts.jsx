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

export default function Contacts() {
    const [users, setUsers] = useState();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const [selectedContact, setSelectedContact] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('chat-app-user')) {
            navigate('/login');
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')));
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            const fetchContacts = async () => {
                try {
                    const contactsApi = await axios.get(`${contactsRoute}/${currentUser._id}`);
                    setContacts(contactsApi.data);
                } catch (error) {
                    toast.error("Failed to fetch contacts");
                }
            };

            fetchContacts();
            console.log(contacts);
        }
    }, [currentUser]);

    return (
        <div className='contacts'>
            <div className="title">
                <img src={Logo} alt="" />
                <h1>CHATFY</h1>
            </div>
            {
                contacts.map((contact, index) => {
                    return (
                        <div className={`contact ${selectedContact === index ? 'selected-contact' : ''}`} key={contact._id} onClick={() => { setSelectedContact(index) }}>
                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" className="avatar"></img>
                            <h3 className="username">{contact.username}</h3>
                        </div>
                    )
                })
            }
        </div>
    )
}
