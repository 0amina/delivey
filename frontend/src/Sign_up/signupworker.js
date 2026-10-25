import React, { useEffect, useState } from "react";
import Helmet  from "react-helmet";
import './signup.css';
import Header from "../Homepage/Header/header";
import { useNavigate} from 'react-router-dom';
const Signupworker = () => {
  const navigate = useNavigate();
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const[uname,setUName]=useState('')
        const[email,setEmail]=useState('')
        const[phone,setPhone]=useState('')
        const[pass,setPass]=useState('')
        const[position,setPosition]=useState('')
        const[address,setAddress]=useState('')
        const handleClick=(e)=>{
            e.preventDefault()
            const livreur={uname,email,pass,phone,address,position}
            console.log(livreur)
            fetch("http://localhost:9006/api/auth/register/liv",{
            method:"POST",headers:{"content-Type":"application/json"},body:JSON.stringify(livreur)})
            .then(()=>{
                console.log("livreur added")
                navigate(`/login`);
            })

        }
    useEffect(() => {
        const isRefreshed = localStorage.getItem("isRefreshed");
    
        if (!isRefreshed) {
          localStorage.setItem("isRefreshed", true);
          window.location.reload();
        } else {
          localStorage.removeItem("isRefreshed");
        }
      }, []);
      useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
      const emailParam = searchParams.get('email');
      setEmail(emailParam);
        // Fetch the list of cities in Tunisia from Geonames API
        fetch(
          "http://api.geonames.org/searchJSON?q=tunisia&maxRows=1000&username=haddadamamouranim&featureClass=P"
        )
          .then((response) => response.json())
          .then((data) => {
            // Extract the list of cities from the data
            const cities = data.geonames;
            const stateNames = [...new Set(data.geonames.map(city => city.adminName1))]; // Extract the list of state names from the data
            // Update the state with the list of cities and states
            setCities(cities);
            setStates(stateNames);
          })
          .catch((error) => console.error(error));
      }, []);
      const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        setSelectedCity("");
      };
      
      const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
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
       <div className="main">
       <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <form method="POST" className="register-form" id="register-form">
                            <div className="form-group">
                                <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="UName" id="UName" placeholder="Your Name" value={uname.startsWith('livreur') ? uname : `livreur${uname}`} onChange={(e) => setUName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                <input type="email" name="email" id="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" name="pass" id="pass" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="Number" name="phone" id="phone" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                            
                            <div>
  <label htmlFor="state-select"></label>
  <select
    id="address"
    onChange={(event) => {
      handleStateChange(event);
      setAddress(event.target.value);
    }}
    style={{ marginBottom: '30px' }}
  >
    <option value="">-- Select a state --</option>
    {states.map((state) => (
      <option key={state} value={state}>
        {' '}
        {state}{' '}
      </option>
    ))}
  </select>
</div>

                            <div className="form-group">
                               <select value={position} onChange={(e) => setPosition(e.target.value)}>
                               <option value="" disabled selected hidden>Join the crew as</option>
                               <option value="Motocycle Rider">Motocycle Rider</option>
                               <option value="Pickup driver">Pickup driver</option>
                               <option value="Swift Biker">Swift Biker</option>
                                </select> 
                               
                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" value="Register" onClick={handleClick}/>
                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <div>
                       <figure><img src="assets/giphy.gif" alt="sing up image"/></figure>
                       </div><br></br>
                        <a href="/login" className="signup-image-link">I am already member</a>
                    </div>
                </div>
            </div>
        </section>

       </div>
       </>
    
  );
}

export default Signupworker;