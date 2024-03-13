import React from "react";

import "./App.css";
// import { IconButton } from "@mui/material";
import MainContainer from "./Components/mainContainer";
import {BrowserRouter as Router, Routes, Route ,useParams} from "react-router-dom";
import Login from "./Components/Login";
import Welcome from "./Components/Welcome";
import ChatArea from "./Components/ChatArea";
import OnlineUsers from "./Components/OnlineUsers";
import CreateGroup from "./Components/CreateGroup";
import Group from "./Components/Group";
import SignUp from "./Components/SignUp";
import Account from "./Components/Account";
import Users from "./Components/Users";


import { useDispatch,useSelector } from "react-redux";
// import { Button } from "@mui/material";



function App() {

  const dispatch=useDispatch();
  const lightTheme=useSelector((state)=>state.themekey);
  
  
  return (<div className={"App" + (lightTheme ? "" : " dark")}>

    <Routes>
  
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      <Route path="app" element={<MainContainer />}>
        <Route path="welcome" element={<Welcome />} ></Route>
        <Route path="account" element={<Account/>} ></Route>
        <Route path="users" element={<Users/>} ></Route>
        <Route path="chat/:chatId" element={<ChatArea />} ></Route>
        <Route path="users/chat/:chatId" element={<ChatArea />} ></Route>
        <Route path="groups/chat/:chatId" element={<ChatArea />} ></Route>
        <Route path="onlineUsers" element={<OnlineUsers />} ></Route>
        <Route path="groups" element={<Group />} ></Route>
        <Route path="createGroups" element={<CreateGroup />} ></Route>
        {/* <Route path="welcome" element={<Welcome/>}/> */}
        {/* <Route path="*" element={<MainContainer />} /> */}
      </Route>

    </Routes>

  </div>)

}

export default App;
