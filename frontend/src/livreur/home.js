import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [userLocation, setUserLocation] = useState(null);
  const location = useLocation();
  const userEmail = new URLSearchParams(location.search).get("email");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          setUserLocation({ latitude, longitude });

          // Send the user's location and email to the Spring Boot backend
          axios
            .put("http://localhost:9006/api/location/update", {
              email: userEmail,
              latitude,
              longitude,
            })
            .then(() => {
              console.log("Location sent to server");
            })
            .catch((error) => {
              console.error(`Error sending location to server: ${error.message}`);
            });
        },
        (error) => {
          console.error(`Error getting location: ${error.message}`);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }, [userEmail]);

  return (
    <div>
     
      <img className="img" src="assets/0.jpg"></img>
    </div>
  );
};

export default Home;
