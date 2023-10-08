import React from "react";
import GoogleMapReact from 'google-map-react';

export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: 41.7879,
      lng: -87.5996
    },
    zoom: 15
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
      </GoogleMapReact>
    </div>
  );
}