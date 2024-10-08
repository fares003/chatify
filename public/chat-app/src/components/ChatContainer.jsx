import React from 'react'
import Logout from './Logout'

export default function ChatContainer({currentChat}) {
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
    </div>
  )
}
