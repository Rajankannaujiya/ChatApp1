import React from 'react';
import ConversationItem from './ConversationItem';
import { useState , useEffect} from 'react';
import Axios from 'axios'

function Group() {

 
  const [group,setGroup]=useState([]);
       
  useEffect(()=>{
      Axios.get("http://localhost:5000/allTheGroups").then((response)=>{
        console.log(response.data)
        setGroup(response.data)})
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