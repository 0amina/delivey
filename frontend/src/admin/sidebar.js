import React from "react";
import List_client from "./list_client";
import List_livreur from "./list_livreur";
import List_package from "./list-package";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Dash from "./dashboard";
import List_contact from "./list_contact";
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
        <a onClick={() => handleMenuItemClick(<List_client />)}>
        <Person2OutlinedIcon style={{color:'white',marginLeft:'30px'}}></Person2OutlinedIcon>
        
          <span className="link_name">Client List</span>
        </a>
        <ul className="sub-menu blank">
          <li>
            <a onClick={() => handleMenuItemClick(<List_client />)}
               className="link_name" >Client List</a>
          </li>
        </ul>
      </li>
      <li>
        <a onClick={() => handleMenuItemClick(<List_livreur />)}>
        <EngineeringOutlinedIcon style={{color:'white',marginLeft:'30px'}}></EngineeringOutlinedIcon>
          <span className="link_name">Workers List</span>
        </a>
        <ul className="sub-menu blank">
          <li>
            <a onClick={() => handleMenuItemClick(<List_livreur />)}
               className="link_name" >Workers List</a>
          </li>
        </ul>
      </li>

      <li>
        <a onClick={() => handleMenuItemClick(<List_contact />)}>
        <EngineeringOutlinedIcon style={{color:'white',marginLeft:'30px'}}></EngineeringOutlinedIcon>
          <span className="link_name">Contact-us List</span>
        </a>
        <ul className="sub-menu blank">
          <li>
            <a onClick={() => handleMenuItemClick(<List_contact />)}
               className="link_name" >Contact-us List</a>
          </li>
        </ul>
      </li>


      <li>
        <a onClick={() => handleMenuItemClick(<List_package />)}>
         <LocalShippingOutlinedIcon style={{color:'white',marginLeft:'30px'}}></LocalShippingOutlinedIcon>
          <span className="link_name">Packages List</span>
        </a>
        <ul className="sub-menu blank">
          <li>
            <a onClick={() => handleMenuItemClick(<List_package />)}
               className="link_name" >Packages List</a>
          </li>
        </ul>
      </li>
     
      



      
      <li>
    <div className="profile-details">
      <div className="profile-content">
      <img src="assets/profile.png" alt="profileImg"></img> 
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
