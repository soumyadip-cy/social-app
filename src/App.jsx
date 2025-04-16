import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const { user, pass } = location.state || {};

  useEffect(() => {
    if (!user || !pass) {
      navigate('/login');
    }
  }, [user, pass, navigate]);

  return (
    <>
      <Header />
      <h3>Welcome, {user}</h3>
      <p>Password: {pass}</p>
      <Footer />
    </>
  )
}

export default App;
