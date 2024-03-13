import React, { useContext, useEffect, useState, useRef } from "react";
import MessageSelf from "./MessageSelf";
import MessageOthers from "./MessageOther";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from "@mui/material";
import Axios from "axios";
import { myContext } from "./mainContainer";
import { useLocation } from "react-router-dom";
import { toggleTheme } from "../Features/themeSlice";
import { useSelector, useDispatch } from "react-redux";

function ChatArea(props) {

    const dispatch = useDispatch();
    const lightTheme = useSelector((state) => state.themekey)

    const messagesEndRef = useRef(null);
    const [chat, setChat] = useState(null);


    const userData = JSON.parse(localStorage.getItem("userData"));
    const [allMessages, setAllMessages] = useState([]);
    const location = useLocation();
    const { pathname } = location;
    const decodedUrl = decodeURIComponent(pathname);
    // Extract chat ID and user from the URL
    const parts = decodedUrl.split("/");
    const lastPart = parts[parts.length - 1];
    var [chatId, user] = lastPart.split("&");


    useEffect(() => {
        const fetchChats = async () => {
            // setLoading(true);
            try {
                const response = await Axios.get("http://localhost:5000/fetchChats", {
                    params: { userId: userData.user._id }
                });
                setChat(response.data);
                // setLoading(false);
                console.log("chats are", response.data);
            } catch (err) {
                console.log("Error fetching chats:", err);
            }
        };
        fetchChats();
    }, [userData.user._id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("chat id is", chatId);
                const response = await Axios.get(`http://localhost:5000/messages/${chatId}`, { params: { userId: userData.user._id } });
                setAllMessages(response.data.messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        if (chatId) {
            fetchData();
        }
    }, [chatId]);





    // Check if chat is an array with length
    if (Array.isArray(chat) && chat.length > 0) {
        console.log("chats are", chat);
    }

    return (<div className={"chatArea-container" + (lightTheme ? "" : " dark")}>
        <div className={"chatArea-header" + (lightTheme ? "" : " dark")}>
            <p className="con-icon">
                {user[0]}
            </p>
            <div className={"header-text" + (lightTheme ? "" : " dark")}>
                <p className="con-Tittle">{user}</p>
                <p className={"con-timeStamp" + (lightTheme ? "" : " dark")}>{ }</p>
            </div>
            <IconButton>
                <DeleteIcon />
            </IconButton>
        </div>
        <div className={"message-container" + (lightTheme ? "" : " dark")}>
            {allMessages
                .slice(0)
                .reverse()
                .map((message, index) => {
                    const sender = message.sender;
                    console.log("sender", sender)
                    const self_id = userData.user._id;
                    if (sender === self_id) {
                        console.log("I sent it ", sender);
                        return <div className="self-message-container" key={index}>
                            <div className="messageBox">
                                <div className="self-text-content">
                                    <p className="con-Title">{userData.user.username}</p> {/* Render sender ID directly */}
                                    <p className="con-self-lastMessage">{message?.content}</p>
                                    <p className="self-timeStamp">{new Date(message?.timestamp).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    } else {
                        // console.log("Someone Sent it");
                        return (<div className="other-message-container" key={index}>
                            <div className="conversation-container">
                                <p className="con-icon">     {message?.sender}</p>
                                <div className="other-text-content">
                                    <p className="con-Title">{message?.sender}</p>
                                    <p className="con-lastMessage">{message?.content}</p>
                                    <p className="self-timeStamp">{new Date(message?.timestamp).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>)
                    }
                })}
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