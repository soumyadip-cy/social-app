import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef } from 'react';
import AppLogo from './AppLogo';
import LoginImage1 from './assets/social-app-login-image-1.jpg';
import LoginImage2 from './assets/social-app-login-image-2.jpg';
import LoginImage3 from './assets/social-app-login-image-3.jpg';
import './stylesheets/Login.css';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const usernameRef = useRef();
    const passwordRef = useRef();


    //useMemo() hook is used to create a new array only when this component is loaded and stop the new array from being created everytime this component is loaded.
    const LoginImages = useMemo(() =>
        [
            [LoginImage1, "https://unsplash.com/@mikejerskine?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"],
            [LoginImage2, "https://unsplash.com/@felixrstg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"],
            [LoginImage3, "https://unsplash.com/@timmossholder?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"]
        ],
        []);

    const [currentLoginImageIndex, setCurrentLoginImageIndex] = useState(0);
    const [nextLoginImageIndex, setNextLoginImageIndex] = useState(1);

    // This would preload all the images
    useEffect(() => {
        LoginImages.forEach(imageSource => {
            const img = new Image();
            img.src = imageSource[0];
        });
    }, [LoginImages]);

    useEffect(() => {

        usernameRef.current.focus();

    }, []);

    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])

    const transitionLoginSpaceRounded = windowHeight > 600 ? ' lg:rounded-tl-[50vh]' : '';

    const heightContainer = windowHeight < 600 ? 'h-full' : 'md:h-3/4';

    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeIn(false);
            setCurrentLoginImageIndex(ind => (ind < LoginImages.length - 1 ? ind + 1 : 0));
            const timeout = setTimeout(() => {
                setNextLoginImageIndex(ind => (ind < LoginImages.length - 1 ? ind + 1 : 0));
                setFadeIn(true);
            }, 1500);

            return () => clearTimeout(timeout);
        }, 3000);

        return () => {
            clearInterval(interval);
        }
    }, []);


    function handleUsername(e) {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const navigate = useNavigate();

    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    const handleLogin = () => {
        if (username == "user" && password == "user") {
            //Due to lack of actual authentication mechanism, this is just a simulation of how this app might behave by having an authentication token.
            const auth_token = "user_is_authenticated";
            // The value is being passed through the variables using the state property, which can be accessed by creating a useLocation() object;
            navigate("/", { replace: true, state: { user: username, token: auth_token, activePage: "1" } });
        }
        else {
            setInvalidUsername(true);
            setInvalidPassword(true);
            alert("Invalid username and password !");
        }
    };

    const checkKey = (e) => {

        if (e.key == "Enter") {
            if (username == "" && password == "") {
                setInvalidUsername(true);
                setInvalidPassword(true);
            } else if (username == "") {
                setInvalidUsername(true);
                usernameRef.current.focus();
            } else if (password == "") {
                setInvalidPassword(true);
                passwordRef.current.focus();
            } else
                handleLogin();
        }
    };

    return (
        <>
            <div className='absolute inset-0 bg-indigo-950'>
                <div
                    className={`absolute inset-0 h-screen w-screen bg-cover bg-center bg-no-repeat transition-opacity duration-1000 z-20 ${fadeIn ? 'opacity-0' : 'opacity-100'}`}
                    style={{ backgroundImage: `url(${LoginImages[currentLoginImageIndex][0]})` }}
                />
                <a className='absolute bottom-0 left-0 z-150 text-white cursor-pointer' target='_blank' href={LoginImages[currentLoginImageIndex][1]}>
                    Image attribution
                </a>
                <div
                    className={`absolute inset-0 h-screen w-screen bg-cover bg-center bg-no-repeat z-10`}
                    style={{ backgroundImage: `url(${LoginImages[nextLoginImageIndex][0]})` }}
                />
                <div className={'absolute inset-0 z-100 flex justify-end overflow-scroll w-full h-full bg-transparent'}>
                    <div className={'flex box-border sm:overflow-scroll w-full lg:w-1/3 3xl:w-full md:min-w-128 min-h-screen h-screen justify-end flex-col gap-10 bg-linear-to-br from-sky-500/80 to-indigo-950/80 md:transition-[border-radius] transition-[width] duration-500 ' + transitionLoginSpaceRounded} onKeyDown={checkKey}>
                        <div className={'flex aspect-[9/16] flex-col items-center w-full gap-[5%] justify-center py-5 transition-all duration-500 ' + heightContainer}>
                            <div className='transition-all duration-500'>
                                <h1 className='text-4xl box-decoration-clone text-white py-1 pl-5 pr-15 rounded-r-md'>
                                    <AppLogo logoSize='2' />
                                </h1>
                            </div>
                            <div className='flex aspect-[16/9] flex-col gap-10 w-full md:w-[25rem] shadow-xl md:rounded-2xl py-5 md:px-1 box-content items-center justify-center bg-white/75 transition-all duration-500 '>
                                <div className='flex flex-wrap flex-col gap-10 w-full'>
                                    <div className='flex flex-wrap gap-2 justify-between px-10'>
                                        <label className='w-[1/5] rounded-md p-1 text-[125%] text-shadow-md'>Username</label>
                                        <input className={`w-[3/5] bg-white rounded-md p-1 border-2 hover:border-green-500 shadow-md ${invalidUsername ? 'border-red-500' : 'border-sky-500'}`} id="inp-username" ref={usernameRef} value={username} placeholder="Enter username" onChange={handleUsername} />
                                    </div>
                                    <div className='flex flex-wrap gap-2 justify-between px-10'>
                                        <label className='w-[1/5] rounded-md p-1 text-[125%] text-shadow-md'>Password</label>
                                        <input className={`w-[3/5] bg-white rounded-md p-1 border-2 hover:border-green-500 shadow-md ${invalidPassword ? 'border-red-500' : 'border-sky-500'}`} id="inp-password" ref={passwordRef} value={password} placeholder="Enter password" onChange={handlePassword} type='password' />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 items-center justify-center'>
                                    <p>Please resize window to check its responsiveness</p>
                                    <p>
                                        Username: user<br />
                                        Password: user
                                    </p>
                                    <div className='flex items-center'>
                                        <div className='w-full rounded-lg shadow-md bg-blue-900 hover:bg-linear-to-br hover:from-sky-500 hover:to-indigo-950 transition duration-600'>
                                            <button id="btn-login" className="m-1 px-6 py-3 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-900 transition duration-300 cursor-pointer" onClick={handleLogin}>
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Login;