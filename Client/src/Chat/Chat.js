import './chat.css';
import LeftPartOfChat from './LeftPartOfChat/LeftPartOfChat';
import WrappedRightPartOfChat from "./RightPartOfChat/RightPartOfChat";

import {useState, useEffect, useRef} from "react";
import {Navigate, useNavigate} from 'react-router-dom'


import io from "socket.io-client"; // Import the socket.io-client library

function Chat() {
    const [chatList, setChatList] = useState([]);
    const [chatId, setChatId] = useState(0);
    const [online, setOnline] = useState(false);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [recipientUsername, setRecipientUsername] = useState('');
    const chatIdRef = useRef(chatId);

    useEffect(() => {
        chatIdRef.current = chatId;
    }, [chatId])

    const username = localStorage.getItem('username');

    const addMessage = (newMessage) => {

        setMessages([newMessage, ...messages]);

        setChatList((prevChatList) => {
            const updatedChats = prevChatList.map((chat) => {
                if (chat.id === chatIdRef.current) {
                    return {...chat, lastMessage: newMessage};
                }
                return chat;
            });

            return updatedChats;
        });
    };


    const getContactList = async () => {
        const token = localStorage.getItem('token');

        const res = await fetch('http://localhost:12345/Chats', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 200) {
            const data = await res.json();
            setChatList(data);
            if (data.length > 0) {
                const firstChat = data[0];
                const firstChatId = firstChat.id; // Store the chatId in a separate variable
                setChatId(firstChatId);

                const recipientUser = firstChat.user;
                if (recipientUser) {
                    const recipientUsername = recipientUser.username;
                    setRecipientUsername(recipientUsername);
                }
            }
        } else {
            alert('Failed to fetch Chats');
        }
    };


    useEffect(() => {
        let sock;
        if (socket || online) {
            //  return;
        } else {

            // before it was sock = io.connect(...)
            sock = io('http://localhost:3001', {
                query: {username: username}
            });
            setOnline(true);
            setSocket(sock);
        }
        sock?.off("message");

        sock?.on("message", (message) => {
            // Handle the received message and update the chat window
            addMessage(message.message);
        });

        return () => {
            // Clean up the effect
            if (sock && online) {
                sock.disconnect();
                setOnline(false);
                setSocket(null);
            }
        };

    }, [socket, online, username, chatId, addMessage])

    // Reset isLoggedIn flag for all users to false
    useEffect(() => {
        const storedDetails = JSON.parse(localStorage.getItem('userDetails')) || [];
        const updatedDetails = storedDetails.map((user) => ({
            ...user,
            isLoggedIn: false
        }));
        localStorage.setItem('userDetails', JSON.stringify(updatedDetails));
    }, []);

    useEffect(() => {

        if (chatList && chatList.length > 0) {
            const currentChat = chatList.find(chat => chat.id === chatId);
            if (currentChat) {
                const recipientUser = currentChat.user;
                if (recipientUser) {
                    const recipientUsername = recipientUser.username;
                    setRecipientUsername(recipientUsername);
                }
            }
        }
    }, [chatId, chatList, username, setChatId]);


    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = () => {
            const isLoggedIn = !!localStorage.getItem('token');
            if (!isLoggedIn) {
                navigate('/', {replace: true});
            } else {
                getContactList();
            }
        };

        checkLoginStatus();
    }, [navigate]);


    return (
        <div className="container">
            <div className="row no-gutters full-container">
                <LeftPartOfChat
                    chatList={chatList}
                    setChatList={setChatList}
                    chatId={chatId}
                    setChatId={setChatId}/>
                {chatList && (<WrappedRightPartOfChat
                    chatList={chatList}
                    setChatList={setChatList}
                    chatId={chatId}
                    setChatId={setChatId}
                    messages={messages}
                    setMessages={setMessages}
                    addMessage={addMessage}
                    socket={socket}
                    setSocket={setSocket}
                    online={online}
                    setOnline={setOnline}
                    recipientUsername={recipientUsername}
                />)}
            </div>
        </div>
    );
}

export default Chat;