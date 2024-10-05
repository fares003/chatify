import React from 'react'
import styled from 'styled-components'
import Contacts from '../components/Contacts'
function Chat() {
  return (
<>
<Container>
  <div className="chat-container">

<Contacts/>
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
