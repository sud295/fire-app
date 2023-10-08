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
const markers = [
  { id: 1, lat: 41.85, lng: -87.65, label: "Marker 1" },
  { id: 2, lat: 41.86, lng: -87.60, label: "Marker 2" },
  { id: 3, lat: 41.84, lng: -87.70, label: "Marker 3" }
];
const redCircleSVG = `
  <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="5" r="5" fill="red" stroke="red" stroke-width="1" />
  </svg>
`;

const redCircleURL = `data:image/svg+xml,${encodeURIComponent(redCircleSVG)}`;

function MapComponent() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBXzXpZUndUB8rjRqYBHwCUYiaKJQp6obg">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
      {markers.map(marker => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          label={marker.label}
          icon={redCircleURL}
        />
      ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
