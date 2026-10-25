import React ,{useRef}from "react";
import Service2 from "./service2";
import Service3 from "./service3";
import Service4 from "./service4";
import Service5 from "./service5";
import { ContactContext } from "../../Header/nav";


const Service1 = () => {
 const ContactRef = useRef(null);
  return (
   
    <>
    <section class="elementor-section elementor-top-section elementor-element elementor-element-60f9edc5 elementor-section-boxed elementor-section-height-default elementor-section-height-default" id="servicee" data-id="60f9edc5" data-element_type="section">
    <div class="elementor-container elementor-column-gap-default">
        {/* image driver*/}   
        <div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-50b76f8e" data-id="50b76f8e" data-element_type="column">
            <div class="elementor-widget-wrap elementor-element-populated">
                <div class="elementor-element elementor-element-7b69bedf elementor-widget elementor-widget-elementskit-lottie" data-id="7b69bedf" data-element_type="widget" data-widget_type="elementskit-lottie.default">
                    <div class="elementor-widget-container">
                        <div class="ekit-wid-con" >
                            <div id="ekit_lottie_7b69bedf" class="ekit_lottie" data-autoplay="true" data-on-scroll="" data-speed="1" data-direction="" data-action="" data-renderer="svg" data-path="https://assets9.lottiefiles.com/packages/lf20_evdwf7u4.json" data-loop="true">&nbsp;</div>
                        </div>		
                    </div>
                </div>
            </div>
        </div>
        <div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-5f112c2d" data-id="5f112c2d" data-element_type="column">
            <div class="elementor-widget-wrap elementor-element-populated">
                {/* titre*/}
                <div class="elementor-element elementor-element-5e33aa03 elementor-invisible elementor-widget elementor-widget-heading" data-id="5e33aa03" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;}" data-widget_type="heading.default">
                    <div class="elementor-widget-container">
                        <h2 class="elementor-heading-title elementor-size-default">Do you want a fast service? Just call us.</h2>
                    </div>
                </div>
                {/* description*/}
                <div class="elementor-element elementor-element-c86e9d3 elementor-invisible elementor-widget elementor-widget-text-editor" data-id="c86e9d3" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;}" data-widget_type="text-editor.default">
                    <div class="elementor-widget-container">
                    <p>Place your order and enjoy fast, reliable delivery service. Our dedicated team ensures timely delivery. We value your satisfaction.</p>	
          </div>
                </div>
                {/* button call us*/}
                <div class="elementor-element elementor-element-513130f1 elementor-mobile-align-center elementor-invisible elementor-widget elementor-widget-button" data-id="513130f1" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;}" data-widget_type="button.default">
                    <div class="elementor-widget-container">
                        <div class="elementor-button-wrapper">
                            <a href="#" class="elementor-button-link elementor-button elementor-size-sm" role="button">
                                <span class="elementor-button-content-wrapper">
                                <span class="elementor-button-text">Call Us</span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    </div>
    </section>
    <Service2></Service2>
    <Service3></Service3>
    <Service4></Service4>
    <Service5></Service5>
    </>
  );
};

export default Service1;