import React from "react";
import {
  Form,
  Button,
  Container,
  Card,
  Toast,
  ToastContainer,
  InputGroup,
} from "react-bootstrap";
import { FaEye, FaEyeSlash, FaUser, FaLock, FaSync } from "react-icons/fa";
import hplogo from "./../landingPage/assets/images/hplogo.png";
import "./Login.css";
import { useLogin } from "./Login";

const EmployeeLogin = () => {
  const {
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
  } = useLogin();

  return (
    <div id="loginBodyBg">
      <div className="offset-md-4 mt-10 col-md-4">
        <div className="align-items-center justify-content-center mb-4">
          <img
            src={hplogo}
            alt="Himachal Pradesh Logo"
            className="brand-logo offset-md-4"
          />
          <h2 className="brand-heading text-center">
            Government of Himachal Pradesh
          </h2>
          <h3 className="text-center brand-sub-heading">
            Department of Urban Development
          </h3>
        </div>
      </div>

      <Container
        className="offset-md-4 justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Card
          style={{
            width: "500px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderTop: "8px solid #CFDBF3",
            borderBottom: "8px solid #CFDBF3",
          }}
        >
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label style={{ fontWeight: "bold" }}>Username</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaUser />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                    isInvalid={!!usernameError}
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {usernameError}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label style={{ fontWeight: "bold" }}>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaLock />
                  </InputGroup.Text>
                  <Form.Control
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                    isInvalid={!!passwordError}
                    style={{
                      borderTopRightRadius: "0",
                      borderBottomRightRadius: "0",
                    }}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    style={{
                      border: "1px solid #ced4da",
                      borderTopLeftRadius: "0",
                      borderBottomLeftRadius: "0",
                      background: "white",
                      fontSize: "18px",
                      color: passwordVisible ? "#007bff" : "#6c757d",
                      padding: "0 10px",
                    }}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: "block" }}
                >
                  {passwordError}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formCaptcha">
                <div className="d-flex align-items-center mt-4">
                  <Form.Control
                    type="text"
                    placeholder="Enter captcha"
                    value={captchaInput}
                    onChange={handleCaptchaChange}
                    isInvalid={!!captchaError}
                    style={{ marginRight: "10px", flex: "1" }}
                  />
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      padding: "5px 10px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "5px",
                      height: "38px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {captcha}
                  </span>
                  <Button
                    variant="outline-secondary"
                    onClick={generateCaptcha}
                    style={{
                      marginLeft: "10px",
                      border: "none",
                      background: "transparent",
                      fontSize: "18px",
                      color: "#007bff",
                    }}
                  >
                    <FaSync />
                  </Button>
                </div>
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: "block" }}
                >
                  {captchaError}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-4 mb-4"
              >
                Login
              </Button>

              <div
                className="text-end mb-3"
                style={{ cursor: "pointer", fontWeight: "bold" }}
              >
                Forgot Password?
              </div>

              <hr />
            </Form>
          </Card.Body>
        </Card>

        <ToastContainer position="top-end" className="p-3">
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
          >
            <Toast.Header
              style={{
                backgroundColor: toastVariant === "danger" ? "red" : "green",
                color: "white",
              }}
            >
              <strong className="me-auto">{toastHeader}</strong>
            </Toast.Header>
            <Toast.Body style={{ backgroundColor: "white", color: "black" }}>
              {toastMessage}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </div>
  );
};

export default EmployeeLogin;