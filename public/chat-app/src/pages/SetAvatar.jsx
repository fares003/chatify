import React, { useEffect, useState } from "react";
import { useNavigate, Form, Link } from "react-router-dom";
import styled from "styled-components";
import loader from "../images/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/ApiRoutes";
import axios from 'axios';
import { Buffer } from "buffer";
function SetAvatar() {
    const api = 'https://api.multiavatar.com/45678945';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        theme: "dark",
    };
    const Container = styled.div`
      display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
    `;
const setProfilePicture=async()=>{
if(selectedAvatar===undefined){
    toast.error('please choose an avatar',toastOptions)
}else{
    const user=await JSON.parse(localStorage.getItem('chat-app-user'))
    const {data}=await axios.post(`${setAvatarRoute}/${user._id}`,{
        image:avatars[selectedAvatar]
    })
    if(data.isSet){
        user.isAvatarImageSet=true
        user.avatarImage=data.image
        localStorage.setItem('chat-app-user',JSON.stringify(user))
    }else{
        toast.error('something wrong happened please try again ',toastOptions)

    }
}
}
    useEffect(() => {
        const fetchAvatars = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                const buffer = Buffer.from(image.data);
                data.push(buffer.toString('base64'));
            }
            setAvatars(data);
            setIsLoading(false);
        };
        fetchAvatars();
    }, []);

    return (
        <>
        {
            isLoading?
            <Container>
                <img src={loader} alt="loading..."className="loader" />

            </Container>:(

<Container>
<div className="title-container">
    <h1>Pick your favorite avatar</h1>
    <div className="avatars">
        {avatars.length > 0 && avatars.map((avatar, index) => (
            <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)} />
            </div>
        ))}
    </div>
    <button className="submit-btn" onClick={()=>setProfilePicture()}>
        set as profile picture 
</button>
</div>

</Container>

            )

        }

            <ToastContainer />
        </>
    );
}

export default SetAvatar;
