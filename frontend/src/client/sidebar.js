import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './client.css';
import Dashboard from "./dashboard";
import Addpack from "./packages/addpack";
import Checkpack from "./packages/checkpack";
import Managepack from "./packages/managepack";
import Pay from "./pay";
import Profile from "./profile";
const Sidebar = (props) => {
  const [user, setuser] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = new URLSearchParams(location.search).get("email");
        const response = await fetch(`http://localhost:9006/api/client?email=${email}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setuser(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location.search]);

  const handleMenuItemClick = (component) => {
    props.onMenuItemClick(component);
  };

  useEffect(() => {
    let arrow = document.querySelectorAll(".arrow");
    for (var i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener("click", (e) => {
        let arrowParent = e.target.parentElement.parentElement; //selecting the main parent of arrow
        arrowParent.classList.toggle("showMenu");
      });
    }
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".bx-menu");
    console.log(sidebarBtn);
    sidebarBtn.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });
  }, []);
      
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
        <a onClick={() => handleMenuItemClick(<Dashboard />)}>
          <i class='bx bx-grid-alt' ></i>
          <span className="link_name">Dashboard</span>
        </a>
        <ul className="sub-menu blank">
          <li>
            <a onClick={() => handleMenuItemClick(<Dashboard />)}
               className="link_name" >Dashboard</a>
          </li>
        </ul>
      </li>
      <li>
        <div className="iocn-link">
          <a href="#">
            <i class='bx bx-collection' ></i>
            <span className="link_name">Packages</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul className="sub-menu">
          <li><a className="link_name" href="#">My Packages</a></li>
          <li><a onClick={() => handleMenuItemClick(<Addpack />)}>Add a package</a></li>
          <li><a onClick={() => handleMenuItemClick(<Managepack />)}>Manage Packages</a></li>
          <li><a onClick={() => handleMenuItemClick(<Checkpack/>)}>Check Packages</a></li>
        </ul>
      </li>
      <li>
        <div className="iocn-link">
          <a href="#">
            <i class='bx bx-book-alt' ></i>
            <span className="link_name">Payment</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
        <ul className="sub-menu">
          <li><a className="link_name" href="#">Payment</a></li>
          <li><a onClick={() => handleMenuItemClick(<Pay />)}>Manage Payment</a></li>
      
        </ul>
      </li>
    



      
      <li>
    <div className="profile-details">
      <div className="profile-content">
      <img src="assets/profile.png" alt="profileImg" onClick={() => handleMenuItemClick(<Profile />)}></img> 
      </div>
      <div className="name-job">
        <div className="profile_name">{user.uname}</div>
        <div className="job">{user.job}</div>
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
export default Sidebar;