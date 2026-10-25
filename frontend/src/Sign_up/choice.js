import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../Homepage/Header/header";
import {Link }from 'react-router-dom';
import './signup.css';
const Choice = () => {
    useEffect(() => {
        const isRefreshed = localStorage.getItem("isRefreshed");
    
        if (!isRefreshed) {
          localStorage.setItem("isRefreshed", true);
          window.location.reload();
        } else {
          localStorage.removeItem("isRefreshed");
        }
      }, []);
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
                <div className="main">
       <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up As :</h2>
                        <figure><img src="assets/100.jpg" alt="sing up image"/></figure>
                    </div>
                    <div className="signup-image">
                        <div>
                        <Link className = "hfe-menu-item" to="/signup">
                        <div>
                       <button> client</button>
                       </div>
                       </Link>
                       <br></br>
                       <Link className = "hfe-menu-item" to="/signupworker">
                       <div>
                       <button> worker</button>
                       </div>
                       </Link>
                       </div><br></br>
                       
                    </div>
                </div>
            </div>
        </section>

       </div>
         </>
    
    );
  }
  
  export default Choice;