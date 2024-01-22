import React from 'react';
import logo from "../Components/Welcome.jpg";

function Welcome() {
  return (
    <div className='Welcome-container'>
        Welcome to the Chat
        <div>
            <img src={logo} alt='logo' className='Welcome-logo'></img>
          </div>
            <p className='Welcome-text'>View and text to your friends and people</p>
       
    </div>
  )
}

export default Welcome;