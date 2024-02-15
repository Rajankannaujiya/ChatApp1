import React from 'react';
import { useState,useEffect } from 'react';
import ConversationItem from './ConversationItem';
import Axios from 'axios'

function Users() {

 
  const [users,setUsers]=useState([]);
       
  useEffect(()=>{
      Axios.get("http://localhost:5000/allUser").then(response=>setUsers(response.data))
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
          users.map((users) => {
            return <ConversationItem props={users} key={users.name} />
          })

        }
        <ConversationItem />
      </div>

    </div>
  )
}

export default Users