import React from "react";

import "./App.css";
// import { IconButton } from "@mui/material";
import MainContainer from "./Components/mainContainer";
import { Routes, Route } from "react-router-dom";
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
  
  return (<div className="App">





    <Routes>
  
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />


      {/* <Route path="/signUp" element={<SignUp />} /> */}
     

      <Route path="/app" element={<MainContainer />}>
        <Route path="welcome" element={<Welcome />} />
        <Route path="account" element={<Account/>} />
        <Route path="users" element={<Users/>} />
        <Route path="chat" element={<ChatArea />} />
        <Route path="onlineUsers" element={<OnlineUsers />} />
        <Route path="groups" element={<Group />} />
        <Route path="createGroups" element={<CreateGroup />} />
        {/* <Route path="welcome" element={<Welcome/>}/> */}
        {/* <Route path="*" element={<MainContainer />} /> */}
      </Route>

    </Routes>


  </div>)

}

export default App;
