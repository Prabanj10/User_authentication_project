import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState('');
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate('/login');
      }

      try {
        const { data } = await axios.post(
          'http://localhost:3000',
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        setUsername(user);
        if (status) {
          toast(`Hello ${user}`, {
            position: 'top-right',
          });
        } else {
          removeCookie('token'), navigate('/login');
        }
      } catch (err) {
        console.log(err);
        removeCookie('token');
        navigate('/login');
      }
    };
    verifyCookie();
  }, [cookies.token, navigate, removeCookie]);
  const Logout = () => {
    removeCookie('token');
    navigate('/signup');
  };
  return (
    <>
      <div className="home_page">
        <h4>
          {' '}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
