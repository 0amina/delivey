import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route, Link } from 'react-router-dom';
import Header from '../Homepage/Header/header';
import './login.css';
import Loginclient from './loginclient';
import Loginworker from './loginworker';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useNavigate } from 'react-router-dom';
const Login = (props) =>  {
  const [selectedComponent, setSelectedComponent] = useState(null);

    const handleFormCompletion = () => {
      // handle form completion logic
    };
  
    const handleMenuItemClick = (component) => {
      props.onMenuItemClick(component);
      setSelectedComponent(component);
    };
  
    useEffect(() => {
      const isRefreshed = localStorage.getItem('isRefreshed');
  
      if (!isRefreshed) {
        localStorage.setItem('isRefreshed', true);
        window.location.reload();
      } else {
        localStorage.removeItem('isRefreshed');
      }
    }, []);
return(
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
            <button className='butt' onClick={(e) => { e.target.classList.add('clicked'); setSelectedComponent(<Loginclient onComplete={handleFormCompletion} />); }}>login as client</button>

        <button className='butt' onClick={(e) =>{e.target.classList.add('clicked'); setSelectedComponent(<Loginworker onComplete={handleFormCompletion} />);}}>login as worker</button>
      
                <div class="signin-content">
                    <div class="signin-image">
                        <figure>< img src="assets/signin-image.jpg" alt="sing up image"/></figure>
                        <Link className = "signup-image-link" to="/choice">
                        <a  className="signup-image-link">Create an account</a>
                        </Link>
                    </div>
                    
                    <div class="signin-form">
                    <h2 class="form-title">Sign In</h2>
                    <div>
        {selectedComponent ? (
          selectedComponent
        ) : (
          <Routes>
            <Route path="/loginclient" element={<Loginclient onComplete={handleFormCompletion} />} />
            <Route path="/loginworker" element={<Loginworker onComplete={handleFormCompletion} />} />
          </Routes>
        )}
      </div>
                        
       </div>
      
      </div>
      </div>

  </div>
    </>
)
};

export default Login;