import React, { useState, useEffect } from "react";
import './dash.css';
const Canceled_pack = () => {
    const [colisList, setColisList] = useState([]);

    useEffect(() => {
      fetchColisForToday();
    }, []);
  
    const fetchColisForToday = () => {
      fetch(`http://localhost:9006/api/colis/returned`)
        .then(response => response.json())
        .then(data => setColisList(data))
        .catch(error => console.error("Error fetching colis for today:", error));
    };
  
    return (
      <section id="content">
        <main>
          <div className="table-data">
            <div className="order">
              <div className="head">
           
                <h3>List of canceled packs</h3>
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
        <td><span className={Class}>{item.status}</span></td>
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
export default Canceled_pack;