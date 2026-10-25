import Header from "./Header/header";
import Home1 from "./Contenu/home";
import Footer from "./Footer/Footer";
import Service1 from "./Contenu/Service/service1";
import Joincrew from "./Contenu/joincrew";
import About from "./Contenu/about-us.js/how-it-works";
import Kamyoun from "./Contenu/kamyoun";
import Headhome from "./Head";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
function HomePage() {
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
    
    <div className="home page-template page-template-elementor_header_footer page page-id-753 ehf-header ehf-footer ehf-template-hello-elementor ehf-stylesheet-hello-elementor jkit-color-scheme elementor-default elementor-template-full-width elementor-kit-6 elementor-page elementor-page-753">
      <Headhome></Headhome>
      <div id="page" className="hfeed site">
        <Header></Header>
        <div data-elementor-type="wp-page" data-elementor-id="753" className="elementor elementor-753">
          <Home1></Home1>
          <Service1 ></Service1>
          <Joincrew></Joincrew>
          <About></About>
          <Kamyoun></Kamyoun>
        </div>
        <Footer></Footer>
      </div>
      
    </div>
  );
}

export default HomePage;