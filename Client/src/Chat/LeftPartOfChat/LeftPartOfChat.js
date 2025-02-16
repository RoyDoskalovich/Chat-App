import OwnProfile from './OwnProfile';
import SearchBox from './SearchBox';
import ContactListResult from "./ContactListResult/ContactListResult";
import {useState, useEffect} from "react";

function LeftPartOfChat({chatList, setChatList, chatId, setChatId}) {

    const [originalChatList, setOriginalChatList] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Track the current search query


    useEffect(() => {
        setOriginalChatList(chatList);
    }, [chatList]);

    const doSearch = function (q) {
        setSearchQuery(q); // Update the search query

        if (q === "") {
            setChatList(originalChatList);
        } else {

            const lowercaseQuery = q.toLowerCase();
            const filteredList = originalChatList.filter((contact) =>
                contact.user.username &&
                contact.user.username.toLowerCase().includes(lowercaseQuery));


            if (filteredList.length > 0) {
                setChatId(filteredList[0].id);
                setChatList(filteredList);
            } else {
                setChatId(""); // Clear the chatId since there are no matches
                setChatList([...filteredList]); // Empty the chatList to display an empty chat list
            }
        }
    }

    // const doSearch = (q) => {
    //     setSearchQuery(q); // Update the search query
    //
    //     const lowercaseQuery = q.toLowerCase();
    //     const filteredList = originalChatList.filter(
    //         (contact) =>
    //             contact.user.username &&
    //             contact.user.username.toLowerCase().includes(lowercaseQuery)
    //     );
    //
    //     console.log("filtered:" , filteredList)
    //
    //     if (filteredList.length > 0) {
    //         setChatId(filteredList[0].id);
    //     } else {
    //         setChatId("");
    //     }
    //
    //     setChatList([...filteredList]);
    // };

    const handleInputChange = (event) => {
        const q = event.target.value;
        setSearchQuery(q); // Update the search query

        if (q === "") {
            setChatList(originalChatList); // Restore the original chat list
        } else {
            doSearch(q);
        }
    };


    return (
        <div className="col-md-4 border-right">
            <OwnProfile
                chatList={chatList}
                setChatList={setChatList}
                setChatId={setChatId}/>
            <SearchBox doSearch={doSearch} handleInputChange={handleInputChange}  value={searchQuery}/>
            {chatList.length !== 0 && (<ContactListResult chatList={chatList} setChatId={setChatId}/>)}
        </div>
    );
}

export default LeftPartOfChat;