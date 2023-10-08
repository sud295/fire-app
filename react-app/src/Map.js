import React from 'react';
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

const markers = [
  { lat: 41.85, lng: -87.65},
  { lat: 45.86, lng: -60.60},
  { lat: 49.84, lng: -69.70}
];


function MapComponent() {
  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
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
