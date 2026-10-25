import React, { useState, useEffect } from "react";
import './dash.css';
const Pending_pack = () => {
    const [colisList, setColisList] = useState([]);

    useEffect(() => {
      fetchColisForToday();
    }, []);
  
    const fetchColisForToday = () => {
      fetch(`http://localhost:9006/api/colis/pending`)
        .then(response => response.json())
        .then(data => setColisList(data))
        .catch(error => console.error("Error fetching colis for today:", error));
    };
  const updateColisStatus = (colisId, newStatus) => {
        // Remove quotes from the newStatus value
        const trimmedStatus = newStatus.replace(/"/g, "");
      
        fetch(`http://localhost:9006/api/livreur/${colisId}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(trimmedStatus) // Pass the trimmedStatus value without quotes
        })
          .then(response => {
            if (response.ok) {
              // Status updated successfully, you may want to handle the response if needed
              fetchColisForToday(); // Fetch the updated colis list
            } else {
              // Handle the error case, e.g., display an error message
              console.error('Failed to update colis status');
            }
          })
          .catch(error => {
            console.error('Error updating colis status:', error);
          });
      };
    return (
      <section id="content">
        <main>
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>List of pending packs</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Agence</th>
                      <th>Order Date</th>
                      <th>Nb Pickup</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {colisList && colisList.map(item => {
    let Class = null;
    let status = item.status;
    if (status === 'pending') {
        Class = 'status completed';
      } else if (status === 'delivered') {
        Class = 'status pending';
      } else if (status === 'returned') {
        Class = 'status process';
      }else if (status === 'canceled') {
          Class = 'status process';
        }
    return (
      <tr key={item.idColis}>
        <td>{item.idColis}</td>
        <td>{item.clientCitie}</td>
        <td>{item.createdAt}</td>
        <td>{item.nbPiece}</td>
        <td>{item.price}</td>
        <td>
        <td style={{backgroundColor:'#f7f6f5', border:'#f7f6f5',}}>
         <select className={Class} 
           value={status}
           onChange={e => {
             const newStatus = e.target.value;
             updateColisStatus(item.idColis, newStatus);
           }}
           style={{  width: '80px',marginLeft:'40px' }}
         >
            <option value="pending">Pending</option>
           <option value="delivered">Delivered</option>
           <option value="delivered payed">delivered payed</option>
           <option value="returned">Returned</option>
         </select>
       </td>
        </td>
         </tr>
    );
  })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </section>
    );
  };
export default Pending_pack;