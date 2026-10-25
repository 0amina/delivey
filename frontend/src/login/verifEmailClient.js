import React from "react";
import { useState } from "react";
import Header from "../Homepage/Header/header";
import { Helmet } from "react-helmet";
import './login.css';

const EmailVerif = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading to true when the request is initiated

      const response = await fetch("http://localhost:9006/api/password-reset-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          baseUrl: window.location.origin,
        }),
      });

      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }
  };

  return (
    <>
      <Helmet>
            <title>Sign Up</title>
            <link rel='stylesheet' id='hfe-style-css'  href='https://kitpro.site/delivey/wp-content/plugins/header-footer-elementor/assets/css/header-footer-elementor.css?ver=1.6.9' type='text/css' media='all' />
            <link rel='stylesheet' id='swiper-css'  href='https://kitpro.site/delivey/wp-content/plugins/elementor/assets/lib/swiper/css/swiper.min.css?ver=5.3.6' type='text/css' media='all' />
            <link rel='stylesheet' id='elementor-frontend-css'  href='https://kitpro.site/delivey/wp-content/plugins/elementor/assets/css/frontend-lite.min.css?ver=3.11.2' type='text/css' media='all' />
            <link rel='stylesheet' id='elementor-post-6-css'  href='https://kitpro.site/delivey/wp-content/uploads/sites/70/elementor/css/post-6.css?ver=1678161082' type='text/css' media='all' />
            <link rel='stylesheet' id='hfe-widgets-style-css'  href='https://kitpro.site/delivey/wp-content/plugins/header-footer-elementor/inc/widgets-css/frontend.css?ver=1.6.9' type='text/css' media='all' />
            <link rel='stylesheet' id='elementor-post-270-css'  href='https://kitpro.site/delivey/wp-content/uploads/sites/70/elementor/css/post-270.css?ver=1678161082' type='text/css' media='all' />
            <link rel='stylesheet' id='hello-elementor-css'  href='https://kitpro.site/delivey/wp-content/themes/hello-elementor/style.min.css?ver=2.4.1' type='text/css' media='all' />
       </Helmet>
      <div className="elementor-section elementor-top-section elementor-element elementor-element-3c97ff9a elementor-reverse-mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="3c97ff9a" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
        <div className="elementor-background-overlay"></div>
        <div className="elementor-container elementor-column-gap-default"></div>
      </div>
      <Header />
      <div className="main">
        <div className="container">
          <div className="signin-content">
            <div className="signin-form">
              <h2 className="form-title">Send email verification to: </h2>
              <form method="POST" className="register-form" id="login-form" onSubmit={handleEmailSubmit}>
                <div className="form-group">
                  <label htmlFor="email"><i className="zmdi zmdi-account material-icons-name"></i></label>
                  <input type="text" name="email" id="email" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group form-button">
                  {/* Conditionally render loading spinner or submit button */}
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <input type="submit" name="signin" id="signin" className="form-submit" value="Send" />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerif;