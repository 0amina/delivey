import React, { useState, useEffect } from "react";
import './dash.css';
import { useLocation } from "react-router-dom";

const Delivered_pack = () => {

  const [data, setData] = useState([]);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const fetchData = async () => {
    try {
      const query = new URLSearchParams(location.search);
      const email = query.get("email");
      let apiUrl = `http://localhost:9006/api/byLivreur?livreurEmail=${email}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        console.error("Network response was not ok");
        // Handle error, set state accordingly
        return;
      }

      const data = await response.json();

      // Filter the data based on the search query
      const filteredData = searchQuery
        ? data.filter((item) =>
            Object.values(item).some(
              (value) =>
                value !== null &&
                value.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
          )
        : data;

      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.search, searchQuery ]);

  const handleSearchInputChange = (event) => {
    console.log("Search input changed:", event.target.value);
    setSearchQuery(event.target.value);
  };

  const handleSearchIconClick = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const handleTakeDelivery = async (idColis) => {
    try {
      const query = new URLSearchParams(location.search);
      const email = query.get("email");

      // Make a request to update the livreur attribute
      const response = await fetch(`http://localhost:9006/api/colis/updateLivreur?idColis=${idColis}&livreur=${email}`, {
        method: 'PUT', // Assuming you use a PUT request for updating
      });

      if (response.ok) {
        await fetchData(email);}
        else{
        console.error("Failed to update livreur");
        // Handle error, display a message to the user, etc.
        return;
      }

      // Refresh the data after updating the livreur
      fetchData();
    } catch (error) {
      console.error("Error updating livreur:", error);
    }
  };
  
  
 
      // Refresh the data after updating the livreur
  
  return (
    <section id="content">
      <main>
        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Manage Packs</h3>
              <div
                className="search-bar"
                style={{ display: isSearchBarVisible ? "block" : "none" ,marginRight: 300,width:370}}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </div>
           
              <i className="bx bx-search" onClick={handleSearchIconClick}></i>
              <i className="bx bx-filter"></i>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Agence</th>
                  <th>Order Date</th>
                  <th>Nb Pickup</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  let Class = null;
                  let status = item.status;
                  if (status === "pending") {
                    Class = "status completed";
                  } else if (status === "delivered") {
                    Class = "status pending";
                  } else if (status === "returned") {
                    Class = "status process";
                  } else if (status === "canceled") {
                    Class = "status process";
                  }
                  
                   
                  
                  

                  return (
                    <tr key={item.idColis}>
                      <td>{item.idColis}</td>
                      <td>{item.clientCitie}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.nbPiece}</td>
                      <td>{item.price}</td>
                      <td>
                        <span className={Class}>{item.status}</span>
                      </td>
                    
                      <td>
  <button
    style={{
      padding: '5px',
      paddingTop:'1px',
      paddingBottom:'1px', // specify the padding you want
      marginTop:'-15px',
    }}
    onClick={() => handleTakeDelivery(item.idColis)}
  >
    Take this delivery
  </button>
</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
           
          </div>
        </div>
      </main>
    </section>
  );
};

export default Delivered_pack;