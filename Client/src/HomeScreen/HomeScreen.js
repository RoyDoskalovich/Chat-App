import Register from '../HomeScreen/Register/Register';
import Login from '../HomeScreen/Login/Login';
import './regLog.css';

function HomeScreen() {

    return (
        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true"></input>
            <Register/>
            <Login/>
        </div>
    );
}

export default HomeScreen;