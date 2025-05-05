import './stylesheets/Header.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useMemo } from 'react';
import AppLogo from './AppLogo';
import BackButtonImage from './assets/back-button.svg';
import HamburgerMenuImage from './assets/hamburger-menu-button.svg';
import ProfileIconImage1 from './assets/profile-1.svg'
import ProfileIconImage2 from './assets/profile-2.svg'
import ProfileIconImage3 from './assets/profile-3.svg'
import ProfileIconImage4 from './assets/profile-4.svg'
import ProfileIcon from './assets/Profile.png';

function Header() {

    const profileImages = [ProfileIconImage1, ProfileIconImage2, ProfileIconImage3, ProfileIconImage4];

    useMemo(() => {
        profileImages.forEach(profileImage => {
            const imageVar = new Image();
            imageVar.src = profileImage;
        });
    }, [profileImages]);

    const [showDrawer, setShowDrawer] = useState(false);
    const [showProfileButtonMenu, setShowProfileButtonMenu] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    function closeAllButtons() {
        setShowDrawer(false);
        setShowProfileButtonMenu(false);
    }

    function handleProfileButtonMenu() {
        closeAllButtons();
        setShowProfileButtonMenu(!showProfileButtonMenu);
    }

    function handleDrawer() {
        closeAllButtons();
        setShowDrawer(!showDrawer);
    }

    function handleDrawerButton(pageNum) {
        handleDrawer();
        navigate("/", { state: { user: location.state.user, token: location.state.token, activePage: pageNum } });
    }

    return (
        <>
            <div className='relative'>
                {/* This div is used to close all drawers when a user clicks on the background */}
                <div className={`${showDrawer || showProfileButtonMenu ? 'z-500 absolute bg-transparent h-screen w-screen' : 'h-0 w-0'}`} onClick={() => closeAllButtons()} />
                <div className='inset-0 z-10 h-[5rem] w-[100%] flex px-5 bg-linear-to-r from-sky-500 to-indigo-950 text-white transition-all duration-200'>
                    <button className='cursor-pointer' onClick={() => handleDrawer()}>
                        <img src={HamburgerMenuImage} className='absolute top-0 left-0 size-20 hover:animate-pulse' alt='Hamburger Menu Button' />
                    </button>
                    <div className={`z-1000 absolute top-2 right-2 border-1 bg-sky-500 rounded-xl ${showProfileButtonMenu ? 'transition-all opacity-100 h-screen w-screen lg:h-fit lg:w-40' : 'transition-[opacity] opacity-0 top-10 right-10 w-0 h-0'}`}>
                        {
                            showProfileButtonMenu &&
                            <div>
                                <div className='flex'>
                                    <h1 className='p-5 text-xl font-bold'>
                                        {location.state.user}
                                    </h1>
                                    <div className='size-20' />
                                </div>
                                <div className='flex flex-col gap-10'>
                                    <button>Button 1</button>
                                    <button>Button 2</button>
                                </div>
                            </div>
                        }
                    </div>
                    <button className='cursor-pointer'>
                        <img src={ProfileIcon} alt='Profile Button' className='absolute top-0 right-0 z-1001 size-20 hover:animate-pulse' onClick={() => handleProfileButtonMenu()} />
                    </button>
                </div>
                <div className={`inset-0 z-1000 absolute h-screen bg-white border-black text-black transition-all duration-200 ${showDrawer ? 'w-screen lg:w-[20vw] shadow-xl border-r-2 border-b-2 rounded-br-xl' : 'w-0'}`}>
                    {showDrawer &&
                        <div className={`flex flex-col p-5 gap-20 transition-[opacity] duration-500 ${showDrawer ? 'opacity-100' : 'opacity-0'}`}>
                            <a className=''>
                                <button className={`cursor-pointer ${showDrawer ? 'animate-[spin_0.5s_ease-in]' : ''}`} onClick={() => handleDrawer()}>
                                    <img src={BackButtonImage} className='size-10' />
                                    {/* <AppLogo logoSize={1} /> */}
                                </button>
                            </a>
                            <nav className='flex flex-col gap-10'>
                                <button className='shadow-xl bg-gray-100 border-1 p-3 rounded-xl cursor-pointer' onClick={
                                    () => handleDrawerButton("1")
                                }>
                                    Profile
                                </button>
                                <button className='shadow-xl bg-gray-100 border-1 p-3 rounded-xl cursor-pointer' onClick={
                                    () => handleDrawerButton("2")
                                }>
                                    Friends' posts
                                </button>
                                <button className='shadow-xl bg-gray-100 border-1 p-3 rounded-xl cursor-pointer' onClick={
                                    () => handleDrawerButton("3")
                                }>
                                    Explore
                                </button>
                            </nav>
                        </div>
                    }
                </div >
            </div>
        </>
    );
}

export default Header;