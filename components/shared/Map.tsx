"use client";
import React, { useEffect, useRef, useMemo } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

interface MapProps {
  location: { lat?: number | undefined; lng?: number | undefined } | undefined;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Map: React.FC<MapProps> = ({ location }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );

  const center = useMemo(
    () => ({
      lat: location?.lat || 0,
      lng: location?.lng || 0,
    }),
    [location]
  );

  useEffect(() => {
    if (mapRef.current) {
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        position: center,
        map: mapRef.current,
      });
    }
  }, [center]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      />
    </LoadScript>
  );
};

export default Map;
