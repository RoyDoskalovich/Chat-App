import ContactProfile from "./ContactProfile";
import ChatWindow from "./ChatWindow/ChatWindow";
import {useNavigate} from 'react-router-dom';
import React from 'react';

function RightPartOfChat({
                             chatList,
                             setChatList,
                             chatId,
                             setChatId,
                             messages,
                             setMessages,
                             addMessage,
                             socket,
                             setSocket,
                             online,
                             setOnline,
                             recipientUsername
                         }) {

    const navigate = useNavigate();
    const handleSignOut = () => {

        const storedDetails = JSON.parse(localStorage.getItem('userDetails')) || [];
        const updatedDetails = storedDetails.map((user) => ({
            ...user,
            isLoggedIn: false
        }));
        localStorage.setItem('userDetails', JSON.stringify(updatedDetails));
        // Emit disconnection event to the server
        const username = localStorage.getItem('username');

        // Disconnect the socket if it exists
        if (socket && online) {
            socket.disconnect();
            setOnline(false);
            setSocket(null);
        }

        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');

        window.location.reload();
    };

    const selectedChat = chatList.find((chat) => chat.id === chatId);

    return (
        <div className="col-md-8">
            {
                <ContactProfile
                    profilePic={selectedChat?.user?.profilePic}
                    username={selectedChat?.user?.username}
                    handleSignOut={handleSignOut}
                />
            }
            {
                chatList.length !== 0 && (<ChatWindow
                    chatList={chatList}
                    setChatList={setChatList}
                    // updateContactLastMessage={updateContactLastMessage}
                    chatId={chatId}
                    setChatId={setChatId}
                    messages={messages}
                    setMessages={setMessages}
                    addMessage={addMessage}
                    socket={socket}
                    recipientUsername={recipientUsername}
                />)
            }
        </div>
    );
}

// function useClearHistoryOnUnmount() {
//     const navigate = useNavigate();
//     console.log("clear history method!")
//
//     React.useEffect(() => {
//         const unlisten = () => {
//             // Add a new entry to the browser history when the component unmounts.
//             window.history.pushState(null, '', '/');
//         };
//         window.addEventListener('popstate', unlisten);
//
//         return () => {
//             // Remove the popstate listener when the component unmounts.
//             window.removeEventListener('popstate', unlisten);
//         };
//     }, []);
//
//     // Navigate to home page when the user clicks the back button.
//     React.useEffect(() => {
//         const unlisten = () => {
//             navigate('/');
//         };
//         window.addEventListener('popstate', unlisten);
//
//         return () => {
//             window.removeEventListener('popstate', unlisten);
//         };
//     }, [navigate]);
// }

export default function WrappedRightPartOfChat({
                                                   chatList, setChatList, chatId, setChatId,
                                                   messages, setMessages, addMessage, socket,
                                                   setSocket, online, setOnline, recipientUsername
                                               }) {
    // useClearHistoryOnUnmount();
    return <RightPartOfChat
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
    />;
}