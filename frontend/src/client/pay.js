import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Pay = () => {
  const [company, setCompany] = useState("");
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [countUnpaidColis, setCountUnpaidColis] = useState(0);
  const [countPaidColis, setCountPaidColis] = useState(0);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = query.get("email");
        console.log("Fetching data for email:", email);

        // Fetch company data (assuming it's a separate API endpoint)
      
        // Fetch total unpaid amount
        const responseUnpaid = await fetch(`http://localhost:9006/api/totaldept?email=${email}`);
        if (!responseUnpaid.ok) {
          throw new Error("Network response was not ok");
        }
        const totalUnpaidData = await responseUnpaid.json();
        console.log("Fetched total unpaid data:", totalUnpaidData);
        setTotalUnpaid(totalUnpaidData);
        const responseColisCounts = await fetch(`http://localhost:9006/api/colis/dashboard-counts?email=${email}`);
        console.log("Response status:", responseColisCounts.status);
  
        if (!responseColisCounts.ok) {
          console.error("Network response was not ok");
        }
  
        const responseText = await responseColisCounts.text();
        console.log("Response text:", responseText);
  
        if (responseText.trim() !== "") {
          const colisCountsData = JSON.parse(responseText);
          console.log("Fetched colis counts:", colisCountsData);
  
          // Access counts using the correct keys
          const countUnpaidColis = colisCountsData.enCoursCount; // Assuming 'enCoursCount' is the count for 'pending'
          const countPaidColis = colisCountsData.livreCount; // Assuming 'livrePayeCount' is the count for 'delivered payed'
  
          console.log("Fetched count of unpaid colis:", countUnpaidColis);
          setCountUnpaidColis(countUnpaidColis);
  
          console.log("Fetched count of paid colis:", countPaidColis);
          setCountPaidColis(countPaidColis);
        } else {
          console.error("Empty response received from the server");
        }
        // Fetch total paid amount
        const responsePaid = await fetch(`http://localhost:9006/api/totalpayed?email=${email}`);
        if (!responsePaid.ok) {
          throw new Error("Network response was not ok");
        }
        const totalPaidData = await responsePaid.json();
        console.log("Fetched total paid data:", totalPaidData);
        setTotalPaid(totalPaidData);
        console.log("Fetching colis counts...");
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [query]);

  return (
    <>
      <section id="content">
        <main>
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Orders</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <h2>Payment</h2>
              <table>
                <thead>
                  <tr>
                    <th>Expidateur</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Number of Colis</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row for total paid */}
                  <tr>
                    <td>ranim haddad</td>
                    <td>{totalPaid}</td>
                    <td>Paid</td>
                    <td>{countPaidColis}</td>
                  </tr>

                  {/* Row for total unpaid */}
                  <tr>
                    <td>ranim haddad</td>
                    <td>{totalUnpaid}</td>
                    <td>Unpaid</td>
                    <td>{countUnpaidColis}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Pay;
