function Contact({contact, setChatId}) {

    const { username, displayName, profilePic} = contact.user;
    const { id } = contact;
    const { created, content } = contact.lastMessage || {};

    const handleClick = () => {
        setChatId(id);
    };

    return (
        <>
            <div className="contact contact--onhover" onClick={handleClick}>
                <img className="profile-image" src={profilePic} alt="profile img"></img>
                <div className="text">
                    <h6>{username}</h6>
                    <p className="text-muted">{content}</p>
                </div>
                <div>
                    <span className="time text-muted" style={{fontSize: 'small'}}>{created}</span>
                    {/* <span className="date text-muted"
                          style={{fontSize: 'x-small'}}>{date}</span> */}
                </div>
            </div>
            <hr></hr>
        </>
    );
}

export default Contact;