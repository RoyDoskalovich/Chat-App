import InputLine from '../InputLine/InputLine';
import {useState, useEffect} from 'react';

function Register() {

    const [details, setDetailes] = useState({
        username: "",
        password: "",
        verPassword: "",
        name: "",
        isLoggedIn: false,
    });
    const [profilePic, setProfilePic] = useState('');

    const handleChange = (e) => {
        setDetailes({...details, [e.target.name]: e.target.value});
    }

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const [isRegChecked, setIsRegChecked] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('login-active', isRegChecked);
    }, [isRegChecked]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fileInput = document.getElementById('formFile'); // Replace 'formFile' with the actual name of the file input element

        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();

            reader.onload = async () => {
                const base64Image = reader.result;

                const data = {
                    username: details.username,
                    password: details.password,
                    displayName: details.name,
                    profilePic: base64Image
                };

                try {
                    const res = await fetch('http://localhost:12345/Users', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });

                    if (res.status === 409) {
                        alert('username is taken');
                    } else if (res.status > 205 || res.status < 200) {
                        alert('User is not connected');
                    } else {
                        setIsRegChecked(true);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            reader.readAsDataURL(fileInput.files[0]);
        }
    }

    const regInputs = [
        {
            id: "Username",
            label: "Username:",
            errorMessage: "Username should include only letters and no special characters or spaces!",
            pattern: "^[A-Za-z0-9]+$",
            type: "text",
            name: "username",
            placeholder: "Username"
        },
        {
            id: "inputPassword",
            label: "Password:",
            errorMessage: "Password should be at least 8 characters long and include a both numbers and letters!",
            pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])(?=\\S).{8,100}$",
            type: "password",
            name: "password",
            placeholder: "Password"
        },
        {
            id: "inputPasswordVer",
            label: "Password verification:",
            errorMessage: "Password verified is different to original password!",
            pattern: details.password,
            type: "password",
            name: "verPassword",
            placeholder: "Password verification"
        },
        {
            id: "displayName",
            label: "Display name:",
            type: "text",
            name: "name",
            placeholder: "Name"
        },
        {
            id: "formFile",
            label: "Picture:",
            type: "file",
            name: "profilePic",
            onPicChange: onImageChange,
        }
    ];

    const regInputList = regInputs.map((input) => {
        return <InputLine {...input} key={input.id} value={details[input.name]} onChange={handleChange}/>
    });

    return (
        <div className="register">
            <form method="post" action="http://localhost:12345/Users" onSubmit={handleSubmit}>
                <div className="Reg">
                    <label htmlFor="chk" className="main-btn" aria-hidden="true">register</label>
                </div>
                <br></br>
                <div>
                    {regInputList}
                </div>
                <br></br>
                <div>
                    {profilePic &&
                        <img className="profile_image" src={profilePic} alt="ProfilePic" width="100px"></img>}
                </div>
                <br></br>
                <div className="d-grid gap-2 col-4 mx-auto">
                    <button type="submit" className="ButtonDes regButton btn btn-primary">register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;