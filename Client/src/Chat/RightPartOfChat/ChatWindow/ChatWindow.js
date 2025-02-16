import ChatTray from "./ChatTray";
import ChatList from "./ChatList";
import React, {useState} from "react";

function ChatWindow({chatList, setChatList, chatId, setChatId, messages, setMessages, addMessage, socket, recipientUsername}) {

    const switchChat = (index) => {
        setChatId(index);
    }

    return (
        <>
            <ChatList
                chatList={chatList}
                messages={messages}
                setMessages={setMessages}
                switchChat={switchChat}
                chatId={chatId}/>

            <div className="chat-tray-container row">
                <div className="col-12">
                    <ChatTray addMessage={addMessage} chatId={chatId} socket={socket} recipientUsername={recipientUsername}/>
                </div>
            </div>
        </>
    );
}

export default ChatWindow;