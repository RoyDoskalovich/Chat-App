import {useRef} from "react";

function SearchBox({doSearch}) {

    const searchBox = useRef(null);
    const search = function () {
        doSearch(searchBox.current.value);
    }

    return (
        <div className="search-box">
            <div className="input-wrapper">
                <i className="bi bi-search"></i>
                <input className="chatInputs" ref={searchBox} onKeyUp={search}
                       placeholder="Search here" type="text"></input>
            </div>
        </div>
    );
}

export default SearchBox;