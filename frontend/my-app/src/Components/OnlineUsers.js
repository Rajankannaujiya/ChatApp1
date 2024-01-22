import React, { useState,useEffect } from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './style.css';
import ConversationItem from './ConversationItem';
import logo from '../Components/chat.png';
import Axios from 'axios';

function OnlineUsers() {

    const [conversations,setConversations]=useState([]);
       
    useEffect(()=>{
        Axios.get("http://localhost:5000/user").then(response=>setConversations(response.data))
        .catch((err)=>{
            console.log(err)
        })
    },[])

    
    return (
        <div className='onlineUserContainer'>
            <div className='onlineUser-header'>
                <p className='con-Title'><img src={logo} alt='logo' className='chatlogo' />Onliner Users</p>
            </div>
            <div className="online-SearchBar">

                <IconButton style={{ backgroundColor: 'white' }}>
                    <SearchIcon />
                </IconButton>
                <input type="search" placeholder="Searchs" className="search-box"></input>
            </div>
            <div className='online-User-Container'>
            {
            conversations.map((Conversation)=>{
                return<ConversationItem props={Conversation} key={Conversation.name}/>
                })

            }
                <ConversationItem/>
            </div>
        </div>
    )
}

export default OnlineUsers