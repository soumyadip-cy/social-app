import AppLogo from './AppLogo';
import LoginImage1 from './assets/social-app-login-image-1.jpg';
import LoginImage2 from './assets/social-app-login-image-2.jpg';
import LoginImage3 from './assets/social-app-login-image-3.jpg';

function Login() {

    return (
        <>
            <div className='absolute inset-0 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${LoginImage1})` }} />
        </>
    );
}

export default Login;