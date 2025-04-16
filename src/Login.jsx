import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './stylesheets/Login.css';

function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    function handleUsername(e) {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const navigate = useNavigate();

    const handleLogin = () => {
        if (username == password)
            navigate("/", { replace: true, state: { user: username, pass: password } })
    };

    const checkKey = (e) => {
        if (e.key == "Enter")
            handleLogin();
    };

    return (
        <>
            <div className="div-login" onKeyDown={checkKey}>
                <h1>Username: {username}</h1>
                <h1>Password: {password}</h1>
                <input id="inp-username" value={username} placeholder="Enter username" onChange={handleUsername} />
                <input id="inp-password" value={password} placeholder="Enter password" onChange={handlePassword} />
                <button id="btn-login" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300" onClick={handleLogin}>Login</button>
            </div >
        </>
    );
}

export default Login;