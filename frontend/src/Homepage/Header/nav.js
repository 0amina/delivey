import React, { useState } from "react";
import {Link }from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link as ScrollLink } from 'react-scroll';
import axios from "axios";
import './nav.css';

const Navbar = () => {
   const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
 
  
  const handleNotificationsClick = async () => {
	setDropdownOpen(!dropdownOpen);
    if (showNotifications) {
      setShowNotifications(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:9006/api/notifications/latest");
      setNotifications(response.data);
      setShowNotifications(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
	
   // nav 
    <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-30077715" data-id="30077715" data-element_type="column">
       <div className="elementor-widget-wrap elementor-element-populated">
           {/* Menu */}
           <div className="elementor-element elementor-element-3a30274b elementor-widget__width-auto hfe-menu-item-space-between hfe-submenu-icon-arrow hfe-link-redirect-child elementor-widget elementor-widget-navigation-menu" data-id="3a30274b" data-element_type="widget"  data-widget_type="navigation-menu.default">
                <div className="elementor-widget-container">
					<div className="hfe-nav-menu__toggle elementor-clickable hfe-flyout-trigger" tabIndex="0">
					    <div className="hfe-nav-menu-icon">
						    <MenuIcon>Menu</MenuIcon>
					    </div>
				    </div>
			        <div className="hfe-flyout-wrapper" data-last-item="cta" >
				        <div className="hfe-flyout-overlay elementor-clickable"></div>
				        <div className="hfe-flyout-container">
					        <div id="hfe-flyout-content-id-3a30274b" className="hfe-side hfe-flyout-right hfe-flyout-open" data-layout="right" data-flyout-type="push">
						        <div className="hfe-flyout-content push">						
							        <nav >
								        <ul id="menu-1-3a30274b" className="hfe-nav-menu">
					                        <li id="menu-item-278" className="menu-item menu-item-type-custom menu-item-object-custom parent hfe-creative-menu">
											
	       				                        <a href="/" className = "hfe-menu-item">Home</a>
												
									        </li>
                                            <li id="menu-item-279" className="menu-item menu-item-type-custom menu-item-object-custom parent hfe-creative-menu">
												<ScrollLink
												activeClass="current"
												to="aboutscroll"
												spy={true}
												smooth={true}
												offset={-70}
												duration={900}
												className = "hfe-menu-item"
												href="/about"
												>
                                                About
												</ScrollLink>
												
											</li>
                                            <li id="menu-item-280" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children parent hfe-has-submenu hfe-creative-menu"><div className="hfe-has-submenu-container"><a href="#" className = "hfe-menu-item">Pages
											<ArrowDropDownIcon>ArrowDropDown</ArrowDropDownIcon></a></div>
                                            
											<ul className="sub-menu">
											
	                                            <li id="menu-item-724" className="menu-item menu-item-type-custom menu-item-object-custom hfe-creative-menu">
												    <ScrollLink 

													 activeClass="current"
													 to="servicee"
													 spy={true}
													 smooth={true}
													 offset={-70}
													 duration={900}
													 className = "hfe-sub-menu-item"
													 href="/service"
													>Service</ScrollLink>
												        
												</li>
											
                                                <li id="menu-item-725" className="menu-item menu-item-type-custom menu-item-object-custom hfe-creative-menu">
                                                   <a className="hfe-sub-menu-item" href="/signup">Be Partner </a>
                                                         </li>

													<li id="menu-item-726" className="menu-item menu-item-type-custom menu-item-object-custom hfe-creative-menu"><a href="https://kitpro.site/delivey/template-kit/team/" className = "hfe-sub-menu-item">Team</a></li>

	                                            <li id="menu-item-728" className="menu-item menu-item-type-custom menu-item-object-custom hfe-creative-menu">
													<a href="/pricing" className = "hfe-sub-menu-item">Pricing</a></li>
                                           </ul>
                                            </li>
                                            <li id="menu-item-281" className="menu-item menu-item-type-custom menu-item-object-custom parent hfe-creative-menu">
												<Link className = "hfe-menu-item" to="/contact">
												<button>Contact Us</button>

											    </Link>
											</li>
                                        </ul>
                                    </nav>
						            <div className="elementor-clickable hfe-flyout-close" tabIndex="0">
									    <KeyboardBackspaceIcon>KeyboardBackspace</KeyboardBackspaceIcon>	
									</div>
					            </div>
					        </div>
	                    </div>
			        </div>				
				</div>
           </div>
           {/* <!-- auth button --> */}
           <div className="elementor-element elementor-element-6d4c4f3c elementor-widget__width-auto elementor-widget elementor-widget-button" data-id="6d4c4f3c" data-element_type="widget" data-widget_type="button.default">
				<div className="elementor-widget-container">
					<div className="elementor-button-wrapper">
					<Link className = "hfe-menu-item" to="/login">
					    <a  className="elementor-button-link elementor-button elementor-size-sm" > 
				        <PersonIcon>Person</PersonIcon>
						</a>    
			        </Link>
		            </div>								
			    </div>
		   </div>
            {/* <!-- notification button --> */}
			<div>
           <div className="elementor-element elementor-element-1547ad61 elementor-widget__width-auto elementor-widget elementor-widget-button" data-id="1547ad61" data-element_type="widget" data-widget_type="button.default">
				<div className="elementor-widget-container">
				    <div className="elementor-button-wrapper">
		                <a onClick={handleNotificationsClick } className="elementor-button-link elementor-button elementor-size-sm" role="button">
						    <span className="elementor-button-content-wrapper">
					            <NotificationsIcon>Notifications</NotificationsIcon>
							    <span className="elementor-button-text"></span>
	                        </span>
		                </a>
						
		            </div>
			    </div>
	       </div>
		   {dropdownOpen && (
        <div className="dropdown">
          <ul>
            {notifications.map(notification => (
              <li key={notification.id}>{notification.message}</li>
            ))}
          </ul>
        </div>
      )}
	  </div>
       </div> 
    </div>
    
  );
};

export default Navbar;