import React, {useContext} from 'react';
import ConversationItem from './ConversationItem';
import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import { myContext } from "./mainContainer";
import { toggleTheme } from "../Features/themeSlice";
import { useSelector,useDispatch } from "react-redux";
import { dark } from '@mui/material/styles/createPalette';

function Group() {

  const dispatch=useDispatch();
  const lightTheme=useSelector((state)=>state.themekey);
  const { refresh, setRefresh } = useContext(myContext);
  const userData=JSON.parse(localStorage.getItem("userData"));
 const navigate=useNavigate();
  const [group,setGroup]=useState([]);

  if(!userData){
    console.log("user is not authenticate");
    navigate("/");
  }
       
  useEffect(()=>{
      Axios.get("http://localhost:5000/allTheGroups",{
        params: { userId: userData.user._id }}).then((response)=>{
        console.log(response.data)
        setGroup(response.data)})
      .catch((err)=>{
          console.log(err)
      })
  },[refresh])


  return (
    <div
    className={'group' +  (lightTheme? "":" dark")}>
      <div>
        <h1 className={'group-header' + (lightTheme? "":" dark")}>Groups</h1>
      </div>
      <div className={"Sb-Conversation" + (lightTheme? "":" dark")}>
        {
            group.map((group)=>{
                return<ConversationItem props={group} key={group.name}/>
                })

            }
        <ConversationItem />
        </div>
    </div>
  )
}

export default Group;