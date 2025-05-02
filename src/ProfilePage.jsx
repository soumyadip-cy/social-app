import { useLocation } from "react-router-dom";

function ProfilePage() {

    const location = useLocation();

    const { user, token } = location.state || {};

    return (
        <>
            <div>
                Username: {user}
                Token: {token}
            </div>
        </>
    );

}

export default ProfilePage;