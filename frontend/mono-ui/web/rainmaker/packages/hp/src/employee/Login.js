import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { APICall } from "./../utils/api";
import { showAlert } from "./../utils/Alerts";
import { AuthContext } from './../utils/AuthContext';

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("danger");
  const [toastHeader, setToastHeader] = useState("Login Error");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const { validateToken, error } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const randomString = Math.random().toString(36).substring(2, 8);
    setCaptcha(randomString);
    setCaptchaInput("");
  };

  const validateCaptcha = () => {
    if (captchaInput !== captcha) {
      setCaptchaError("Captcha does not match.");
      return false;
    } else {
      setCaptchaError("");
      return true;
    }
  };

  const validateForm = () => {
    let valid = true;
    if (!username) {
      setUsernameError("Username is required.");
      valid = false;
    } else {
      setUsernameError("");
    }
    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else {
      setPasswordError("");
    }
    if (!captchaInput) {
      setCaptchaError("Captcha is required.");
      valid = false;
    } else if (captchaInput !== captcha) {
      setCaptchaError("Captcha does not match.");
      valid = false;
    } else {
      setCaptchaError("");
    }
    return valid;
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value) {
      setUsernameError("");
    } else {
      setUsernameError("Username is required.");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setPasswordError("");
    } else {
      setPasswordError("Password is required.");
    }
  };

  const handleCaptchaChange = (e) => {
    setCaptchaInput(e.target.value);
    if (e.target.value) {
      setCaptchaError("");
    } else {
      setCaptchaError("Captcha is required.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const payload = JSON.stringify({
      username: username,
      password: password,
      tenantId: "hp",
      userType: "EMPLOYEE",
    });
    const authToken = btoa(
      `${process.env.REACT_APP_SERVER_LOGIN_USERNAME}:${process.env.REACT_APP_SERVER_LOGIN_PASSWORD}`
    );
    try {
       
      await validateToken( `${process.env.REACT_APP_SERVER_LOGIN_URL}_login`, payload);
      navigate('/backend');
    } catch (err) {
      console.error(err);
      showAlert('Error', 'Token validation failed', 'error');
    }
  };

  return {
    username,
    password,
    captcha,
    captchaInput,
    showToast,
    toastMessage,
    toastVariant,
    toastHeader,
    passwordVisible,
    usernameError,
    passwordError,
    captchaError,
    setPasswordVisible,
    setShowToast,
    handleUsernameChange,
    handlePasswordChange,
    handleCaptchaChange,
    handleSubmit,
    generateCaptcha,
  };
};
