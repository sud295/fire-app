import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh'
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

const markers = [
  { lat: 41.85, lng: -87.65},
  { lat: 45.86, lng: -60.60},
  { lat: 49.84, lng: -69.70}
];


function MapComponent() {
  return (
    <LoadScript googleMapsApiKey="APIK">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
       
      {markers.map(marker => (
        <Marker
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
