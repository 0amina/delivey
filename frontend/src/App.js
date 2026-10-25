import React from "react";
import { createBrowserRouter , RouterProvider, Routes, Route } from 'react-router-dom';
import HomePage from "./Homepage/Home_page";
import Contact_us from "./Navpages/contact/contact-us";
import Service1 from "./Homepage/Contenu/Service/service1";
import About from "./Homepage/Contenu/about-us.js/how-it-works";
import Login from "./login/login";
import Signup from "./Sign_up/signupclient"
import Choice from "./Sign_up/choice";
import Signupworker from "./Sign_up/signupworker";
import Client from "./client/client";
import Pricing from "./Navpages/pricing/pricing";
import Sidebar from "./client/sidebar";
import Dashboard from "./client/dashboard";
import { BrowserRouter } from "react-router-dom";
import Client_info from "./client/packages/client_info";
import Colis_info from "./client/packages/colis_info";
import Livreur from "./livreur/livreur";
import Admin from "./admin/admin";
import Profile from "./client/profile";
import Loginadmin from "./login/loginadmin";
import EmailVerif from "./login/verifEmailClient";
import ResetPwd from "./login/resetPwd";
const router = createBrowserRouter([
  {path: "/" , element:<HomePage/>},
  {path: "/contact" , element:<Contact_us/>},
  {path: "/Service" , element:<Service1/>},
  {path: "/login" , element:<Login/>},
  {path: "/loginadmin" , element:<Loginadmin/>},
  {path: "/signup" , element:<Signup/>},
  {path: "/about" , element:<About/>},
  {path: "/choice" , element:<Choice/>},
  {path: "/signupworker" , element:<Signupworker/>},
  {path: "/client" , element:<Client/>},
  {path: "/pricing" , element:<Pricing/>},
  {path: "/sidebar" , element:<Sidebar/>},
  {path: "/dashboard" , element:<Dashboard/>},
  {path: "/client_info" , element:<Client_info/>},
  {path: "/colis_info" , element:<Colis_info/>},
  {path: "/livreur" , element:<Livreur/>},
  {path: "/admin" , element:<Admin/>},
  {path: "/prf" , element:<Profile/>},
  {path: "/emailverif" , element:<EmailVerif/>},
  {path: "/reset-password" , element:<ResetPwd/>},
]);

function App() {

  return (
  
    <RouterProvider router={router}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact_us />} />
        <Route path="/Service" element={<Service1 />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<About />} />
        <Route path="/choice" element={<Choice />} />
        <Route path="/signupworker" element={<Signupworker />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/client" element={<Client />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/client_info" element={<Client_info/>} />
        <Route path="/colis_info" element={<Colis_info/>} />
        <Route path="/prf" element={<Profile/>} />
        <Route path="/emailverif" element={<EmailVerif />} />
        <Route path="/reset-password" element={<ResetPwd />} />
      </Routes>
    </RouterProvider>
  );
}

export default App;



