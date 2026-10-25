import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import  "./dash.css";
const Return = () => {
    const [data, setData] = useState([]);
 

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  useEffect(() => {
	
  

    const fetchData = async () => {
      
      try {
        const email = query.get('email');
        const response = await fetch(`http://localhost:9006/api/client/colis/returned?email=${email}`);
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
    
  }, [data]);
    return(
        <section id="content">
    <main>
    
       <div className="table-data">
       <div className="order">
					<div className="head">
						<h3>Recent Orders</h3>
          
						<i className='bx bx-search' ></i>
						<i className='bx bx-filter' ></i>
					</div>
        <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Agence source</th>
          <th>Expidateur</th>
          <th>Date</th>
          <th>NB colis</th>
          <th>total</th>
          <th>Etat</th>
          
         
        </tr>
      </thead>
      <tbody>
       
      {data && data.map(item => {
 
  return (
    <tr key={item.idColis}>
      <td>{item.idColis}</td>
      <td>{item.clientCitie}</td>
      <td>{item.client.company}</td>
      <td>{item.createdAt}</td>
      <td>{item.nbPiece}</td>
      <td>0.00</td>
      <td><span className="status pending">{item.etat}</span></td>
    </tr>
  );
})}
      
      </tbody>
    </table>
      </div>
      </div>
      </main>
      </section>
    )
}
export default Return;