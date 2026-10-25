import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate ,Link} from 'react-router-dom';
const Loginclient = () => {
  const [uname, setEmail] = useState('');
  const [pass, setpass] = useState('');
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);

  // Extract the email from the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const extractedEmail = urlParams.get('email');
    if (extractedEmail) {
      setEmail(extractedEmail);
    }
  }, []);

  const getUsernameData = async (username) => {
    try {
      const response = await fetch(`http://localhost:9006/api/username/${username}`);
      if (response.ok) {
        const data = await response.json();
        return data.email;
      } else {
        console.error('Error fetching username data');
        return null;
      }
    } catch (error) {
      console.error('Error fetching username data:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const response = await fetch("http://localhost:9006/api/auth/authenticate/cli", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uname, pass })
    });

    if (response.ok) {
      const { token } = await response.json();
      
      // Store the token
      localStorage.setItem('authToken', token);

      // Fetch email based on uname and update the URL
      const email = await getUsernameData(uname);

      if (email) {
        // Store the client data
        localStorage.setItem('client', JSON.stringify({ email }));

        // Add the email parameter to the URL before navigating
        navigate(`/client?email=${email}&token=${token}`);
      } else {
        console.log('Failed to fetch email based on uname');
      }
    } else {
      console.log('Login failed');
      setLoginFailed(true);
    }
  };

    return (
      <>
        <form method="POST" class="register-form" id="login-form" >
          <div class="form-group">
            <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
            <input type="text" name="email" id="email" placeholder="User Name" value={uname.startsWith('client') ? uname : `client${uname}`} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div class="form-group">
            <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
            <input type="password" name="pass" id="pass" placeholder="password" value={pass} onChange={(e)=>setpass(e.target.value)} />
          </div>
          <div class="form-group">
            <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
            <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
          </div>
          <div class="form-group">
              <Link className = "reset-link" to="/emailverif">
                        <a  className="signup-image-link">Password forgotten?</a>
              </Link>
          </div>
          <div class="form-group form-button">
          <input type="submit" name="signin" id="signin" class="form-submit" value="Log in" onClick={(e) => handleSubmit(e)} />


          </div>
        </form>
        {loginFailed && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
            zIndex: 1, // Place it on top of other elements
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            <p>Login failed. Please check your email and password.</p>
            <button onClick={() => setLoginFailed(false)}>Close</button>
          </div>
        </div>
      )}
      </>
    );
  };
  
  export default Loginclient;
  