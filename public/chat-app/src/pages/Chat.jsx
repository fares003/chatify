import React, { useEffect, useState,useRef } from "react";
import { useNavigate, Form, Link } from "react-router-dom";
import styled from "styled-components";
import loader from "../images/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contactsRoute, host, setAvatarRoute } from "../utils/ApiRoutes";
import axios from 'axios';
import { Buffer } from "buffer";
import Logo from "../images/logo.svg";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import ChatInput from "../components/ChatInput";
import {io} from'socket.io-client'
function Chat() {
  const socket=useRef()
  const [users, setUsers] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [selectedContact, setSelectedContact] = useState();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();

  useEffect(()=>{
    if(currentUser){
      socket.current=io(host)
      socket.current.emit('add-user',currentUser._id)
    }
  },[currentUser])

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
    }
}, [currentUser]);
const handleChatChange = (chat) => {
  setCurrentChat(chat);
};
  return (
<>
<Container>
  <div className="chat-container">

<Contacts contacts={contacts} changeChat={handleChatChange}/>
{
  currentChat===undefined?<Welcome currentUser={currentUser}/>:

  <ChatContainer currentChat={currentChat} currentUser={currentUser} />


}

  </div>
</Container>
</>
  )
}
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
export default Chat
