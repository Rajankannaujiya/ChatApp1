import React from 'react';
import ConversationItem from './ConversationItem';
import { useState , useEffect} from 'react';
import Axios from 'axios'

function Group() {

 
  const [conversations,setConversations]=useState([]);
       
  useEffect(()=>{
      Axios.get("http://localhost:5000/user").then(response=>setConversations(response.data))
      .catch((err)=>{
          console.log(err)
      })
  },[])


  return (
    <div
    className='group'>
      <div>
        <h1 className='group-header'>Groups</h1>
      </div>
      <div className="Sb-Conversation">
        {
            conversations.map((Conversation)=>{
                return<ConversationItem props={Conversation} key={Conversation.name}/>
                })

            }
        <ConversationItem />
        </div>
    </div>
  )
}

export default Group;