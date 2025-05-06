import { useNavigate } from 'react-router-dom';
import ProfileIconImage1 from '../assets/profile-1.svg';
import ProfileIconImage2 from '../assets/profile-2.svg';
import ProfileIconImage3 from '../assets/profile-3.svg';
import ProfileIconImage4 from '../assets/profile-4.svg';

export default function ProfileIconSection({ onProfileIconChange, location }) {

    const profileImages = [ProfileIconImage1, ProfileIconImage2, ProfileIconImage3, ProfileIconImage4];

    const navigate = useNavigate();

    const handleProfileIconChange = (imageLocation) => {
        onProfileIconChange(imageLocation);
    }

    const handleLogout = () => navigate("/login");

    return (
        <div>
            <div className='flex bg-white/80 rounded-t-xl mb-1'>
                <h1 className='p-5 text-xl text-black font-bold'>
                    {location.state.user}
                </h1>
                <div className='size-20' />
            </div>
            <div className='flex flex-col gap-5 pb-5'>
                <div className='text-center bg-white/80'>
                    <p className='text-black py-2 text-lg'>Choose Profile Icon</p>
                    {
                        profileImages.map(profileImage => (
                            <button key={profileImage.index} onClick={() => handleProfileIconChange(profileImage)} className='cursor-pointer p-1' >
                                <img src={profileImage} className='size-10' />
                            </button>
                        ))
                    }
                </div>
                <div className='flex flex-col gap-5 items-center'>
                    <button className='w-[90%] border-1 p-1 rounded-xl cursor-pointer bg-white text-lg text-black hover:bg-gray-500 transition-all duration-500' onClick={() => handleLogout()}>Logout</button>
                </div>
            </div>
        </div>
    );
}