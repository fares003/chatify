import React, { useEffect, useRef, useState } from 'react'
import Logout from './Logout'
import ChatInput from './ChatInput'
import Messages from './Messages'
import axios from 'axios'
import { getMessageRoute, sendMessageRoute } from '../utils/ApiRoutes'
import { v4 as uuidv4 } from 'uuid'
import { io } from 'socket.io-client'

export default function ChatContainer({ currentChat, currentUser }) {
  const [chatMessages, setMessages] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef()
  const socket = useRef(io('http://localhost:5000')).current

  useEffect(() => {
    if (currentUser) {
      socket.emit('add-user', currentUser._id)
    }
  }, [currentUser])

  useEffect(() => {
    if (currentChat) {
      const fetchMessagesData = async () => {
        const responseData = await axios.post(getMessageRoute, {
          from: currentUser._id,
          to: currentChat._id
        })
        setMessages(responseData.data.projectMessages)
      }
      fetchMessagesData()
    }
  }, [currentChat, currentUser._id])

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    })
    socket.emit('send-message', {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    })
    const msgs = [...chatMessages]
    msgs.push({ fromSelf: true, message: msg })
    setMessages(msgs)
  }

  useEffect(() => {
    socket.on('msg-receive', (msg) => {
      setArrivalMessage({ fromSelf: false, message: msg })
    })
  }, [socket])

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage])
    }
  }, [arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  return (
    <div className='chatContainer'>
      <div className="chat-header">
        <div className="userinfo">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
          </div>
          <div className="chatName">
            {currentChat.username}
          </div>
        </div>
        <Logout />
      </div>
      <div className="chatMessages">
        {chatMessages.map((message) => (
          <div key={uuidv4()} ref={scrollRef}>
            <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  )
}
