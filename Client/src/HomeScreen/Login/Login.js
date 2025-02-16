import InputLine from '../InputLine/InputLine';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function Login() {

    const [newDetails, setNewDetailes] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setNewDetailes({...newDetails, [e.target.name]: e.target.value});
    }

    const logInputs = [
        {
            id: "login-username",
            label: "Username:",
            type: "text",
            name: "username",
            placeholder: "Username"
        },
        {
            id: "password",
            label: "password:",
            type: "password",
            name: "password",
            placeholder: "Password"
        }];

    const logInputList = logInputs.map((input) => {
        return <InputLine {...input} key={input.id} value={newDetails[input.name]} onChange={handleChange}/>
    });

    // Reset isLoggedIn flag for all users to false
    useEffect(() => {
        const storedDetails = JSON.parse(localStorage.getItem('userDetails')) || [];
        const updatedDetails = storedDetails.map((user) => ({...user, isLoggedIn: false}));
        localStorage.setItem('userDetails', JSON.stringify(updatedDetails));
    }, []);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create a json object with the username and password from the form
        const data = {
            username: newDetails.username,
            password: newDetails.password
        }
        try {
            const res = await fetch('http://localhost:12345/Tokens', {
                    'method': 'post', // send a post request
                    'headers': {
                        'Content-Type': 'application/json', // the data (username/password) is in the form of a JSON object
                    },
                    'body': JSON.stringify(data) // The actual data (username/password)
                }
            )

            if (res.status != 200)
                alert('Invalid username and/or password')

            else {
                try {
                    const result = await res.text();
                    const token = result;
                    const storedDetails = JSON.parse(localStorage.getItem('userDetails')) || [];
                    const updatedDetails = storedDetails.map((user) =>
                        user.username === newDetails.username
                            ? {...user, isLoggedIn: true}
                            : user
                    );
                    localStorage.setItem('userDetails', JSON.stringify(updatedDetails));
                    localStorage.setItem('token', token);
                    localStorage.setItem('username', newDetails.username);
                    navigate('/loggedin');
                } catch (error) {
                    console.error('Error parsing response:', error);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="login">
            <form method="post" action="http://localhost:12345/Tokens" onSubmit={handleSubmit}>
                <div className="log">
                    <label htmlFor="chk" className="main-btn" aria-hidden="true">Login</label>
                </div>
                <div>
                    {logInputList}
                </div>
                <br></br>
                <div className="d-grid gap-2 col-4 mx-auto">
                    <button type="submit" className="ButtonDes logButton btn btn-primary">login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;