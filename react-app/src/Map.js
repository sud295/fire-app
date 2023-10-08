import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { googleMapsApiKey } from './config';
import ReactLoading from "react-loading";

const containerStyle = {
  width: '96vw',
  height: '100vh',
  position: 'absolute',
  right: '0',
};

const center = {
  lat: 41.85,
  lng: -87.65,
};

function MapComponent() {
  const [markersData, setMarkersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const parsedData = data.map((item) => ({
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
        }));
        setMarkersData(parsedData);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); 
      });
  }, []);

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      {loading ? (
        <ReactLoading type="spin" color="#FFFFFF" height={100} width={50} />
      ) : (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {markersData.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.latitude, lng: marker.longitude }}
           />
          ))} 
        </GoogleMap>
      )}
    </LoadScript>
  );
}

export default MapComponent;
