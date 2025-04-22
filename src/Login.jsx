import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '/social-app.png';
import AppLogo from './AppLogo';
import LoginImage1 from './assets/social-app-login-image-1.jpg';
import LoginImage2 from './assets/social-app-login-image-2.jpg';
import LoginImage3 from './assets/social-app-login-image-3.jpg';
import './stylesheets/Login.css';

function Login() {

    // useEffect(() => {
    //     const imageBG = Image();
    //     imageBG.src = LoginImage1;
    // }, [LoginImage1]);

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const LoginImages = [LoginImage1, LoginImage2, LoginImage3];
    const [currentLoginImageIndex, setCurrentLoginImageIndex] = useState(0);
    const [nextLoginImageIndex, setNextLoginImageIndex] = useState(1);
    const [firstBGDivOpacity, setFirstBGDivOpacity] = useState('opacity-100');

    //This would preload all the images.
    useEffect(() => {
        LoginImages.forEach(imageSource => {
            const img = new Image();
            img.src = imageSource;
        });
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

    const transitionLoginSpaceRounded = windowHeight > 600 ? ' lg:rounded-tl-[25em]' : '';

    const heightContainer = windowHeight < 600 ? 'h-full' : 'md:h-3/4';

    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFirstBGDivOpacity(' opacity-0 ');
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

    const handleLogin = () => {
        if (username == password)
            navigate("/", { replace: true, state: { user: username, pass: password } })
        else {
            return (
                <>
                    <h1>Incorrect User name</h1>
                </>
            );
        }
    };

    const checkKey = (e) => {
        if (e.key == "Enter")
            handleLogin();
    };

    // Make the background image transition smooth
    return (
        <>
            <div>
                <div
                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 z-25 ${firstBGDivOpacity}`}
                    style={{ backgroundImage: `url(${LoginImage1})` }}
                />
                <div
                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 z-20 ${fadeIn ? 'opacity-0' : 'opacity-100'
                        }`}
                    style={{ backgroundImage: `url(${LoginImages[currentLoginImageIndex]})` }}
                />
                <div
                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 z-10`}
                    style={{ backgroundImage: `url(${LoginImages[nextLoginImageIndex]})` }}
                />
                <div className={'absolute inset-0 z-30 flex justify-end overflow-scroll w-full h-full bg-transparent'}>
                    <div className={'flex box-border overflow-visible w-full lg:w-1/3 md:min-w-128 min-h-screen h-screen justify-end flex-col gap-10 bg-linear-to-br from-red-300/80  to-blue-600/80 md:transition-[border-radius] transition-[width] duration-500 ' + transitionLoginSpaceRounded} onKeyDown={checkKey}>
                        <div className={'flex 2xl:flex-wrap flex-col items-center w-full gap-15 justify-start py-5 transition-all duration-500 ' + heightContainer}>
                            <div className='transition-all duration-500'>
                                <h1 className='text-4xl box-decoration-clone text-white py-1 pl-5 pr-15 rounded-r-md'>
                                    <AppLogo logoSize='2' />
                                </h1>
                            </div>
                            <div className='flex flex-col gap-10 w-full md:w-[25rem] shadow-xl md:rounded-2xl py-5 md:px-5 box-content items-center justify-center bg-white/75 transition-all duration-500'>
                                <div className='flex flex-wrap flex-col gap-10 w-full'>
                                    <div className='flex flex-wrap gap-2 justify-center'>
                                        <label className='w-[8rem] rounded-md p-1 text-xl text-shadow-md'>Username</label>
                                        <input className='w-[15rem] bg-white rounded-md p-1 text-md border-1 border-sky-500 hover:border-green-500 shadow-md' id="inp-username" value={username} placeholder="Enter username" onChange={handleUsername} />
                                    </div>
                                    <div className='flex flex-wrap gap-2 justify-center'>
                                        <label className='w-[8rem] rounded-md p-1 text-xl text-shadow-md'>Password</label>
                                        <input className='w-[15rem] bg-white rounded-md p-1 text-md border-1 border-sky-500 hover:border-green-500 shadow-md' id="inp-password" value={password} placeholder="Enter password" onChange={handlePassword} type='password' />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 items-center justify-center'>
                                    <p>Please resize window to check its responsiveness</p>
                                    <p>
                                        Username: user<br />
                                        Password: user
                                    </p>
                                    <div className='flex items-center'>
                                        <div className='w-full rounded-lg shadow-md bg-blue-900 hover:bg-linear-to-br hover:from-red-600 hover:to-blue-300 transition duration-600'>
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
            </div>
        </>
    );
}

export default Login;