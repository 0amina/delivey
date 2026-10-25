import React, { useState, useEffect } from "react";
import "../dash.css";
import Popup from "./AddPopup";
import Del from "./DelPopup";
import Edit from "./EditPopup";
import PrintIcon from "@mui/icons-material/Print";
import { generatePdf } from "../generatePdf";
import { useLocation } from "react-router-dom";

const Managepack = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isOpenDel, setIsOpenDel] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [data, setData] = useState([]);
  const [idEdit, setIdEdit] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const [idDelete, setIdDelete] = useState(null);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const handleIdClickEdit = (id) => {
    setIdEdit(id);
  };

  const handleIdClickDelete = (id) => {
    setIdDelete(id);
    setIdEdit(null);
  };

  useEffect(() => {
    if (idEdit) {
      fetch(`http://localhost:9006/api/find/${idEdit}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setDataEdit(data);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
    const fetchData = async () => {
      try {
        const query = new URLSearchParams(location.search);
        const email = query.get("email");
        let apiUrl = `http://localhost:9006/api/colissbyemail?email=${email}`;
  
        const response = await fetch(apiUrl);
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
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
  
    fetchData();
  }, [location.search, searchQuery, data]);
  
  
  
  const handleSearchInputChange = (event) => {
    console.log("Search input changed:", event.target.value);
    setSearchQuery(event.target.value);
  };
  
  const handlePrint = async (idColis) => {
    try {
      const response = await fetch(`http://localhost:9006/api/find/${idColis}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const rowData = await response.json();
console.log('Received data:', rowData);
generatePdf(rowData);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchIconClick = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

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
              <i className="bx bx-plus" onClick={() => setIsOpenPopup(true)}></i>
              {isOpenPopup && <Popup setIsOpenPopup={setIsOpenPopup} />}
              <i className="bx bx-search" onClick={handleSearchIconClick}></i>
              <i className="bx bx-filter"></i>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Order Date</th>
                  <th>Client Name</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>cancel</th>
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
                   const editButton = status === "delivered" ? (
                    <span className="status pending" style={{ pointerEvents: 'none', opacity: 0.5 }}>
                      Edit
                    </span>
                  ) : (
                    <span
                      className="status pending"
                      onClick={() => {
                        setIsOpenEdit(true);
                        handleIdClickEdit(item.idColis);
                      }}
                    >
                      Edit
                    </span>
                  );

                  return (
                    <tr key={item.idColis}>
                      <td>{item.idColis}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.clientName}</td>
                      <td>{item.price} dt</td>
                      <td>{item.etat}</td>
                      <td><span className={Class}>{item.status}</span></td>
                      <td>{editButton}</td>
                      <td>
                        <span
                          className="status pending"
                          onClick={() => {
                            setIsOpenDel(true);
                            handleIdClickDelete(item.idColis);
                          }}
                        >
                          Delete
                        </span>
                      </td>
                      <td>
                        <PrintIcon
                          onClick={() => handlePrint(item.idColis)}
                          style={{ fontSize: "17px" }}
                        >
                          print
                        </PrintIcon>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {isOpenEdit && <Edit setIsOpenEdit={setIsOpenEdit} dataId={dataEdit} />}
            {isOpenDel && <Del setIsOpenDel={setIsOpenDel} dataId={idDelete} />}
          </div>
        </div>
      </main>
    </section>
  );
};

export default Managepack;