import React, {useState, useEffect} from 'react';
import ChatBubble from "./ChatBubble";
import InfiniteScroll from "react-infinite-scroll-component";
import {useNavigate} from 'react-router-dom'

function ChatList({ chatList, messages, setMessages, switchChat, chatId }) {

    //const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    //const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const getMyMessages = async () => {
        //TODO: Potentially do socket.join here
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:12345/Chats/${chatId}/Messages`, {
            'headers': {
            'Content-Type': 'application/json', // the data (username/password) is in the form of a JSON object
            "Authorization": `Bearer ${token}`
            }
        });

        if (res.status === 200) {
            const ourMessages = await res.json();
            setMessages(ourMessages);
        } else {
            alert('failed to fetch messages');
            // navigate("/");
        }
    }

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        if (chatList.length != 0) {
            getMyMessages();
        }
        setIsLoading(false);
    }, [chatList, chatId]);


    return (
        <div className="message-container">
            <InfiniteScroll next={getMyMessages} hasMore={!isLoading && messages.length > 0}
                            loader={<p>Loading...</p>}
                            dataLength={messages.length}>

                {messages.map((chat, key) => (
                    <ChatBubble {...chat} key={key} isActive={key === chatId}
                                onClick={() => switchChat(key)}/>
                ))}
            </InfiniteScroll>
        </div>
    );
}

export default ChatList;

