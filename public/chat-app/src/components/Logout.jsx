import React from 'react'
import {BiPowerOff}from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const navigate=useNavigate()
    const handleClicking=async()=>{
localStorage.clear()
navigate('/Login')
    }
  return (
<button className='quit' onClick={()=>handleClicking()}>
<BiPowerOff/>
</button>
  )
}
