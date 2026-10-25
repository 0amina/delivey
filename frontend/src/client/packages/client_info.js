import React, { useState, useEffect } from "react";
import './client_info.css'
const Client_info = () => {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    // Fetch the list of cities in Tunisia from Geonames API
    fetch(
      "http://api.geonames.org/searchJSON?q=tunisia&maxRows=1000&username=haddadamamouranim&featureClass=P"
    )
      .then((response) => response.json())
      .then((data) => {
        // Extract the list of cities from the data
        const cities = data.geonames;
        const stateNames = [...new Set(data.geonames.map(city => city.adminName1))]; // Extract the list of state names from the data
        // Update the state with the list of cities and states
        setCities(cities);
        setStates(stateNames);
      })
      .catch((error) => console.error(error));
  }, []);

  // Handle the change event of the state select
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity("");
  };

  // Handle the change event of the city select
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  // Filter the list of cities based on the selected state
  const filteredCities = cities.filter(
    (city) => city.adminName1 === selectedState
  );

  return (
    <div className="infobuttons">
    <div className="signup-form">
                        <h2 className="form-title"></h2>
                        <form method="POST"  id="register-form">
                            <div className="form-group">
                                <label htmlFor="Nom"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="Text" name="name" id="name" placeholder="Name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Tel"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="Number" name="name" id="name" placeholder="Phone Number"/>
                            </div>             
    <div> 
      <label htmlFor="state-select"></label>
      <select id="state-select" onChange={handleStateChange} style={{ marginBottom: '30px' }}>
        <option value="">-- Select a state --</option>
        {states.map((state) => (
          <option key={state} value={state}> {state} </option>
        ))}
      </select>

      <div>
        <label htmlFor="city-select"></label>
        <select id="city-select" onChange={handleCityChange} style={{ marginBottom: '30px' }}  value={selectedCity} >
          <option value="">-- Select a city --</option>
          {filteredCities.map((city) => (
            <option key={city.geonameId} value={city.name}> {city.name}  </option>
          ))}
        </select>
      </div>
    </div>
    <div className="form-group">
        <label htmlFor="Adress"><i className="zmdi zmdi-account material-icons-name"></i></label>
        <textarea id="form-field-message" name="message" required="required" placeholder="Address" ></textarea>
    </div>
                           
    </form>
    </div>
    </div>
  );
};

export default Client_info;
