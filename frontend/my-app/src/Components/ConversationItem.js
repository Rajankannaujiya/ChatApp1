import React from "react";
import { useNavigate } from "react-router-dom";

function ConversationItem({ props }) {
  const navigate = useNavigate();

  // Check if props is defined and contains the necessary properties
  if (!props || (!props.username && !props.name)) {
    return null; 
  }

  return (
    <div onClick={() => {navigate('chat')}} className="Conversation-Container">
      <div>
        {/* Render either username or name */}
        <p className="con-icon">
          {props.username ? props.username[0] : (props.name ? props.name[0] : "")}
        </p>
      </div>
      <div>
        {/* Render either username or name */}
        <p className="con-Tittle">{props.username || props.name}</p>
        <p className="con-lastMessage">{props.messages || "hii"}</p>
      </div>
      <div>
        <p className="con-timeStamp">{props.timeStamp || "now"}</p>
      </div>
    </div>
  );
}
export default ConversationItem;