import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useNavigate } from 'react-router-dom';
import Header from "../Homepage/Header/header";
import { Helmet } from "react-helmet";
import './login.css';

const Loginadmin = () => {
  const [uname, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const navigate = useNavigate();

  // Extract the email from the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const extractedEmail = urlParams.get('email');
    if (extractedEmail) {
      setEmail(extractedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const response = await fetch("http://localhost:9006/api/auth/authenticate/admin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uname, pass })
    });
    if (response.ok) {
      const admin = await response.json();
      localStorage.setItem('admin', JSON.stringify(admin));
      
      // Add the email parameter to the URL before navigating
      navigate(`/admin?email=${uname}`);
    } else {
      console.log('Login failed');
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
       <div class="elementor-section elementor-top-section elementor-element elementor-element-3c97ff9a elementor-reverse-mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="3c97ff9a" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
			    <div class="elementor-background-overlay"></div>
				<div class="elementor-container elementor-column-gap-default"></div>
                
                </div>
                <Header></Header>
                <div class="main">
                <div class="container">
                <div class="signin-content">
                    <div class="signin-image">
                        <figure>< img src="assets/signin-image.jpg" alt="sing up image"/></figure>
                        
             
                        
                    </div>
                    
                    <div class="signin-form">
                    <h2 class="form-title">Sign In</h2>
                
        <form method="POST" class="register-form" id="login-form" >
          <div class="form-group">
            <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
            <input type="text" name="email" id="email" placeholder="Your Email" value={uname} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div class="form-group">
            <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
            <input type="password" name="pass" id="pass" placeholder="Password" value={pass} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div class="form-group">
            <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
            <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
          </div>
          <div class="form-group form-button">
          <input type="submit" name="signin" id="signin" class="form-submit" value="Log in" onClick={(e) => handleSubmit(e)} />


          </div>
        </form>
        
        </div>
                        
       </div>
      
      </div>
      </div>


      </>
    );
  };
  
  export default Loginadmin;