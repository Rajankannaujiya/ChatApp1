import React, { useState,useEffect,useContext } from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './style.css';
import ConversationItem from './ConversationItem';
import logo from '../Components/chat.png';
import Axios from 'axios';
import { myContext } from "./mainContainer";
import { toggleTheme } from "../Features/themeSlice";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';


function OnlineUsers() {

    const dispatch=useDispatch();
    const lightTheme=useSelector(state=>state.themekey);
    const { refresh, setRefresh } = useContext(myContext);
    const [onlineUser,setOnlineUser]=useState([]);

    const navigate=useNavigate();
    const userData=JSON.parse(localStorage.getItem("userData"));

    if(!userData){
        console.log("user is not authenticated");
        navigate("/");
    }
       
    useEffect(()=>{
        Axios.get("http://localhost:5000/allUser",{
          params: { userId: userData.user._id }}).then((response)=>{
          console.log(response.data)
          setOnlineUser(response.data)})
        .catch((err)=>{
            console.log(err)
        })
    },[refresh])

    
    return (
        <div className={'onlineUserContainer' +  (lightTheme ? "" : " dark")}>
            <div className={'onlineUser-header' +  (lightTheme ? "" : " dark")}>
                <p className={'con-Title'}><img src={logo} alt='logo' className={'chatlogo'  +  (lightTheme ? "" : " dark")}/>Onliner Users</p>
            </div>
            <div className={"online-SearchBar" +  (lightTheme ? "" : " dark")}>

                <IconButton style={{ backgroundColor: 'white' }} >
                    <SearchIcon />
                </IconButton>
                <input type="search" placeholder="Searchs" className="search-box"></input>
            </div>
            <div className={'online-User-Container' +  (lightTheme ? "" : " dark")}>
            {
            onlineUser.map((onlineUser)=>{
                return<ConversationItem props={onlineUser} key={onlineUser.name}/>
                })

            }
                <ConversationItem/>
            </div>
        </div>
    )
}

export default OnlineUsers