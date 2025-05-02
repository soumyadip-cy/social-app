import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProfilePage from './ProfilePage';

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const { user, token } = location.state || {};

  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
    }
  }, [user, token, navigate]);

  return (
    <>
      <Header />
      <ProfilePage />
      <Footer />
    </>
  )
}

export default App;
