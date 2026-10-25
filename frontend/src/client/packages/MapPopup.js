import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup as LeafletPopup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

const MapPopup = ({ isOpenMap, setIsOpenMap, location }) => {
    const { latitude, longitude } = location;
    const [locationName, setLocationName] = useState(null);
  
    useEffect(() => {
      // Replace 'YOUR_API_KEY' with your OpenCage Geocoding API key
      const apiKey = '4f51b67b6e2f4fa0b31503819fdfb427';
  
      // Fetch location name based on latitude and longitude using OpenCage Geocoding API
      const fetchLocationName = async () => {
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
          );
  
          if (response.ok) {
            const data = await response.json();
            if (data.results.length > 0) {
              setLocationName(data.results[0].formatted);
            }
          }
        } catch (error) {
          console.error("Error fetching location name:", error);
        }
      };
  
      fetchLocationName();
    }, [latitude, longitude]);
  
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
          visibility: isOpenMap ? "visible" : "hidden",
          opacity: isOpenMap ? 1 : 0,
          transition: "visibility 0s, opacity 0.5s",
        }}
      >
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "10px",
            backgroundColor: "#fff",
            color: "#000",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setIsOpenMap(false)}
        >
          Close
        </button>
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <LeafletPopup>
              <div>
                <h3>User Location</h3>
            
                {locationName && <p>Location Name: {locationName}</p>}
              </div>
            </LeafletPopup>
          </Marker>
        </MapContainer>
      </div>
    );
  };
  
  export default MapPopup;
  