import {useEffect, useState} from "react";

function useCustomEffect(getChats) {
    useEffect(() => {
    }, [getChats]);
}

function AddContact({chatList, setChatList, setChatId}) {

    const [contactIdentifier, setContactIdentifier] = useState('');
    useCustomEffect(chatList);
    const handleInputChange = (e) => {
        setContactIdentifier(e.target.value);
    };

    const saveContactDetails = async () => {

        const token = localStorage.getItem('token');
        const data = {
            username: contactIdentifier.trim(),
        };

        const res = await fetch('http://localhost:12345/Chats', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json', // the data (username/password) is in the form of a JSON object
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (res.status === 200) {
            const contactDetails = await res.json();
            setChatList([...chatList, contactDetails]);
            setChatId(contactDetails.id);
        } else if (res.status === 400) {
            alert('Username already exists');
        } else if (res.status === 404) {
            alert('User not found');
        } else {
            alert('User not found');
        }
    };

    return (
        <>
            <button type="button" className="contact-btn" data-bs-toggle="modal"
                    data-bs-target="#exampleModal"><i
                className="bi bi-person-plus-fill"></i></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-3" id="exampleModalLabel">Add New Contact</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" placeholder="Contact's identifier"
                                   value={contactIdentifier}
                                   onChange={handleInputChange}
                            ></input>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary"
                                    onClick={saveContactDetails}
                            >Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddContact;