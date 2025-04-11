import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 30.65,
  lng: 76.85,
};

const LiveTracking = ({ filterdogwalkers }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API, // 🔑 Using environment variable
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="w-full h-full rounded-lg shadow-lg overflow-hidden">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {filterdogwalkers.map((walker, index) => (
          <Marker
            key={index}
            position={{
              lat: walker.location.ltd,
              lng: walker.location.lng,
            }}
            label={{
              text: (index + 1).toString(),
              color: "white",
            }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/grey-dot.png", // Grey marker icon
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default LiveTracking;
