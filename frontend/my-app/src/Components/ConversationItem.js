import React from "react";
import { useNavigate } from "react-router-dom";

function ConversationItem({ props }) {

  const navigate = useNavigate();
  console.log(props)

  return (<div onClick={()=>{navigate('chat')}} className="Conversation-Container">

    <div>
    <p className={props && props.userName ? "con-icon" : ""}>
  {props && props.userName ? props.userName[0] : ""}
</p>

    </div>

    <div>
      <p className="con-Tittle">{props?.userName}</p>

      <p className="con-lastMessage">{props && props.userName ?props.lastMessage:"hii"}</p>
    </div>

    <div>
      <p className="con-timeStamp">{props && props.userName ?props.timeStamp:"now"}</p>
    </div>
  </div>)
}

export default ConversationItem;