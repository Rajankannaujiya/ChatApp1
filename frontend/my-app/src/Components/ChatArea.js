import React, { useEffect, useState } from "react";
import MessageSelf from "./MessageSelf";
import MessageOthers from "./MessageOther";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from "@mui/material";
import Axios from "axios"


function ChatArea(props){

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

    return (<div className="chatArea-container">
        <div className="chatArea-header">
            <p className={props.username ? "con-icon" : ""}>{props.username ? props.username[0] : 'R'}</p>
            <div className="header-text">
                <p className={props ? "con-Title" : ""}>{props.username  ? props.username  : "Rajan"}</p>
                <p className="con-timeStamp">{props.timeStamp ? props.timeStamp : "online"}</p>
            </div>
            <IconButton>
                <DeleteIcon />
            </IconButton>
        </div>
        <div className="message-container">
            <MessageOthers />
            <MessageSelf />
            <MessageOthers />
            <MessageSelf />
            <MessageOthers />
            <MessageSelf />
        </div>
        <div className="text-input-area">
            <input placeholder="Type message" className="search-box"></input>
            <IconButton>
                <SendIcon />
            </IconButton>

        </div>

    </div>);

}
export default ChatArea;