import {useState, useEffect} from "react";

function ChatBubble({sender, content}) {


    const username = sender.username;
    const id = localStorage.getItem('username');
    const [side, setSide] = useState('chat-bubble chat-bubble--left');
    const [offsetFlag, setOffsetFlag] = useState('col-md-9');
    useEffect(() => {
        if (id === username) {
            setSide('chat-bubble chat-bubble--right');
            setOffsetFlag('col-md-9 offset-md-3');
        } else {
            setSide('chat-bubble chat-bubble--left');
            setOffsetFlag('col-md-9');
        }
    });
    return (
        <div className="row no-gutters">
            <div className={offsetFlag}>
                <div className={side}>
                    {content}
                </div>
            </div>
        </div>
    );
}

export default ChatBubble;