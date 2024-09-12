// UserProfile.js
import React, { useContext } from 'react';
import { AuthContext } from './utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const userLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome, {user}</h1>
      <button onClick={userLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
