import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Polyline, Polygon, Marker, Popup, CircleMarker } from "react-leaflet";
import { LatLngExpression, Map } from "leaflet";

import pts from "../components/tsjs";

import "leaflet/dist/leaflet.css";

const MapWrapper: React.FC = () => {
  const mapRef = useRef<Map | null>(null);


  // const dispersePoints = pts.jobData.data.dispersalPoints.map(point => [point.lat, point.lng]) as LatLngExpression[];
  const dots = pts.jobData.data.dispersalPoints.map((point, index) => ({
    position: [point.lat, point.lng] as LatLngExpression,
    heading: point.heading,
    timestamp: point.timestamp,
    id: index, // Use index as a unique key
  }));
  
  
  
  const latLongPoints = pts.routePath.map(point => [point.lat, point.lng]) as LatLngExpression[];
  


  const teleport = () => {
    if (mapRef.current) {
        const randomLat = Math.random() * 180 - 90;
        const randomLong = Math.random() * 360 - 180;
    

      mapRef.current.setView([randomLat, randomLong], 10);
    }
  };

  return (
    <MapContainer
    //   center={[36.94009, -121.75291]} // Pass a tuple: [latitude, longitude]
      center={[36.95777276453784, -121.7275803759955]}
      zoom={18}
      maxZoom={24}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
      ref={(ref) => {
        mapRef.current = ref;
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
     
      {dots.map(dot => (
        <CircleMarker
          key={dot.id}
          center={dot.position}
          radius={.01} // Size of the dot
          pathOptions={{ color: "red", fillColor: "blue", fillOpacity: 0.8 }}
        >
          {/* Optional popup for additional info */}
          
        </CircleMarker>
      ))}
       <Polyline pathOptions={{ color: "blue", weight: 5 }} positions={latLongPoints} />
      <Marker position={[36.92926, -121.79076]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {/* <button style={{position: "absolute", zIndex: "1000", right: "0", bottom:"0", height: "200px", backgroundColor: "seagreen", width: "200px"}} onClick={teleport}>Teleport</button> */}
    </MapContainer>
  );
};

export default MapWrapper;
