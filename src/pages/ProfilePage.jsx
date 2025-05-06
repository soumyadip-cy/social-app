import { useLocation } from "react-router-dom";

function ProfilePage() {

    const location = useLocation();

    const { user, token } = location.state || {};

    return (
        <>
            <div className="flex flex-col w-screen">
                <div className="flex justify-center w-[100%] text-xl font-bold">
                    <h1>Profile Page</h1>
                </div>
                <div className="flex justify-center w-[100%]">
                    Username: {user} <br />
                    Token: {token}
                </div>
            </div >
        </>
    );

}

export default ProfilePage;