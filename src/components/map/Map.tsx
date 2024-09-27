import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { useUrlPosition } from "@/hooks/useUrlPosition";
import { useGeolocation } from "@/hooks/useGeolocation";
import { LatLngExpression, Map as LeafletMap } from "leaflet";
import {
  useChangeSelected,
  useIsCardShown,
  useSelectedId,
  useShowCard,
} from "@/store";
import { TPet } from "../pets/Pet";
import { useNavigate } from "react-router-dom";
import MarkerPainter from "./MarkerPainter";
import { APP_ROUTE, DEFAULT_POINT } from "@/utils/helpers";

// Test with w-screen/h-screen changes. if not working,
// try with the useEffect

export default function Map() {
  const mapRef = useRef<LeafletMap | null>(null);
  const [mapPosition, setMapPosition] =
    useState<LatLngExpression>(DEFAULT_POINT);
  const selectedId = useSelectedId();
  const isCardShown = useIsCardShown();
  const showCard = useShowCard();
  const { position: geolocationPosition } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();
  const navigate = useNavigate();
  const changeSelected = useChangeSelected();
  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition(geolocationPosition);
    }
  }, [geolocationPosition]);

  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition({ lat: mapLat, lng: mapLng });
      }
    },
    [mapLat, mapLng],
  );
  function handleMapClick(pet: TPet) {
    // This is happening
    setMapPosition([pet.position__latitude, pet.position__longitude]);
    navigate(
      `${APP_ROUTE}?lat=${pet.position__latitude}&lng=${pet.position__longitude}`,
    );

    if (pet.caseId !== selectedId) {
      changeSelected(pet.caseId);
      if (!isCardShown) {
        showCard(!isCardShown);
      }
    }
  }
  // try this
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (mapRef.current) {
  //       mapRef.current.invalidateSize();
  //     }
  //   }, 0);
  //   return () => clearTimeout(timeoutId);
  // });
  return (
    // Chnaged here
    <div className="relative flex h-screen w-screen">
      <MapContainer
        ref={mapRef}
        center={mapPosition}
        zoom={14}
        scrollWheelZoom={true}
        className="h-full w-full"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          keepBuffer={4}
        />
        <MarkerPainter handleMapClick={handleMapClick} />
        <SetViewOnClick coords={mapPosition} />
      </MapContainer>
    </div>
  );
}
type X = {
  coords: LatLngExpression;
};
function SetViewOnClick({ coords }: X) {
  const map = useMap();
  useEffect(() => {
    if (map.getCenter() === coords) return;
    map.setView(coords, map.getZoom());
  }, [coords, map]);
  return null;
}
