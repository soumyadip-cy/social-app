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
            <div className='inset-0 z-10 h-[5rem] w-[100%] flex justify-between items-center lg:px-5 bg-linear-to-r from-sky-500 lg:via-sky-700 to-sky-500 text-white'>
                <div>
                    <button className='cursor-pointer' onClick={() => handleDrawer()}>
                        <img src={HamburgerMenuImage} className='absolute top-0 left-0 size-20 hover:animate-pulse' alt='Hamburger Menu Button' />
                    </button>
                </div>
                <div>
                    <input type='text' className='lg:w-[50vw] border-1 p-2 rounded-xl bg-gray-100 text-xl text-black' placeholder='Search...' value="" />
                </div>
                <div className={`z-1000 absolute shadow-xl border-1 bg-blue-500 transition-all top-0 right-0 lg:rounded-xl duration-200 ${showProfileButtonMenu ? ' lg:h-max lg:w-[20vw] h-screen w-screen lg:top-2 lg:right-2 opacity-100 ' : ' transition-all w-0 h-0 opacity-0 lg:top-10 lg:right-10 '}`}>
                    {
                        showProfileButtonMenu &&
                        <ProfileIconSection onProfileIconChange={changeProfileIcon} location={location} />
                    }
                </div>
                <div>
                    <button className='cursor-pointer'>
                        <img src={profileIcon} alt='Profile Button' className='absolute h-full top-0 right-3 z-1001 size-12 hover:animate-pulse' onClick={() => handleProfileButtonMenu()} />
                    </button>
                </div>
            </div>
            <div className={`inset-0 z-1000 absolute h-screen bg-gray-200 text-black transition-all duration-200 ${showDrawer ? 'w-screen lg:w-[20vw] shadow-2xl rounded-br-3xl' : 'w-0'}`}>
                {showDrawer &&
                    <div className={`flex flex-col gap-20 transition-[opacity] duration-500 ${showDrawer ? 'opacity-100' : 'opacity-0'}`}>
                        <div className={`bg-transparent flex items-center justify-between transition-all duration-500 ${showDrawer ? 'w-screen lg:w-[20vw]' : 'w-0'}`}>
                            <div className='w-1/3'>
                                <button className={`p-5 cursor-pointer ${showDrawer ? 'animate-[spin_0.5s_ease-in]' : ''}`} onClick={() => handleDrawer()}>
                                    <img src={BackButtonImage} className='size-10' />
                                    {/* <AppLogo logoSize={1} /> */}
                                </button>
                            </div>
                            <div className={`text-xl p-5 font-bold text-sky-700 transition-all duration-200 ${showDrawer ? 'w-screen lg:w-2/3' : 'w-0'}`}>
                                Pages
                            </div>
                        </div>
                        <nav className='flex flex-col gap-10'>
                            <hr />
                            {
                                pages.map(page => (
                                    <>
                                        <button key={page.index} className='shadow-2xl bg-sky-700 text-white mx-5 rounded-xl p-3 cursor-pointer' onClick={
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