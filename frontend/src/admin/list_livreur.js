import React, { useState, useEffect } from "react";
import "./dash.css";
import Del from "./popupDelLivreur";
const List_livreur = () => {
    const [data, setData] = useState([]);
    const [idDelete, setIdDelete] = useState(null);
  const [isOpenDel, setIsOpenDel] = useState(false);
  

  const handleIdClickDelete = (id) => {
    setIdDelete(id);
  };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:9006/api/livreurs");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [data]);
  
    return (
      <section id="content">
        <main>
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Employees list</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Employee Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>Phone</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                      <tr key={item.userId}>
                      <td>{item.userId}</td>
                      <td>{item.uname}</td>
                      <td>{item.email}</td>
                      <td>{item.position}</td>
                      <td>{item.phone}</td>
                      <td>
                      <span className="status pending" onClick={() => { setIsOpenDel(true); handleIdClickDelete(item.livId); }}>Delete</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isOpenDel && <Del setIsOpenDel={setIsOpenDel} dataId= {idDelete}/>}
            </div>
          </div>
        </main>
      </section>
    );
  };
export default List_livreur;