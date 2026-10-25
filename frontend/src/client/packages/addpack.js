import React, { useState, useEffect } from "react";
import"./client_info.css";
import Added from "./addedpopup";
export default function Addpack() {

  

    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const[status,setStatus]=useState("pending")
    const[clientName,setName]=useState('')
    const[fragil,setfragil]=useState('')
    const[price,setPrice]=useState('')
    const[nbPiece,setPiece]=useState('')
    const[msg,setmsg]=useState('')
    const[weight,setweight]=useState('')
    const[type,settype]=useState('')
    const[exchange,setExchange]=useState('')
    const[clientNumber,setcliNb]=useState('')
    const[clientState,setcliState]=useState('')
    const[clientCitie,setclicity]=useState('')
    const[clientAdress,setadress]=useState('')
    const [email, setEmail] = useState('');
    const[etat,setEtat]=useState('not payed')


    const [isOpenDel, setIsOpenDel] = useState(false);




    const handleClick=(e)=>{
      e.preventDefault()
      const colis={clientName,fragil,price,nbPiece,msg,weight,type,exchange,clientNumber,clientState,clientAdress,clientCitie,status,etat}
         console.log(colis);
    fetch(`http://localhost:9006/api/colis/add?email=${email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(colis)
    })
      .then(() => {
        console.log("colis added");
      });
  };
    useEffect(() => {
      const searchParams = new URLSearchParams(window.location.search);
    const emailParam = searchParams.get('email');
    setEmail(emailParam);
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
    <h2>Add a Package</h2>
    <div className="addclass">
      <div className="infobuttons">
      <div className="colis">
     <div className="elementor-container elementor-column-gap-default">
              <div >
       <section >
            <div >
                <div >
                    <div className="signup-form">
                        <form method="POST"  id="register-form">
                        <input type="hidden" id="status" name="status" value={status} onChange={(e)=>setStatus(e.target.value)}/>
                        <input type="hidden" id="etat" name="etat" value={etat} onChange={(e)=>setEtat(e.target.value)}/>
                            <div className="form-group">
                                <label htmlFor="code"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="Number" name="name" id="code" placeholder="code" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price"></label>
                                <input type="number" name="email" id="price" placeholder="Price" onChange={(e)=>setPrice(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="number"><i className="zmdi zmdi-email"></i></label>
                                <input type="number" name="email" id="nbPiece" placeholder="Number of pieces" onChange={(e)=>setPiece(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <textarea
                           id="msg"
                           name="message"
                           required="required" placeholder="Message"
                           onChange={(e)=>setmsg(e.target.value)}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="weight"><i className="zmdi zmdi-email"></i></label>
                                <input type="number" name="email" id="weight" placeholder="Weight" onChange={(e)=>setweight(e.target.value)}/>
                            </div>
                            
                              <div className="form-group">
                               <select id="type"onChange={(e)=>settype(e.target.value)}>
                               <option value="" disabled selected hidden >Type</option>
                               <option value="food" >food</option>
                               <option value="package">package</option>
                               <option value="furniture">furniture</option>
                               <option value="groceries">groceries</option>
                                </select> 
                               
                            </div>
                            <div className="form-group">
  <label  htmlFor="fragil">fragil</label>
  <div>
    <input type="radio" id="fragil" name="fragil" value="oui" onChange={(e)=>setfragil(e.target.value)} /><a style={{marginTop:"10px",}}>YES</a>
   
    <input type="radio" id="fragil" name="fragil" value="non" onChange={(e)=>setfragil(e.target.value)}/><a>NO</a>
   
  </div>
</div>

<div >
  <label style={{margin:'20px',padding:'20px',marginLeft:'100px',marginTop:"270px"}} htmlFor="exchange">exchange</label>
 
    <input  style={{marginLeft:"176px"}} type="radio" id="exchange" name="exchange" value="oui" onChange={(e)=>setExchange(e.target.value)}/><a style={{marginLeft:"350px",}}>YES</a>
   
    <input style={{marginLeft:"176px"}}type="radio" id="exchange" name="exchange" value="non" onChange={(e)=>setExchange(e.target.value)}/><a style={{marginLeft:"350px",}}>NO</a>

  
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
                                <input type="Text" name="name" id="clientName" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Tel"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="Number" name="name" id="clientNumber" placeholder="Phone Number" onChange={(e)=>setcliNb(e.target.value)}/>
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
            <option key={city.geonameId} value={city.name}> {city.name}  </option>
          ))}
        </select>
      </div>
    </div>
    <div className="form-group">
        <label htmlFor="Adress"><i className="zmdi zmdi-account material-icons-name"></i></label>
        <textarea id="clientAdress" name="message" required="required" placeholder="Address"onChange={(e)=>setadress(e.target.value)} ></textarea>
    </div>
                           
    </form>
    </div>

      </div>
     
      <div style={{marginLeft:"600px",marginTop:"60px",}} className="box">
  <input type="submit" name="signup" id="signup" className="form-submit button" value="Add Package" data-toggle="popup" data-target="#popup1" onClick={(e) => { setIsOpenDel(true); handleClick(e); }}/>
</div>
{isOpenDel && <Added setIsOpenDel={setIsOpenDel} />}
</div>                                                                                                                     
</div>
    </>
  );
}