import React, { useState, useEffect } from "react";
import Del from "./popupDelPack";
const List_package = () => {
  const [data, setData] = useState([]);
  const [idDelete, setIdDelete] = useState(null);
  const [isOpenDel, setIsOpenDel] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:9006/api/coliss");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleIdClickDelete = (id) => {
    setIdDelete(id);
  };

  const updateColisEtat = async (colisId, newEtat) => {
    const trimmedEtat = newEtat.replace(/"/g, "");

    try {
      const response = await fetch(`http://localhost:9006/api/admin/${colisId}/etat`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trimmedEtat),
      });

      if (response.ok) {
        // Fetch the updated colis list after the status update
        await fetchData();
      } else {
        console.error('Failed to update colis etat');
      }
    } catch (error) {
      console.error('Error updating colis etat:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
    return (
      <section id="content">
        <main>
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Packages list</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>colis Id</th>
                    
                    <th>Company</th>
                    <th>Price</th>
                    <th>nb piece</th>
                    <th>CreatedAt</th>
                    <th>ClientName </th>
                    <th>ClientState </th>
                    <th>Colis Status</th>
                    <th>Colis etat</th>
                    <th>Delete Colis</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    let Class = null;
                    let status = item.status;
                    let etat = item.etat;
                    if (status === "pending") {
                      Class = "status completed";
                    } else if (status === "delivered") {
                      Class = "status pending";
                    } else if (status === "returned") {
                      Class = "status process";
                    } else if (status === "canceled") {
                      Class = "status process";
                    }
                           return(
                    <tr key={item.idColis}>
                      <td>{item.idColis} </td>
                      <td>{item.client ? item.client.company : ''}</td>
                      <td>{item.price}</td>
                      <td>{item.nbPiece}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.clientName}</td>
                      <td><select className={Class} 
           value={etat}
           onChange={e => {
             const newEtat = e.target.value;
             updateColisEtat(item.idColis, newEtat);
           }}
           style={{  width: '80px',marginBottom:'-20px',marginRight:'-30px',marginLeft:'30px'}}
         >
            <option value="not payed">not payed</option>
           <option value="payed">payed</option>
         </select></td>
                      <td>{item.status}</td>
                      <td className={Class}>{item.etat}</td>
                      <td><span className={Class} onClick={() => { setIsOpenDel(true); handleIdClickDelete(item.idColis); }}>Delete</span></td>
                    
                    </tr>) ;
})}
                </tbody>
              </table>
              {isOpenDel && <Del setIsOpenDel={setIsOpenDel} dataId= {idDelete}/>}
            </div>
          </div>
        </main>
      </section>
    );
  };
export default List_package;