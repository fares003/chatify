import React from 'react'
import Logout from './Logout'
import ChatInput from './ChatInput'
import Messages from './Messages'
import axios from'axios'
import { sendMessageRoute } from '../utils/ApiRoutes'

export default function ChatContainer({currentChat,currentUser}) {
  const handleSendMsg=async(msg)=>{
    await axios.post(sendMessageRoute,{
      from:currentUser._id,
      to:currentChat._id,
      message:msg,

    }) 
  }
  return (
    <div className='chatContainer'>
      <div className="chat-header">
        <div className="userinfo">
        <div className="avatar">
        <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
        </div>
        <div className="chatName">
            {
                currentChat.username
            }
        </div>
        </div>
<Logout/>
      </div>
<Messages/>
<ChatInput handleSendMsg={handleSendMsg}/>
    </div>
  )
}
