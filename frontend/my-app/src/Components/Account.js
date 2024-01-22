import React from 'react';
import logo from './chat.png'
import './Account.css';

function Account() {
  return (
    <div className='Account'>
    <img src={logo} alt='profile-photo' className='profile-photo'/>
    <div className='profile'>
        <input placeholder='Enter your name'className='name'/>
        <a href='www.google.com' className='link'><input placeholder='Enter the link of your social website'/>go to the google</a>
    </div>
       
        
    </div>
  )
}

export default Account;