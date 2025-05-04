import './stylesheets/Header.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import AppLogo from './AppLogo';
import ProfileIcon from './assets/Profile.png'

function Header() {

    const [showDrawer, setShowDrawer] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    function handleDrawer() {
        setShowDrawer(!showDrawer);
    }

    function handleDrawerButton(pageNum) {
        handleDrawer();
        navigate("/", { state: { user: location.state.user, token: location.state.token, activePage: pageNum } });
    }

    return (
        <>
            <div className='relative'>
                <div className='inset-0 z-10 h-[5rem] w-[100%] flex px-5 bg-indigo-950 text-white justify-between transition-all duration-200'>
                    <button className='cursor-pointer' onClick={() => handleDrawer()}>
                        <img src='' alt='Hamburger Menu Button' />
                    </button>
                    <div className='content-center justify-center'>
                        <AppLogo logoSize={1} />
                    </div>
                    <button className='cursor-pointer'>
                        <img src={ProfileIcon} alt='Profile Button' className='size-[5rem] hover:animate-pulse' />
                    </button>
                </div>
                <div className={`inset-0 z-100 absolute h-screen bg-white border-black text-black transition-all duration-200 ${showDrawer ? 'w-screen lg:w-[20vw] shadow-xl border-r-2 border-b-2 rounded-br-xl' : 'w-0'}`}>
                    {showDrawer &&
                        <div className={`flex flex-col p-5 gap-20 transition-[opacity] duration-500 ${showDrawer ? 'opacity-100' : 'opacity-0'}`}>
                            <a className=''>
                                <button className={`cursor-pointer ${showDrawer ? 'animate-[spin_0.5s_ease-in]' : ''}`} onClick={() => handleDrawer()}>
                                    ⬅️
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