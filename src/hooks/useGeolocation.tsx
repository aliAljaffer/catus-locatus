import { LatLngExpression } from "leaflet";
import { useState } from "react";

const defaultPosition: LatLngExpression = {
  lat: 50,
  lng: 25,
};

export function useGeolocation() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<LatLngExpression>(null);
  const [error, setError] = useState<string>("");

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }

  return { isLoading, position, error, getPosition };
}
