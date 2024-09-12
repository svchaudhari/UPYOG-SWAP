import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './../AuthContext';
import { showAlert } from "./../Alerts";

const ValidateUser = () => {
  const location = useLocation();
  const { validateToken, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (!token) {
      showAlert(
        'Error',
        'Invalid Request found on server',
        'error'
      );
      navigate('/');
      return;
    }
    const fetchData = async () => {
      try {
       
        await validateToken( `${process.env.REACT_APP_SERVER_LOGIN_URL}_landingPage?token=` + token, null);
        navigate('/backend');
      } catch (err) {
        console.error(err);
        showAlert('Error', 'Token validation failed', 'error');
      }
    };

    fetchData();
  }, [location.search, validateToken, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return null;
};

export default ValidateUser;
