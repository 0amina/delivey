import React from "react";
import '../client.css';
const Colis_info = () => {
    return(
        <>
         <div className="elementor-container elementor-column-gap-default">
              <div >
       <section >
            <div >
                <div >
                    <div className="signup-form">
                        <h2 className="form-title"></h2>
                        <form method="POST"  id="register-form">
                            <div className="form-group">
                                <label htmlFor="code"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="Number" name="name" id="name" placeholder="code"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price"><i className="zmdi zmdi-email"></i></label>
                                <input type="number" name="email" id="email" placeholder="Price"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="number"><i className="zmdi zmdi-email"></i></label>
                                <input type="number" name="email" id="email" placeholder="Number of pieces"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <textarea
                           id="form-field-message"
                           name="message"
                           required="required" placeholder="Message"
                         ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="weight"><i className="zmdi zmdi-email"></i></label>
                                <input type="number" name="email" id="email" placeholder="Weight"/>
                            </div>
                            <div className="form-group">
                               <select>
                               <option value="" disabled selected hidden>Type</option>
                               <option value="volvo">ggg</option>
                               <option value="saab">ggg</option>
                               <option value="mercedes">ggg</option>
                                </select> 
                               
                            </div>
                            <div className="form-group">
  <label htmlFor="fragil">fragil</label>
  <div>
    <input type="radio" id="fragil-oui" name="fragil" value="oui" />
    <label htmlFor="fragil-oui">Oui</label>
    <input type="radio" id="fragil-non" name="fragil" value="non" />
    <label htmlFor="fragil-non">Non</label>
  </div>
</div>

<div className="form-group">
  <label htmlFor="exchange">exchange</label>
  <div>
    <input type="radio" id="exchange-oui" name="exchange" value="oui" />
    <label htmlFor="exchange-oui">Oui</label>
    <input type="radio" id="exchange-non" name="exchange" value="non" />
    <label htmlFor="exchange-non">Non</label>
  </div>
</div>


                          
                        </form>
                    </div>    
                          

                    <div className="signup-image">
                        <div>
                       
          
                       

                       </div><br></br>
                        
                    </div>
                </div>
            </div>
        </section>
       </div>
       </div>
        </>
    )
}
export default Colis_info;
