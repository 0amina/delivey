import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const Today_pack = () => {
  const [colisList, setColisList] = useState([]);
  const location = useLocation();
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [livreurEmail, setLivreurEmail] = useState('');

  useEffect(() => {
    const email = new URLSearchParams(location.search).get('email');
    if (email) {
      setLivreurEmail(email);
      fetchColisForToday(email);
    }
  }, [location.search, searchQuery]);

  const updateColisStatus = async (colisId, newStatus) => {
    console.log('Updating colis status:', colisId, newStatus);
    const trimmedStatus = newStatus.replace(/"/g, "");
    console.log('Trimmed Status:', trimmedStatus);
    try {
      const response = await fetch(`http://localhost:9006/api/livreur/${colisId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trimmedStatus),
      });

      if (response.ok) {
        // Fetch the updated colis list after the status update
        await fetchColisForToday(livreurEmail);
      } else {
        console.error('Failed to update colis status');
      }
    } catch (error) {
      console.error('Error updating colis status:', error);
    }
  };

  const fetchColisForToday = async (email) => {
    try {
      const response = await fetch(`http://localhost:9006/api/livreurlist?livreurEmail=${email}`);
      if (response.ok) {
        const data = await response.json();
        const filteredData = searchQuery
        ? data.filter((item) =>
            Object.values(item).some(
              (value) =>
                value !== null &&
                value.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
          )
        : data;

      setColisList(filteredData);
      } else {
        console.error('Failed to fetch colis for today');
      }
    } catch (error) {
      console.error('Error fetching colis for today:', error);
    }
  };

  const handleSearchIconClick = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const handleSearchInputChange = event => {
    console.log('Search input changed:', event.target.value);
    setSearchQuery(event.target.value);
  };
  
  return (
    <section id="content">
      <main>
        <div className="table-data">
          <div className="order">
          <div className="head">
              <h3>My Deliveries</h3>
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
                  <th>Order Date</th>
                  <th>City</th>
                  <th>Address</th>
                  <th>Total</th>
                  <th>Fragil</th>
                  <th>Status</th>
                  
                  </tr>
                </thead>
                <tbody>
                {colisList && colisList.map((item) => {
                  let statusClass = null;
                  let status = item.status;
                  if (status === 'pending') {
                    statusClass = 'status pending';
                  } else if (status === 'delivered') {
                    statusClass = 'status completed';
                  } else if (status === 'returned') {
                    statusClass = 'status process';
                  } else if (status === 'canceled') {
                    statusClass = 'status process';
                  }
    return (
      <tr key={item.idColis}>
        <td>{item.idColis}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.clientCitie}</td>
                      <td>{item.clientAdress}</td>
                      <td>{item.price}</td>
                      <td>{item.fragil}</td>
       
        <td >
        <select
                          className={statusClass}
                          value={status}
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            updateColisStatus(item.idColis, newStatus);
                          }}
                          style={{ width: '80px', marginBottom: '-20px', marginRight: '-30px', marginLeft: '30px' }}
                        >
                          <option value="pending">Pending</option>
                          <option value="delivered">Delivered</option>
                          <option value="returned">Returned</option>
                        </select>
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

export default Today_pack;
