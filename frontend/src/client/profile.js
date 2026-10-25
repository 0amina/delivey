import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";

const Profile = () => {
  const [user, setuser] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const [confirmationPassword, setconfirmpass] = useState();
  const[currentPassword,setcurr]=useState('')
    const [job, setjob] = useState();
    const [company, setcompany] = useState("");
    const [phone, setphone] = useState("");
    const[email,setemail]=useState()
        const[uname,setname]=useState('')
        const[industry,setind]=useState('')
        const[userId,setId]=useState('')
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const client={job,company,phone,email,uname,industry,userId}
    console.log(client)
    const emaill = query.get('email');
    try {
      const response = await fetch(`http://localhost:9006/api/client/update?email=${emaill}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
      });
      
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  
        
       
        
        const handleSubmitChangePassword = async (e) => {
          e.preventDefault();
          const changePasswordRequest = {
            currentPassword,
            newPassword,
            confirmationPassword
          }
          console.log(changePasswordRequest)
          const token = query.get('token'); 
            
          try {
            const response = await fetch('http://localhost:9006/api/client/change', {
              method: 'PUT',  // Use POST or PUT based on your Spring Boot endpoint
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify(changePasswordRequest),
            });
        
            if (response.ok) {
              // Password changed successfully
              console.log('Password changed successfully');
            } else {
              // Handle error
              console.error('Error 1 changing password:', response.status, response.statusText);
            }
          } catch (error) {
            console.error('Error 2 changing password:', error);
          }
        };

  useEffect(() => {
	
    

    const fetchData = async () => {
      try {
        const email = query.get('email');
        const response = await fetch(`http://localhost:9006/api/client?email=${email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setuser(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
    
  }, [user]);

  

    return(

        <div >
            <Helmet>
  <link href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet"/>
  <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
  <link href="vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet"/>
  <link href="vendor/boxicons/css/boxicons.min.css" rel="stylesheet"/>
  <link href="vendor/quill/quill.snow.css" rel="stylesheet"/>
  <link href="vendor/quill/quill.bubble.css" rel="stylesheet"/>
  <link href="vendor/remixicon/remixicon.css" rel="stylesheet"/>
  <link href="vendor/simple-datatables/style.css" rel="stylesheet"/>
  <link href="css/style.css" rel="stylesheet"/>
  </Helmet>
        <main id="main" className="main">
<div className="pagetitle">
  <h1>Profile</h1>
</div>

<section className="section profile">
  <div className="row">
    <div className="col-xl-4">

      <div className="card">
        <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

        <img src="assets/profile.png" alt="profileImg" className="rounded-circle"/>
          <h2>{user.uname}</h2>
          <h3>{user.job}</h3>
          
        </div>
      </div>

    </div>

    <div className="col-xl-8">

      <div className="card">
        <div className="card-body pt-3">
          
          
          
          <ul className="nav nav-tabs nav-tabs-bordered">

            <li className="nav-item">
              <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
            </li>

            <li className="nav-item">
              <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
            </li>

            <li className="nav-item">
              <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
            </li>

          </ul>
          

          <div className="tab-content pt-2">
            
            
            <div className="tab-pane fade show active profile-overview" id="profile-overview">
              
              <h5 className="card-title">Profile Details</h5>

              <div className="row">
                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                <div className="col-lg-9 col-md-8">{user.uname}</div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Company</div>
                <div className="col-lg-9 col-md-8">{user.company}</div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Job</div>
                <div className="col-lg-9 col-md-8">{user.job}</div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Industry</div>
                <div className="col-lg-9 col-md-8">{user.industry}</div>
              </div>


              <div className="row">
                <div className="col-lg-3 col-md-4 label">Phone</div>
                <div className="col-lg-9 col-md-8">{user.phone}</div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Email</div>
                <div className="col-lg-9 col-md-8">{user.email}</div>
              </div>

            </div>
           
           
            <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
              
              <form>
                

                <div className="row mb-3">
                  <label for="fullName" className="col-md-4 col-lg-3 col-form-label"></label>
                  <div className="col-md-8 col-lg-9">
                    <input name="fullName" type="text" className="form-control" id="fullName" Value={user.uname} onChange={(e)=>setname(e.target.value)}/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="company" className="col-md-4 col-lg-3 col-form-label"></label>
                  <div className="col-md-8 col-lg-9">
                    <input name="company" type="text" className="form-control" id="company" Value={user.company} onChange={(e)=>setcompany(e.target.value)}/>
                  </div>
                </div>
                <input type="hidden" id="status" name="status" Value={user.userId} onChange={(e)=>setId(e.target.value)}/>
                <div className="row mb-3">
                  <label for="Job" className="col-md-4 col-lg-3 col-form-label"></label>
                  <div className="col-md-8 col-lg-9">
                    <input name="job" type="text" className="form-control" id="Job" Value={user.job} onChange={(e)=>setjob(e.target.value)}/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="Country" className="col-md-4 col-lg-3 col-form-label"></label>
                  <div className="col-md-8 col-lg-9">
                    <input name="country" type="text" className="form-control" id="Country" Value={user.industry} onChange={(e)=>setind(e.target.value)}/>
                  </div>
                </div>

               

                <div className="row mb-3">
                  <label for="Phone" className="col-md-4 col-lg-3 col-form-label"></label>
                  <div className="col-md-8 col-lg-9">
                    <input name="phone" type="number" className="form-control" id="Phone" Value={user.phone} onChange={(e)=>setphone(e.target.value)}/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="Email" className="col-md-4 col-lg-3 col-form-label"></label>
                  <div className="col-md-8 col-lg-9">
                    <input name="email" type="email" className="form-control" id="Email" Value={user.email} onChange={(e)=>setemail(e.target.value)}/>
                  </div>
                </div>

               

                <div className="text-center">
                  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
                </div>
              </form>
              
            </div>


            <div className="tab-pane fade pt-3" id="profile-change-password">
              
              <form>

                <div className="row mb-3">
                  <label for="currentPassword" className="col-md-4 col-lg-3 col-form-label"></label>
                  <div className="col-md-8 col-lg-9">
                    <input name="password" type="password" className="form-control" id="currentPassword" placeholder="Current Password"
                    onChange={(e)=>setcurr(e.target.value)}/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="newPassword" className="col-md-4 col-lg-3 col-form-label"></label>
                  <div className="col-md-8 col-lg-9">
                  <input
                name="newpassword"
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="New Password"
                onChange={(e)=>setNewPassword(e.target.value)}
              /> </div>
                </div>

                <div className="row mb-3">
                  <label for="renewPassword" className="col-md-4 col-lg-3 col-form-label"></label>
                  <div className="col-md-8 col-lg-9">
                    <input name="renewpassword" type="password" className="form-control" id="renewPassword" placeholder="Re-enter New Password"  onChange={(e)=>setconfirmpass(e.target.value)}/>
                  </div>
                </div>

                <div className="text-center">
                <button type="submit" className="btn btn-primary" onClick={handleSubmitChangePassword}>Change Password</button>
                </div>
              </form>
              
            </div>

          </div>
          
          

        </div>
      </div>
    </div>
    
  </div>
</section>

</main>

        </div>
    )
}
export default Profile;