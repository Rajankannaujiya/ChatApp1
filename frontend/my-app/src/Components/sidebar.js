import React, { useContext, useEffect, useState } from "react";

import Axios from "axios"
import ConversationItem from "./ConversationItem";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from "@mui/icons-material/LightMode"
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import { useSelector,useDispatch } from "react-redux";
import { IconButton} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { myContext } from "./mainContainer";
import { toggleTheme } from "../Features/themeSlice";



function Sidebar() {
    const dispatch=useDispatch();
    const lightTheme=useSelector((state)=>state.themekey)
    const { refresh, setRefresh } = useContext(myContext);
    console.log("Context API : refresh : ", refresh);
    const [conversations, setConversations] = useState([]);
    // console.log("Conversations of Sidebar : ", conversations);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [fetUsers,setFetchUser]=useState([]);
       
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const response = await Axios.get("http://localhost:5000/userwithChat" ,{
                    params: { userId: userData.user._id }});
                setConversations(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();

    }, []);



if(conversations){
    console.log(conversations)
}

    
    const navigate = useNavigate();

    return (<div className={"sideBar-container" + (lightTheme? "":" dark")}>

        <div className={"Sb-SubHeader" + (lightTheme ? "" : " dark")}>
            <div>
               <IconButton onClick={()=>{navigate('account')}}>
                <AccountCircleIcon className={"icon" + (lightTheme ? "" : " dark")}/>
               </IconButton>

                <IconButton onClick={() => { navigate('users') }} >
                    <PersonAddIcon  className={"icon" + (lightTheme ? "" : " dark")}/>
                </IconButton>
                <IconButton onClick={() => { navigate('groups') }}>
                    <GroupAddIcon className={"icon" + (lightTheme ? "" : " dark")}/>
                </IconButton>
                <IconButton onClick={() => { navigate('createGroups') }}>
                    <ControlPointIcon className={"icon" + (lightTheme ? "" : " dark")}/>
                </IconButton>
                <IconButton onClick={()=>dispatch(toggleTheme())}>
                    {/* <DarkModeIcon className={"icon" + (lightTheme ? "" : " dark")}/> */}
                    {lightTheme && (
              <DarkModeIcon
                className={"icon" + (lightTheme ? "" : " dark")}
              />
            )}
            {!lightTheme && (
              <LightModeIcon className={"icon" + (lightTheme ? "" : " dark")} />
            )}
                </IconButton>


                <IconButton onClick={()=>{navigate('/')}}>
                <LogoutIcon className={"icon" + (lightTheme ? "" : " dark")}/>
                </IconButton>
            
            </div>
        </div>
        <div className={"Sb-SearchBar"+ (lightTheme ? "" : " dark")}>

            <IconButton  style={{backgroundColor:"white"}} className={"icon" + (lightTheme ? "" : " dark")}>
                <SearchIcon />
            </IconButton>
            <input type="search" placeholder="Searchs" className="search-box"></input>
        </div>
        <div className={"Sb-Conversation" + (lightTheme ? "" : " dark")}>
            {
                conversations?
                 conversations.map((Conversation) => {
                    return <ConversationItem props={Conversation} key={Conversation.username} />
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