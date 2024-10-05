import React from 'react';
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from './pages/Register';
import Lgin from './pages/Lgin';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/Register' element={<Register/>}/>
    <Route path='/Login' element={<Lgin/>}/>
    <Route path='/setAvatar' element={<SetAvatar/>}/>

    <Route path='/' element={<Chat/>}/>

   </Routes>
   </BrowserRouter>
  );
}

export default App;
