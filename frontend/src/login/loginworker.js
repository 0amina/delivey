import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
const Loginworker = () => {
    const [uname, setEmail] = useState('');
    const [pass, setPassword] = useState('');
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
      const response = await fetch(`http://localhost:9006/api/livname/${username}`);
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
  
    const response = await fetch("http://localhost:9006/api/auth/authenticate/liv", {
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
        navigate(`/livreur?email=${email}&token=${token}`);
      } else {
        console.log('Failed to fetch email based on uname');
      }
    } else {
      console.log('Login failed');
      setLoginFailed(true);
    }
  };
    return(
        <>
<form  method="POST" class="register-form" id="login-form">
<div class="form-group">
    <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
    <input type="text" name="email" id="email" placeholder="Your Email" value={uname} onChange={(e)=>setEmail(e.target.value)}/>
</div>
<div class="form-group">
    <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
    <input type="password" name="pass" id="pass" placeholder="Password" value={pass} onChange={(e)=>setPassword(e.target.value)}/>
</div>
<div class="form-group">
    <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
    <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
</div>
<div class="form-group form-button">
    <input type="submit" name="signin" id="signin" class="form-submit" value="Log in" onClick={(e) => handleSubmit(e)}/>
</div>
</form>
<div class="social-login">
                            <span class="social-label">Or login with</span>
                            <ul class="socials">
                                <li><a href="#"><FacebookRoundedIcon>Facebook</FacebookRoundedIcon></a></li>
                                <li><a href="#"><TwitterIcon>Twitter</TwitterIcon></a></li>
                                <li><a href="#"><GoogleIcon>Google</GoogleIcon></a></li>
                            </ul>
                        </div>
</>
    )}
    export default Loginworker;