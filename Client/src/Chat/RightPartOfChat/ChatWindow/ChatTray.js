
import React, {useEffect, useState} from "react";


function ChatTray({addMessage, chatId, socket, recipientUsername}) {
    const [messageText, setMessageText] = useState("");

    const sendMessage = async () => {
        if (messageText.trim() === "") {
            return;
        }

        const token = localStorage.getItem('token');
        const data = {
            msg: messageText.trim(),
        }

        const res = await fetch(`http://localhost:12345/Chats/${chatId}/Messages`, {
                'method': 'post',
                'headers': {
                    'Content-Type': 'application/json', // the data (username/password) is in the form of a JSON object
                    "Authorization": `Bearer ${token}`
                },
                'body': JSON.stringify(data) // The actual data (username/password)
            }
        )

        let newMessage;
        if (res.status === 200) {
            newMessage = await res.json();

            addMessage(newMessage);
            setMessageText("");
        } else {
            alert('failed to send message');
        }

        // Emit a 'message' event to the server using Socket.IO
        socket.emit("message", {
            sender: localStorage.getItem("username"),
            recipient: recipientUsername, // Specify the recipient username or ID here
            message: {
                id: newMessage.id, // generate a unique message ID,
                created: new Date(),
                sender: localStorage.getItem("username"),
                content: messageText.trim(),
            },
        });
        setMessageText("");
    }

    return (
        <div className="chat-window-tray">
            <i className="bi bi-emoji-smile"></i>
            <input className="chatInputs" value={messageText} placeholder="Type your message here..." type="text"
                   onChange={(e) => setMessageText(e.target.value)}
                   onKeyDown={(e) => {
                       if (e.key === "Enter") {
                           sendMessage();
                       }
                   }
                   }
            ></input>
            <i className="bi bi-mic"></i>
            <i className="bi bi-send-fill" onClick={sendMessage}></i>
        </div>
    );
}

export default ChatTray;