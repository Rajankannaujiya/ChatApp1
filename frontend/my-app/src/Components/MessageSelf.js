
import React from "react";

function MessageSelf() {

    var props2 = { name: "You", message: "This is a sample Message" };

    return (<div className="self-message-container">

        <div className="messageBox">
        <div className="self-text-content">
        <p className="con-Title">{props2.name}</p>
            <p className="con-self-lastMessage-">{props2.message}</p>
            <p className="self-timeStamp">12:00</p>
        </div>
        </div>
           

    </div>)
}

export default MessageSelf;