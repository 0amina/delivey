import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Homepage/Header/header";
import { Helmet } from "react-helmet";
import "./login.css";

const ResetPwd = () => {
    const location = useLocation();
    const [newPassword, setNewPassword] = useState('');
    const [token, setToken] = useState('');
  
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const tokenFromURL = searchParams.get("token");
      setToken(tokenFromURL);
    }, [location.search]);
    const handleFormSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch(`http://localhost:9006/api/reset-password?token=${token}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newPassword: newPassword,
            }),
          });
      
          if (response.ok) {
            // Check the content type of the response
            const contentType = response.headers.get("content-type");
      
            if (contentType && contentType.includes("application/json")) {
              const data = await response.json();
              console.log(data); // Handle the response as JSON
            } else {
              const text = await response.text();
              console.log(text); // Handle the response as plain text
            }
          } else {
            console.error("Failed to reset password");
          }
      
        } catch (error) {
          console.error("Error resetting password:", error);
        }
      };
      

  return (
    <>
      <Helmet>
        {/* Your helmet settings */}
      </Helmet>
      <div className="elementor-section elementor-top-section elementor-element elementor-element-3c97ff9a elementor-reverse-mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="3c97ff9a" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
        {/* Your section content */}
      </div>
      <div className="main">
        <div className="container">
          <div className="signin-content">
            <div className="signin-form">
              <h3 className="form-title">New Password: </h3>
              <form method="POST" className="register-form" id="login-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="password"><i className="zmdi zmdi-account material-icons-name"></i></label>
                  <input type="password" name="password" id="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="form-group form-button">
                  <input type="submit" name="sendpwd" id="sendpwd" className="form-submit" value="Send" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPwd;
