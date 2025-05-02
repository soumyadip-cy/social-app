import './stylesheets/Header.css';
import { useState } from 'react';
import AppLogo from './AppLogo';
import ProfileIcon from './assets/Profile.png'

function Header() {

    const [showDrawer, setShowDrawer] = useState(false);

    function handleAppClick() {
        setShowDrawer(!showDrawer);
    }

    return (
        <>
            <div className='relative'>
                <div className='inset-0 z-10 h-[5rem] w-[100%] flex px-5 bg-indigo-950 text-white justify-between transition-all duration-200'>
                    <button className='cursor-pointer' onClick={() => handleAppClick()}>
                        <AppLogo logoSize={1} />
                    </button>
                    <button className='cursor-pointer'>
                        <img src={ProfileIcon} className='size-[5rem] hover:animate-pulse' />
                    </button>
                </div>
                <div className={`inset-0 z-100 absolute h-screen bg-white border-black text-black transition-all duration-200 ${showDrawer ? 'w-screen lg:w-[20vw] shadow-xl border-r-2 border-b-2 rounded-br-xl' : 'w-0'}`}>
                    {showDrawer &&
                        <div className={`flex flex-col p-5 gap-20 transition-[opacity] duration-500 ${showDrawer ? 'opacity-100' : 'opacity-0'}`}>
                            <a className=''>
                                <button className={`cursor-pointer ${showDrawer ? 'animate-[spin_0.5s_ease-in]' : ''}`} onClick={() => handleAppClick()}>
                                    <AppLogo logoSize={1} />
                                </button>
                            </a>
                            <nav className='flex flex-col gap-10'>
                                <a className='shadow-xl bg-gray-100 border-1 p-3 rounded-xl'>Profile</a>
                                <a className='shadow-xl bg-gray-100 border-1 p-3 rounded-xl'>Friends' posts</a>
                                <a className='shadow-xl bg-gray-100 border-1 p-3 rounded-xl'>Explore</a>
                            </nav>
                        </div>
                    }
                </div >
            </div>
        </>
    );
}

export default Header;