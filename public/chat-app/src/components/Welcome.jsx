import React from 'react'
import robot from '../images/robot.gif'
export default function Welcome({currentUser}) {
  
  return (
  <div className='welcome-screen'>
      <div className="robot">
        <img src={robot} alt="" />
      </div>
      <span className="welcome-title">
        Welcome,<h3> {currentUser?.username}</h3>
        <h5>please choose chat to start messaging.</h5>
      </span>
    </div>
  )
}
