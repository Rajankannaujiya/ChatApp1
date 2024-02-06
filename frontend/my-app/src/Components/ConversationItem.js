import React from "react";
import { useNavigate } from "react-router-dom";

function ConversationItem({ props }) {

  const navigate = useNavigate();
  console.log(props)

  return (<div onClick={()=>{navigate('chat')}} className="Conversation-Container">

    <div>
    <p className={props && props.username ? "con-icon" : ""}>
  {props && props.username ? props.username[0] : ""}
</p>

    </div>

    <div>
      <p className="con-Tittle">{props?.username}</p>

      <p className="con-lastMessage">{props && props.username ?props.lastMessage:"hii"}</p>
    </div>

    <div>
      <p className="con-timeStamp">{props && props.username ?props.timeStamp:"now"}</p>
    </div>
  </div>)
}

export default ConversationItem;