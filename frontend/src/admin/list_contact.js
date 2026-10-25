import React, { useState, useEffect } from "react";
import "./dash.css";
import Del from "./popupDelClient";

const List_contact = () => {
  const [data, setData] = useState([]);
  const [idDelete, setIdDelete] = useState(null);
  const [isOpenDel, setIsOpenDel] = useState(false);
  const [emailMessage, setEmailMessage] = useState(""); // To store the email message for sending


  const handleIdClickDelete = (id) => {
    setIdDelete(id);
  };

  const handleSendClick = async (email, message) => {
    try {
      const response = await fetch("http://localhost:9006/api/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          cc: [], // Assuming cc is not needed in the frontend
          subject: "Your Subject Here",
          body: message,
        }),
      });


      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("email sent!!");
      // Handle success, maybe update UI or show a success message
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle error, show an error message
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9006/api/contact/all");
        
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
              <h3>clients list</h3>
              <i className="bx bx-search"></i>
              <i className="bx bx-filter"></i>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Sender Id</th>
                  <th>Sender's Name</th>
                  <th>Sender's Email</th>
                  <th>Sender's msg</th>
                  <th>our respond</th>
                  <th>send</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.message}</td>
                    <td><textarea name="message" placeholder="Enter your message" Value={emailMessage}
                        onChange={(e) => setEmailMessage(e.target.value)}></textarea></td>
                    <td><span className="status pending" onClick={() => handleSendClick(item.email, emailMessage)}>Send</span></td>
                    <td><span className="status pending" onClick={() => { setIsOpenDel(true); handleIdClickDelete(item.clientId); }}>Delete</span></td>
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

export default List_contact;
