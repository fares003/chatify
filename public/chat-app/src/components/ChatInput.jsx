import { React, useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

export default function ChatInput({handleSendMsg}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  let message = msg;
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    message = msg
    message += event.emoji;
    setMsg(message);
  };

const sendChat=(event)=>{
event.preventDefault()
if(msg.length>0){
  handleSendMsg(msg)
  setMsg("")
}

}

  return (
    <div className='chatInputContainer'>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && <Picker className='emoji-cont' onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className='inputContainer' onSubmit={(e)=>sendChat(e)}>
        <input
          type="text"
          placeholder='write your message here'
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type='submit' className='submit'>
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}
