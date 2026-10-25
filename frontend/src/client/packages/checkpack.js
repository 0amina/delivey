import React, { useState, useEffect } from "react";
import "../dash.css";
import Popup from "./AddPopup";
import MapPopup from "./MapPopup";  // Import the MapPopup component
import { useLocation } from 'react-router-dom';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
const Checkpack = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isOpenMap, setIsOpenMap] = useState(false); 
  const [mapLocation, setMapLocation] = useState(null);  
  const [data, setData] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = query.get('email');
        const response = await fetch(`http://localhost:9006/api/colissbyemail?email=${email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query]);

  // Function to handle "See Location" button click
  const handleSeeLocationClick = async (livreurEmail) => {
    try {
      const response = await fetch(`http://localhost:9006/api/location/getByEmail?email=${livreurEmail}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const locationData = await response.json();
      setMapLocation(locationData[0]);  
      setIsOpenMap(true);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  return (
    <section id="content">
      <main>
        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Check Packs</h3>
              <i className='bx bx-plus' onClick={() => setIsOpenPopup(true)}></i>
              {isOpenPopup && <Popup setIsOpenPopup={setIsOpenPopup} />}
              <i className='bx bx-search'></i>
              <i className='bx bx-filter'></i>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Order Date</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {data && data.map(item => {
                  let Class = null;
                  let status = item.status;
                  if (status === 'en cours') {
                    Class = 'status completed';
                  } else if (status === 'livré') {
                    Class = 'status pending';
                  } else if (status === 'returned') {
                    Class = 'status process';
                  }
                  const isEditDisabled = status === 'livré' || status === 'returned';

                  return (
                    <tr key={item.idColis}>
                      <td>{item.idColis}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.clientState}</td>
                      <td>{item.clientCitie}</td>
                      <td>{item.clientAdress}</td>
                      <td><span className={Class}>{item.status}</span></td>
                      <td>
                      <NotListedLocationIcon
                          onClick={() => handleSeeLocationClick(item.livreur)}
                          style={{ fontSize: "17px" }}
                        >
                          print
                        </NotListedLocationIcon>
                        
                      
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              
            </table>
          </div>
        </div>
      </main>

      {/* Render the MapPopup component conditionally */}
      {isOpenMap && mapLocation && (
        <MapPopup
          isOpenMap={isOpenMap}
          setIsOpenMap={setIsOpenMap}
          location={mapLocation}
        />
      )}
    </section>
  );
};

export default Checkpack;
