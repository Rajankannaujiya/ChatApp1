import React from "react";
import Sidebar from "./sidebar";
import WorkArea from "./workArea";
import Welcome from "./Welcome";
import CreateGroup from "./CreateGroup";
import "./style.css";
import Login from "./Login";
import SignUp from "./SignUp";
import OnlineUsers from "./OnlineUsers";
import { Outlet } from "react-router-dom";


function MainContainer(){
    return(<div className="mainContainer">
        {/* <img src="./WallPaperChatapp"/> */}
        <Sidebar/>
        {/* <WorkArea/> */}
        <Outlet />
        {/* <OnlineUsers/> */}
        {/* <Welcome/> */}
        {/* <CreateGroup/> */}
        {/* <OnlineUsers/> */}
        {/* <Login/> */}
        {/* <SignUp/> */}
    </div>)
}

export default MainContainer;