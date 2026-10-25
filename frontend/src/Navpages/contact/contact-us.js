import React, { useEffect } from "react";
import Headcontact from "./head";
import Header from "../../Homepage/Header/header";
import Form from "./formm";
import Blogcontact from "./Blog";
import Mappp from "./map";
import Footer from "../../Homepage/Footer/Footer";
import { Helmet } from "react-helmet";
import './contact.css';

const Contact_us = () => {
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
<Headcontact></Headcontact>
		<Header></Header>		
	    <body class="envato_tk_templates-template envato_tk_templates-template-elementor_header_footer single single-envato_tk_templates postid-405 ehf-header ehf-footer ehf-template-hello-elementor ehf-stylesheet-hello-elementor jkit-color-scheme elementor-default elementor-template-full-width elementor-kit-6 elementor-page elementor-page-405">
            <div id="page" class="hfeed site">
			
			<div data-elementor-type="wp-post" data-elementor-id="405" class="elementor elementor-405">
			<section class="elementor-section elementor-top-section elementor-element elementor-element-dad7889 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="dad7889" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
					<div class="elementor-background-overlay"></div>
					<div class="elementor-container elementor-column-gap-default">
					    <div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-520da50" data-id="520da50" data-element_type="column">
			                <div class="elementor-widget-wrap elementor-element-populated">
								<div class="elementor-element elementor-element-239c31d elementor-widget elementor-widget-heading" data-id="239c31d" data-element_type="widget" data-widget_type="heading.default">
				                    <div class="elementor-widget-container">
			                            <h1 class="elementor-heading-title elementor-size-default">Contact Us</h1>
		                            </div>
				                </div>
				                <div class="elementor-element elementor-element-548217b elementor-widget elementor-widget-text-editor" data-id="548217b" data-element_type="widget" data-widget_type="text-editor.default">
				                    <div class="elementor-widget-container">
			           	                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>					
									</div>
				                </div>
					        </div>
		                </div>
					</div>
		    </section>
           <Form></Form>
			<Blogcontact></Blogcontact>
			<Mappp></Mappp>
			</div>
			<Footer></Footer>

			</div>
		</body>
	</>
  );
};

export default Contact_us;