import React, { useEffect, useState } from "react";

import Axios from "axios"
import ConversationItem from "./ConversationItem";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
// import individualChatSchema from 'individualChatSchema'
import { IconButton} from "@mui/material";
import { useNavigate } from "react-router-dom";
function Sidebar() {
    const [conversations,setConversations]=useState([]);
    const [fetUsers,setFetchUser]=useState([]);
       
useEffect(()=>{
    Axios.get("/user").then(response=>setConversations(response.data))
    .catch((err)=>{
        console.log(err)
    })
},[])

// const searchUser=useEffect(()=>{
//     const users=async()=>{
//         await Axios.get("/chat")
//                 .then(response => {
//                     setFetchUser(response.data)
//                     console.log(response)
//                 })
    
//                 .catch((err) => {
//                     console.log(err)
//                 })
// }
// users();
// },[])

if(conversations){
    console.log(conversations)
}

    
    const navigate = useNavigate();

    return (<div className="sideBar-container">

        <div className="Sb-SubHeader">
            <div>
               <IconButton onClick={()=>{navigate('account')}}>
                <AccountCircleIcon/>
               </IconButton>

                <IconButton onClick={() => { navigate('users') }} >
                    <PersonAddIcon  />
                </IconButton>
                <IconButton onClick={() => { navigate('groups') }}>
                    <GroupAddIcon />
                </IconButton>
                <IconButton onClick={() => { navigate('createGroups') }}>
                    <ControlPointIcon />
                </IconButton>
                <IconButton>
                    <DarkModeIcon />
                </IconButton>
                <IconButton onClick={()=>{navigate('/')}}>
                <LogoutIcon />
                </IconButton>
            
            </div>
        </div>
        <div className="Sb-SearchBar">

            <IconButton style={{backgroundColor:'white'}} 
            // onClick={()=>{searchUser()}}
            >
                <SearchIcon />
            </IconButton>
            <input type="search" placeholder="Searchs" className="search-box"></input>
        </div>
        <div className="Sb-Conversation">
            {
                conversations?
                 conversations.map((Conversation) => {
                    return <ConversationItem props={Conversation} key={Conversation.userName} />
                }):"" 

            }
            <ConversationItem />
            <IconButton style={{ backgroundColor: 'aqua' }} className="online-icon" onClick={() => { navigate('onlineUsers') }}>
                <OnlinePredictionIcon />
            </IconButton>
        </div>
    </div>)
}
export default Sidebar;