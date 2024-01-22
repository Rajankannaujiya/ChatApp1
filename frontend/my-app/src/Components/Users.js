import React from 'react';
import { useState,useEffect } from 'react';
import ConversationItem from './ConversationItem';
import Axios from 'axios'

function Users() {

 
  const [conversations,setConversations]=useState([]);
       
  useEffect(()=>{
      Axios.get("http://localhost:5000/user").then(response=>setConversations(response.data))
      .catch((err)=>{
          console.log(err)
      })
  },[])

  return (
    <div className='user'>
      <div className='user-header'>
        <h1>users</h1>
      </div>

      <div className="Sb-Conversation">
        {
          conversations.map((Conversation) => {
            return <ConversationItem props={Conversation} key={Conversation.name} />
          })

        }
        <ConversationItem />
      </div>

    </div>
  )
}

export default Users