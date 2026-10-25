import React, { useState, useEffect } from "react";
import './dash.css';
import { useLocation } from 'react-router-dom';
const Dash = () => {
  const [dashboardCounts, setDashboardCounts] = useState(null);
  const location = useLocation();

  const fetchData = async () => {
    try {
      const email = new URLSearchParams(location.search).get('email');
      const response = await fetch(`http://localhost:9006/api/colis/livdashboard-counts?email=${email}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDashboardCounts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.search]);
    return(
      <>
      <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'/>

      <body>
        <section id="content">
          <main>
            <div className="head-title">
              <div className="left">
                <h1>Dashboard</h1>
                <ul className="breadcrumb">
                  <li>
                    <a href="#">Dashboard</a>
                  </li>
                  <li><i className='bx bx-chevron-right' ></i></li>
                  <li>
                    <a className="active" href="#">Home</a>
                  </li>
                </ul>
              </div>
              <a href="#" className="btn-download">
                <i className='bx bxs-cloud-download' ></i>
                <span className="text">Download PDF</span>
              </a>
            </div>

            {dashboardCounts ? (
        <>
          <ul className="box-info">
            <li>
              <i className="bx bxs-calendar-check"></i>
              <span className="text">
                <h3>{dashboardCounts.totalCount}</h3>
                <p>Total Package created</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-group"></i>
              <span className="text">
                <h3>{dashboardCounts.enCoursCount}</h3>
                <p>Package en attente</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-dollar-circle"></i>
              <span className="text">
                <h3>{dashboardCounts.retourCount}</h3>
                <p>package returned</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-calendar-check"></i>
              <span className="text">
                <h3>{dashboardCounts.livreCount}</h3>
                <p>package delivered</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-calendar-check"></i>
              <span className="text">
                <h3>{dashboardCounts.echangeCount}</h3>
                <p>package exchanged</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-calendar-check"></i>
              <span className="text">
                <h3>{dashboardCounts.livrePayeCount}</h3>
                <p>package delivered and paid</p>
              </span>
            </li>
          </ul>
        </>
      ) : (
        <p>Loading dashboard counts...</p>
      )}
			
		
		</main>
        
        </section>
        </body>
        </>
    )
}
export default Dash;