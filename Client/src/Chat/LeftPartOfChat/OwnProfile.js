import AddContact from "./AddContact";
import {useEffect, useState} from 'react';

function OwnProfile({chatList, setChatList, setChatId}) {

    const [profilePic, setProfilePic] = useState('');
    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        const getUserDetails = async (e) => {
            const token = localStorage.getItem('token');
            const id = localStorage.getItem('username');

            const res = await fetch(`http://localhost:12345/Users/${id}`, {
                'headers': {
                    'Content-Type': 'application/json', // the data (username/password) is in the form of a JSON object
                    "Authorization": `Bearer ${token}`
                }
            });

            if (res.status === 200) {
                const user = await res.json();
                setProfilePic(user.profilePic);
                setDisplayName(user.displayName);
            }
        };
        getUserDetails();
    }, []);

    return (
        <div className="profile-left">
            <img className="profile-image" src={profilePic} alt="profile img"></img>
            <span className="myName">{displayName}</span>
            <span className="profile--right">
                <AddContact chatList={chatList} setChatList={setChatList} setChatId={setChatId}/>
            </span>
        </div>
    );
}

export default OwnProfile;