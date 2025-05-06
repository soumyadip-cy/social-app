import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../headerAndFooter/Header';
import Footer from '../headerAndFooter/Footer';
import ProfilePage from '../pages/ProfilePage';
import FriendsPostPage from '../pages/FriendsPostPage';
import ExplorePage from '../pages/ExplorePage';

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const { user, token, activePage } = location.state || {};

  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
    }
  }, [user, token, navigate]);

  return (
    <>
      <Header />
      {activePage == "1" && <ProfilePage />}
      {activePage == "2" && <FriendsPostPage />}
      {activePage == "3" && <ExplorePage />}
      <Footer />
    </>
  )
}

export default App;
