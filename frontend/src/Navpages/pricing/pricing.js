import React from "react";
import Header from "../../Homepage/Header/header";
import { useEffect } from "react";
import Headpricing from "./Head";
import Offer from "./WhatWeOffer";
import Footer from "../../Homepage/Footer/Footer";
import Blogs from "./blogs";
import HowWork from "./HowDileveyWork";
import Process from "./Process";
const Pricing = () => {
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
    <div className="envato_tk_templates-template envato_tk_templates-template-elementor_header_footer single single-envato_tk_templates postid-424 ehf-header ehf-footer ehf-template-hello-elementor ehf-stylesheet-hello-elementor jkit-color-scheme elementor-default elementor-template-full-width elementor-kit-6 elementor-page elementor-page-424" >
		<Headpricing></Headpricing>
		<div id="page" className="hfeed site">
            <Header></Header>
		    <div data-elementor-type="wp-post" data-elementor-id="424" className="elementor elementor-424">
		        <section className="elementor-section elementor-top-section elementor-element elementor-element-f206490 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="f206490" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
				<div className="elementor-background-overlay"></div>
				<div className="elementor-container elementor-column-gap-default">
					<div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-ebe59f4" data-id="ebe59f4" data-element_type="column">
			            <div className="elementor-widget-wrap elementor-element-populated">
							<div className="elementor-element elementor-element-7a49286 elementor-widget elementor-widget-heading" data-id="7a49286" data-element_type="widget" data-widget_type="heading.default">
				                <div className="elementor-widget-container">
                                    <h1 className="elementor-heading-title elementor-size-default">Pricing</h1>		
								</div>
				            </div>
				            <div className="elementor-element elementor-element-e621f8a elementor-widget elementor-widget-text-editor" data-id="e621f8a" data-element_type="widget" data-widget_type="text-editor.default">
				                <div className="elementor-widget-container">
			                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>				
		                        </div>
				            </div>
					    </div>
		            </div>
				</div>
		        
				</section>
                <Offer></Offer>
                <Blogs></Blogs>
				<HowWork></HowWork>
				<Process></Process>
		    </div>
		<Footer></Footer>	
		</div>
	</div>
	</>
  );
};

export default Pricing;