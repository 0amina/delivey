import React,{useState} from "react";
import Sidebar from "./sidebar";
import Header from "../Homepage/Header/header";
import Home from "./home";
import { Route, Routes } from "react-router-dom"
import List_client from "./list_client";
import List_livreur from "./list_livreur";
import List_package from "./list-package";
import { Helmet } from "react-helmet";
import Dash from "./dashboard";
import List_contact from "./list_contact";
export default function Admin() {
 
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleMenuItemClick = (component) => {
      setSelectedComponent(component);
    };
  
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
    
<Sidebar onMenuItemClick={handleMenuItemClick}></Sidebar>
<div className="cont">
{selectedComponent ? (
          selectedComponent
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/today_pack" element={<List_client />} />
            <Route path="/Allcontact" element={<List_contact />} />
            <Route path="/All" element={<List_livreur />} />
            <Route path="/All" element={<List_package />} />
            <Route path="/dash" element={<Dash />} />
          </Routes>
        )}
      </div>

</>  
  
    )
}