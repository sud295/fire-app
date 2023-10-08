import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { googleMapsApiKey } from './config';

const containerStyle = {
  width: '96vw',
  height: '100vh', 
  position: 'absolute',
  right: '0',
};

const center = {
  lat: 41.85,
  lng: -87.65
};

const fireStyle = {
  cursor: 'pointer',
  color: 'red',
  fontSize: '30px',
  fontWeight: 'bold',
};

function MapComponent() {
  const [markersData, setMarkersData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/', {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const parsedData = data.map((item) => ({
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude)
        }));
        setMarkersData(parsedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {markersData.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
