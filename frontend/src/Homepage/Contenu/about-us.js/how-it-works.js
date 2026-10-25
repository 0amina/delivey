import React from "react";
import Blogs from "./blogs";
import Stayhome from "./stay-home";

const About = () => {
  return (
    <>    
    {/* How delivery works tiltle */}
    <section class="elementor-section elementor-top-section elementor-element elementor-element-1e7adaa3 elementor-section-boxed elementor-section-height-default elementor-section-height-default" id="aboutscroll" data-id="1e7adaa3" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;shape_divider_bottom&quot;:&quot;curve&quot;}">
				<div class="elementor-shape elementor-shape-bottom" data-negative="false">
			        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <path class="elementor-shape-fill" d="M1000,4.3V0H0v4.3C0.9,23.1,126.7,99.2,500,100S1000,22.7,1000,4.3z"/>
                    </svg>		
				</div>
				<div class="elementor-container elementor-column-gap-default">
					<div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-346d535" data-id="346d535" data-element_type="column">
			            <div class="elementor-widget-wrap elementor-element-populated">
							<div class="elementor-element elementor-element-56b47651 elementor-invisible elementor-widget elementor-widget-heading" data-id="56b47651" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;}" data-widget_type="heading.default">
				                <div class="elementor-widget-container">
			                        <h2 class="elementor-heading-title elementor-size-default">How Delivery Works</h2>		
			                    </div>
				            </div>
				            <div class="elementor-element elementor-element-4053b5fa elementor-invisible elementor-widget elementor-widget-text-editor" data-id="4053b5fa" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;}" data-widget_type="text-editor.default">
				                <div class="elementor-widget-container">
							        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>						</div>
				                </div>
					        </div>
		                </div>
					</div>
		</section>
    {/* How delivery works 4blogs */}
    <Blogs></Blogs>
    {/* Stay home section */}
    <Stayhome></Stayhome>
    </>
  );
};

export default About;