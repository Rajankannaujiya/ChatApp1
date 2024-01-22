import React from "react";

function MessageOthers(){
    var props1={
        name:"Ramlal",
        message:"this is a sample message",
    };
    return(<div className="other-message-container">
        <div className="conversation-container">
            <p className="con-icon">{props1.name[0]}</p>
            <div className="other-text-content">
                <p className="con-Title">{props1.name}</p>
                <p className="con-lastMessage">{props1.message}</p>
                <p className="self-timeStamp">12:00</p>
            </div>
        </div>
    </div>)
}

export default MessageOthers;