function ContactProfile({profilePic, username, handleSignOut}) {

    if (!profilePic && !username) {
        // Render only the sign out button
        return (
            <div className="profile">
                <div className="contact no-gutters contact--grey">
                    <div className="text"></div>
                </div>
                <div className="profile--right1 align-right">
                    <button className="signOut-button" onClick={handleSignOut}>
                        <i className="bi bi-box-arrow-right"></i>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="profile">
            <div className="contact no-gutters contact--grey">
                <img className="profile-image" src={profilePic} alt=""></img>
                <div className="text">
                    <h6>{username}</h6>
                    {/* <p className="text-muted">{status}</p> */}
                </div>
                <span className="profile--right1">
                    <button className="signOut-button" onClick={handleSignOut}>
                        <i className="bi bi-box-arrow-right"></i>
                    </button>
                </span>
            </div>
        </div>
    );
}

export default ContactProfile;