import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import BackButtonImage from '../assets/back-button.svg';
import HamburgerMenuImage from '../assets/hamburger-menu-button.svg';
import ProfileIconSection from './ProfileIconSection';


import ProfileIconImage1 from '../assets/profile-1.svg';

function Header() {

    const [showDrawer, setShowDrawer] = useState(false);
    const [showProfileButtonMenu, setShowProfileButtonMenu] = useState(false);
    const [profileIcon, setProfileIcon] = useState(ProfileIconImage1);
    const pages = [
        [1, "Profile"],
        [2, "Friends' posts"],
        [3, "Explore"]
    ]

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
        closeAllButtons();
        navigate("/", { state: { user: location.state.user, token: location.state.token, activePage: pageNum } });
    }

    function changeProfileIcon(loc) {
        setProfileIcon(loc);
    }

    return (
        <header className='relative'>
            {/* This div is used to close all drawers when a user clicks on the background */}
            <div className={`${showDrawer || showProfileButtonMenu ? 'z-500 absolute bg-transparent h-screen w-screen' : 'h-0 w-0'}`} onClick={() => closeAllButtons()} />
            <div className='inset-0 z-10 h-[5rem] w-[100%] flex px-5 bg-linear-to-r from-sky-500 to-blue-950 text-white'>
                <button className='cursor-pointer' onClick={() => handleDrawer()}>
                    <img src={HamburgerMenuImage} className='absolute top-0 left-0 size-20 hover:animate-pulse' alt='Hamburger Menu Button' />
                </button>
                <div className={`z-1000 absolute top-2 right-2 border-1 bg-blue-950 rounded-xl duration-200 ${showProfileButtonMenu ? 'transition-[height, width] h-screen w-screen lg:h-[17rem] lg:w-[15rem]' : 'transition-[opacity] top-10 right-10 w-0 h-0'}`}>
                    {
                        showProfileButtonMenu &&
                        <ProfileIconSection onProfileIconChange={changeProfileIcon} location={location} />
                    }
                </div>
                <button className='cursor-pointer'>
                    <img src={profileIcon} alt='Profile Button' className='absolute h-full top-0 right-3 z-1001 size-12 hover:animate-pulse' onClick={() => handleProfileButtonMenu()} />
                </button>
            </div>
            <div className={`inset-0 z-1000 absolute h-screen bg-gray-200 border-black text-black transition-all duration-200 ${showDrawer ? 'w-screen lg:w-[20vw] shadow-2xl rounded-br-3xl' : 'w-0'}`}>
                {showDrawer &&
                    <div className={`flex flex-col p-5 gap-20 transition-[opacity] duration-500 ${showDrawer ? 'opacity-100' : 'opacity-0'}`}>
                        <a className=''>
                            <button className={`cursor-pointer ${showDrawer ? 'animate-[spin_0.5s_ease-in]' : ''}`} onClick={() => handleDrawer()}>
                                <img src={BackButtonImage} className='size-10' />
                                {/* <AppLogo logoSize={1} /> */}
                            </button>
                        </a>
                        <nav className='flex flex-col gap-10'>
                            <hr />
                            {
                                pages.map(page => (
                                    <>
                                        <button className='shadow-2xl bg-linear-to-r from-sky-500 to-sky-700 p-3 rounded-xl cursor-pointer' onClick={
                                            () => handleDrawerButton(page[0])
                                        }>
                                            {page[1]}
                                        </button>
                                    </>
                                ))
                            }
                            <hr />
                        </nav>
                    </div>
                }
            </div >
        </header>
    );
}

export default Header;