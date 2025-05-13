import { useLocation } from "react-router-dom";
import ProfileIconImage1 from '../assets/profile-1.svg';
import ProfileIconImage2 from '../assets/profile-2.svg';
import ProfileIconImage3 from '../assets/profile-3.svg';
import ProfileIconImage4 from '../assets/profile-4.svg';



function ProfilePage() {

    const location = useLocation();

    const { user, token } = location.state || {};

    const profileImages = [ProfileIconImage1, ProfileIconImage2, ProfileIconImage3, ProfileIconImage4];

    const activities = [];

    return (
        <>
            <div className="flex w-screen border-1 justify-center">
                <div className="flex flex-wrap justify-center w-screen border-1 xl:w-[80rem]">
                    <div className="w-20 border-1">
                        <button>

                        </button>
                    </div>
                    <div className="w-max border-1">
                        <div name="Friend's list" className="flex flex-wrap min-w-max min-w-[40vw] p-2 lg:p-5 items-center justify-center gap-10 bg-blue-950 text-white m-5 rounded-xl">
                            <div className="text-xl border-1">Active friends: </div>
                            <div className="flex cursor-pointer items-end border-1">
                                {
                                    profileImages.map(profileImage => (
                                        <div key={profileImage.key} className="size-10 p-1">
                                            <img src={profileImage} className="size-10" />
                                        </div>
                                    ))
                                }
                                <div className="items-baseline"> . . .</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );

}

export default ProfilePage;