import React, { useState, useEffect } from "react";
import"./client_info.css";
export default function Updatepack(props) {
  const { setIsOpenEdit, dataId  } = props;
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const[status,setStatus]=useState("pending");
    const[clientName,setName]=useState();
    const[fragil,setfragil]=useState();
    const[price,setPrice]=useState();
    const[nbPiece,setPiece]=useState();
    const[msg,setmsg]=useState();
    const[weight,setweight]=useState();
    const[type,settype]=useState();
    const[exchange,setExchange]=useState();
    const[clientNumber,setcliNb]=useState();
    const[clientState,setcliState]=useState();
    const[clientCitie,setclicity]=useState();
    const[clientAdress,setadress]=useState();

                   const handleSubmit = async (e) => {
                    e.preventDefault();
                    const colis={clientName,fragil,price,nbPiece,msg,weight,type,exchange,clientNumber,clientState,clientAdress,clientCitie,status}
                    console.log(colis)
                    console.log(dataId)

                    try {
                      const response = await fetch(`http://localhost:9006/api/update/${dataId.idColis}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(colis)
                      });
                      if (response.ok) {
                        setIsOpenEdit(false);
                      }
                    } catch (error) {
                      console.error('Error updating data:', error);
                    }
                  }
       
        
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
    <>
    <h2>Update a Package</h2>
    <div className="addclass">
      <div className="infobuttons">
      <div className="colis">
     <div className="elementor-container elementor-column-gap-default">
              <div >
       <section >
            <div >
                <div >
                    <div className="signup-form">

                        <form method="POST"  id="register-form" >
                          <input type="hidden" id="status" name="status" value={status} onChange={(e)=>setStatus(e.target.value)}/>
                            <div className="form-group">
                                <label htmlFor="code"><i className="zmdi zmdi-account material-icons-name"></i></label>
                               Code: <input type="Number"  id="code"  value={dataId.idColis} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price"><i className="zmdi zmdi-email"></i></label>
                                <input type="number"  id="price" placeholder="Price" Value={dataId.price} onChange={(e)=>setPrice(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="number"><i className="zmdi zmdi-email"></i></label>
                                <input type="number"  id="nbPiece" placeholder="Nb Pickup" Value={dataId.nbPiece} onChange={(e)=>setPiece(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <textarea
                                id="msg"
                                name="message"
                                required="required" Value={dataId.msg} placeholder="message"
                                onChange={(e)=>setmsg(e.target.value)}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="weight"><i className="zmdi zmdi-email"></i></label>
                                <input type="number" name="weight" id="weight" placeholder="Weight" Value={dataId.weight} onChange={(e)=>setweight(e.target.value)}/>
                            </div>
                            <div className="form-group">
                            <select id="type" onChange={(e) => settype(e.target.value)} defaultValue={dataId.type}>
  <option value="" disabled hidden>Type</option>
  <option value="volvo">volvo</option>
  <option value="saab">saab</option>
  <option value="mercedes">mercedes</option>
</select>

                               
                            </div>
                            <div className="form-group">
  <label htmlFor="fragil">fragil</label>
  <div>
    <input type="radio" id="fragil" name="fragil" Value="oui" onChange={(e)=>setfragil(e.target.value)} />
    <label htmlFor="fragil-oui">Oui</label>
    <input type="radio" id="fragil" name="fragil" Value="non" onChange={(e)=>setfragil(e.target.value)}/>
    <label htmlFor="fragil-non">Non</label>
  </div>
</div>

<div className="form-group">
  <label htmlFor="exchange">exchange</label>
  <div>
    <input type="radio" id="exchange" name="exchange" Value="oui" onChange={(e)=>setExchange(e.target.value)}/>
    <label htmlFor="exchange-oui">Oui</label>
    <input type="radio" id="exchange" name="exchange" Value="non" onChange={(e)=>setExchange(e.target.value)}/>
    <label htmlFor="exchange-non">Non</label>
  </div>
</div>


                          
                        </form>

                    </div>    
                          
                </div>
            </div>
        </section>
       </div>
       </div>
     </div>
      <div className="client">
      <div className="signup-form">
                        
                        <form method="POST"  id="register-form">
                            <div className="form-group">
                                <label htmlFor="Nom"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="Text" name="name" id="clientName" placeholder="Client name" value={dataId.clientName} onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Tel"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="Number" name="name" id="clientNumber"placeholder="client number" Value={dataId.clientNumber} onChange={(e)=>setcliNb(e.target.value)}/>
                            </div>             
    <div> 
      <label htmlFor="state-select"></label>
      <select id="clientState" onChange={(event) => {handleStateChange(event);setcliState(event.target.value);}} style={{ marginBottom: '30px' }}>
        <option value="">-- Select a state --</option>
        {states.map((state) => (
          <option key={state} value={state}> {state} </option>
        ))}
      </select>

      <div>
        <label htmlFor="city-select"></label>
        <select id="clientCitie" onChange={(event) => {handleCityChange(event);setclicity(event.target.value);}} style={{ marginBottom: '30px' }}  value={selectedCity} >
          <option value="">-- Select a city --</option>
          {filteredCities.map((city) => (
            <option key={city.geonameId} Value={city.name}> {city.name}  </option>
          ))}
        </select>
      </div>
    </div>
    <div className="form-group">
        <label htmlFor="Adress"><i className="zmdi zmdi-account material-icons-name"></i></label>
        <textarea id="clientAdress" name="clientAdress" required="required" placeholder="client address"Value={dataId.clientAdress}onChange={(e)=>setadress(e.target.value)} ></textarea>
    </div>
                           
    </form>
    </div>

      </div>
     
         <div >
         <input type="submit" name="signup" id="signup" className="form-submit" value="Update Package"  onClick={handleSubmit} />
         </div>
      </div>
      </div>
    </>
  );
}


