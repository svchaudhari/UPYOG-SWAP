import React, { createContext, useState, useEffect } from "react";
import { showAlert } from "./Alerts";
import { APICall } from "./api";
import { CommonFunctions } from "./CommonFunctions";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setUserCurrentRole }=CommonFunctions();
  const validateToken = async (url, payload=null) => {
    const authToken = btoa(
      `${process.env.REACT_APP_SERVER_LOGIN_USERNAME}:${process.env.REACT_APP_SERVER_LOGIN_PASSWORD}`
    );
    try {
      const response = await APICall(
        url,
        "POST",
        payload,
        {
          "Content-Type": "application/json",
          Authorization: `Basic ${authToken}`,
        }
      );
      localStorage.setItem("token", response.access_token);
      localStorage.setItem(
        "userInfo",
        JSON.stringify(response.UserRequest)
      );
      localStorage.setItem("user", response.UserRequest.name);
      localStorage.setItem("userMappedRoles", JSON.stringify(response.UserRequest.roles));
      setUserCurrentRole(JSON.stringify(response.UserRequest.roles));
      setUser(response.UserRequest.name);
      setUserType(response.UserRequest.type);
      setLoading(false);
    } catch (error) {
      showAlert("Unauthorized", "Login Failed", "warning");
      setLoading(false);
      throw error;
    }
  };
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRequest= JSON.parse(localStorage.getItem("userInfo"));
    if (token) {
      setUser(localStorage.getItem("user"));
      setUserType(userRequest.type);
      setLoading(false);

    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, userType, logout, validateToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
