import React from "react";
import Logosite from "./logo";
import Navbar from "./nav";
const Header = () => {
  return (
      <header id="masthead" itemscope="itemscope" itemtype="https://schema.org/WPHeader"> 
			  <div data-elementor-type="wp-post" data-elementor-id="270" class="elementor elementor-270">
				  <section class="elementor-section elementor-top-section elementor-element elementor-element-68159a69 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="68159a69" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
            <div class="elementor-container elementor-column-gap-default">
            <Logosite></Logosite>
            <Navbar></Navbar>
            </div>
          </section>
		    </div>
		  </header>
    
  );
};

export default Header;
