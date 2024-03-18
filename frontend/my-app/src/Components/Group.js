import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import { refreshSidebarFun } from "../Features/refreshSidebar.js"
import { myContext } from "./mainContainer";
import { useSelector, useDispatch } from "react-redux";
import { dark } from '@mui/material/styles/createPalette';

function Group() {

  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.themekey);
  const { refresh, setRefresh } = useContext(myContext);

  const { chatId } = useParams();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const [group, setGroup] = useState([]);
  
  console.log("groups are in ", group)

  if (!userData) {
    console.log("user is not authenticate");
    navigate("/");
  }

  useEffect(() => {
    Axios.get("http://localhost:5000/allTheGroups", {
      params: { userId: userData.user._id }
    }).then((response) => {
      console.log(response.data)
      setGroup(response.data)
    })
      .catch((err) => {
        console.log(err)
      })
  }, [refresh])


  // useEffect(() => {
  //   const getgroup = async () => {
  //     try{
  //     const response = await Axios.get(`http://localhost:5000/getGroups`, {
  //       params: {chatId:chatId, userId: userData.user._id }
  //     })

  //     console.log("groups are", response.data.existingGroup)
  //     console.log("groups chats", response.data.chat)
  //   }
  //   catch(err){
  //     console.log("error has been occured",err);
  //   }
  // };
  // getgroup();
  // }, [userData.user._id, chatId])

  return (
    <div
      className={'group' + (lightTheme ? "" : " dark")}>
      <div>
        <h1 className={'group-header' + (lightTheme ? "" : " dark")}>Groups</h1>
      </div>
      <div className={"Sb-Conversation" + (lightTheme ? "" : " dark")}>
        {
          group.map((group, index) => {
            console.log(group)
            return (
              <div key={index} className={"Conversation-Container" + (lightTheme ? "" : " dark")}
                onClick={async () => {
                  const groupId = group._id;
                  console.log("Creating chat with ", group.name);

                  try {
                    const response = await Axios.post(`http://localhost:5000/createGroupChat/${groupId}?userId=${userData.user._id}`);
                    console.log("fullchat is this one",response.data.fullChat)
                    
                    dispatch(refreshSidebarFun());
                    navigate(
                    "chat/" +
                    response.data.fullChat._id +
                    "&" +
                    (response.data.fullChat.group.name)
                  )
                  }
                  catch (error) {
                    console.log("an error occur", error);
                  }
                }
                }>
                <div>
                  {/* Render either username or name */}
                  <p className="con-icon">
                    {group?.name[0]}
                  </p>
                </div>
                <div>
                  {/* Render either username or name */}
                  <p className="con-Tittle">{group?.name}</p>
                  <p className="con-lastMessage">{group?.messages || "hii"}</p>
                </div>
                <div>
                  <p className="con-timeStamp">{group.messages?.timeStamp || "now"}</p>
                </div>
              </div>
            );
          })

        }

      </div>
    </div>
  )
}

export default Group;