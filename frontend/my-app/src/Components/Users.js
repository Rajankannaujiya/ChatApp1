import React, {useContext} from 'react';
import { useState,useEffect } from 'react';
import ConversationItem from './ConversationItem';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { myContext } from "./mainContainer";
import { toggleTheme } from "../Features/themeSlice";
import { useSelector,useDispatch } from "react-redux";

function Users() {
  const dispatch=useDispatch();
  const lightTheme=useSelector(state=>state.themekey);
  const {refresh, setRefresh } = useContext(myContext);
  const userData=JSON.parse(localStorage.getItem("userData"));
  const navigate=useNavigate();

  if(!userData){
    console.log("user is not authenticate");
    navigate("/");
  }

 
  const [users,setUsers]=useState([]);
       
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Define the request body data
        const requestBody = {
          userId: userData.user._id, // Assuming userData.user._id contains the user ID
        };
        // Make the GET request with Axios, passing the request body
        const response = await Axios.get("http://localhost:5000/allUser", {
          params: { userId: userData.user._id }
        });
        console.log("Data refresh in sidebar ", response.data);
        setUsers(response.data);
     
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error
      }
    };

    fetchData();
  }, [refresh, userData.user._id]); 


  return (
    <div className={'user' +  (lightTheme ? "" : " dark")}>
      <div className={'user-header' +  (lightTheme ? "" : " dark")}>
        <h1>users</h1>
      </div>

      <div className={"Sb-Conversation" +  (lightTheme ? "" : " dark")}>
        {
          users.map((users) => {
            return <ConversationItem props={users} key={users.username} />
          })
        }
        <ConversationItem />
      </div>

    </div>
  )
}

export default Users