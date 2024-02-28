import React, { useContext,useEffect, useState } from "react";
import MessageSelf from "./MessageSelf";
import MessageOthers from "./MessageOther";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from "@mui/material";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { myContext } from "./mainContainer";
import { toggleTheme } from "../Features/themeSlice";
import { useSelector,useDispatch } from "react-redux";


function ChatArea(props){

    const dispatch=useDispatch();
const lightTheme=useSelector((state)=>state.themekey)
const { refresh, setRefresh } = useContext(myContext);
console.log("Context API : refresh : ", refresh);
// console.log("Conversations of Sidebar : ", conversations);
const userData = JSON.parse(localStorage.getItem("userData"));

    const [chat, setChat] = useState([]);

    useEffect(() => {
        const chat = async () => {
            await Axios.get("http://localhost:5000/fetchChats")
                .then(response => {
                    setChat(response.data)
                    console.log(response)
                })
    
                .catch((err) => {
                    console.log(err)
                })
        }
        chat();
    }, [])

    return (<div className={"chatArea-container" + (lightTheme ? "" : " dark")}>
        <div className={"chatArea-header" + (lightTheme ? "" : " dark")}>
            <p className={props.username ? "con-icon" : ""}>{props.username ? props.username[0] : 'R'}</p>
            <div className={"header-text"  + (lightTheme ? "" : " dark")}>
                <p className={props ? "con-Title" : ""}>{props.username  ? props.username  : "Rajan"}</p>
                <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>{props.timeStamp ? props.timeStamp : "online"}</p>
            </div>
            <IconButton>
                <DeleteIcon />
            </IconButton>
        </div>
        <div className={"message-container" + (lightTheme ? "" : " dark")}>
            <MessageOthers />
            <MessageSelf />
            <MessageOthers />
            <MessageSelf />
            <MessageOthers />
            <MessageSelf />
        </div>
        <div className={"text-input-area" + (lightTheme ? "" : " dark")}>
            <input placeholder="Type message" className="search-box"></input>
            <IconButton>
                <SendIcon />
            </IconButton>

        </div>

    </div>);

}
export default ChatArea;