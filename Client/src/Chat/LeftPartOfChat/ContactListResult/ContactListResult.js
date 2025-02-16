import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Contact from "../../Contact/Contact";

function ContactListResult({ chatList, setChatId }) {
    const [displayedContacts, setDisplayedContacts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = () => {
        const newContacts = chatList.slice((page - 1) * 10, page * 10);
        setDisplayedContacts((prevContacts) => [...prevContacts, ...newContacts]);

        if (newContacts.length < 10) {
            setHasMore(false);
        }

        setPage((prevPage) => prevPage + 1);
    };

    const contactList = chatList.map((contact, index) => (
        <Contact
            key={index}
            contact={contact}
            setChatId={setChatId}
        />
    ));

    return (
        <div className="contactList">
            <InfiniteScroll
                dataLength={chatList.length}
                next={fetchContacts}
                hasMore={hasMore}
                loader={<p>Loading...</p>}
            >{contactList}
            </InfiniteScroll>
        </div>
    );
}

export default ContactListResult;