import React from "react";
import './liv.css';
import Today_pack from "./Today_pack";
import Delivered_pack from "./delivered";
import Canceled_pack from "./canceled";
import Pending_pack from "./pending";
import Dash from "./dashboard";
import Profile from "./profile";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
export default function Sidebar(props) {
  const handleMenuItemClick = (component) => {
    props.onMenuItemClick(component);
  };
    window.onload = function() {
        let arrow = document.querySelectorAll(".arrow");
        for (var i = 0; i < arrow.length; i++) {
          arrow[i].addEventListener("click", (e)=>{
         let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
         arrowParent.classList.toggle("showMenu");
          });
        }
        let sidebar = document.querySelector(".sidebar");
        let sidebarBtn = document.querySelector(".bx-menu");
        console.log(sidebarBtn);
        sidebarBtn.addEventListener("click", ()=>{
          sidebar.classList.toggle("close");
        });}
return(
    <>
<link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'></link>

<body>
  
    
  <div className="sidebar close">
    <div className="logo-details">
      
      <span className="logo_name"></span>
    </div>
    <ul className="nav-links">
    <li>
        <a onClick={() => handleMenuItemClick(<Dash />)}>
          <i class='bx bx-grid-alt' ></i>
          <span className="link_name">Dashboard</span>
        </a>
        <ul className="sub-menu blank">
          <li>
            <a onClick={() => handleMenuItemClick(<Dash />)}
               className="link_name" >Dashboard</a>
          </li>
        </ul>
      </li>
      <li>
        <a onClick={() => handleMenuItemClick(<Today_pack />)}>
        <LocalShippingOutlinedIcon style={{color:'white',marginLeft:'30px'}}></LocalShippingOutlinedIcon>
          <span className="link_name">My Deliveries</span>
        </a>
        <ul className="sub-menu blank">
          <li>
            <a onClick={() => handleMenuItemClick(<Today_pack />)}
               className="link_name" >My Deliveries</a>
          </li>
        </ul>
      </li>
      <li>
        <div className="iocn-link">
          <a href="#">
            <i class='bx bx-collection' ></i>
            <span className="link_name"> Packages</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul className="sub-menu">
          <li><a className="link_name" href="#">All Packages</a></li>
          <li><a onClick={() => handleMenuItemClick(<Delivered_pack />)} >All Packages</a></li>
         
        </ul>
      </li>
      



      
      <li>
    <div className="profile-details">
      <div className="profile-content">
      <img src="assets/profile.png" alt="profileImg" onClick={() => handleMenuItemClick(<Profile />)}></img> 
      </div>
      <div className="name-job">
        <div className="profile_name">Prem Shahi</div>
        <div className="job">Web Desginer</div>
      </div>
      <i class='bx bx-log-out' ></i>
    </div>
  </li>
</ul>
  </div>
  <section className="home-section">
    <div className="home-content">
      <i class='bx bx-menu' ></i>
      <span className="text"></span>
    </div>
  </section>
</body>
</>
    )
}
