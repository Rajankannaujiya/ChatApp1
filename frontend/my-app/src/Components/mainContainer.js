import React, { createContext, useState } from "react";
import Sidebar from "./sidebar";
import WorkArea from "./workArea";
import Welcome from "./Welcome";
import CreateGroup from "./CreateGroup";
import "./style.css";
import Login from "./Login";
import SignUp from "./SignUp";
import OnlineUsers from "./OnlineUsers";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const myContext = createContext();

function MainContainer(){
  // const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themeKey);
    const [refresh,setRefresh]=useState(true);
    return(<div className="mainContainer">
        {/* <img src="./WallPaperChatapp"/> */}

        <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
        <Sidebar />
        <Outlet />
      </myContext.Provider>
        {/* <Sidebar/> */}
        {/* <WorkArea/> */}
        {/* <Outlet /> */}
        {/* <OnlineUsers/> */}
        {/* <Welcome/> */}
        {/* <CreateGroup/> */}
        {/* <OnlineUsers/> */}
        {/* <Login/> */}
        {/* <SignUp/> */}
    </div>)
}

export default MainContainer;