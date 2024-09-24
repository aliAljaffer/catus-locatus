import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useUrlPosition } from "@/hooks/useUrlPosition";
import { useGeolocation } from "@/hooks/useGeolocation";
import { LatLngExpression } from "leaflet";
import {
  useChangeSelected,
  useIsCardShown,
  useSelectedId,
  useShowCard,
} from "@/store";
import { TPet } from "../pets/Pet";
import { useNavigate } from "react-router-dom";
import MarkerPainter from "./MarkerPainter";

// const riyadh: LatLngExpression = [24.732715, 46.676868];
export default function Map() {
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([
    24.732715, 46.676868,
  ]);
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
      if (mapLat && mapLng) setMapPosition({ lat: mapLat, lng: mapLng });
    },
    [mapLat, mapLng],
  );
  function handleMapClick(pet: TPet) {
    setMapPosition([pet.position.latitude, pet.position.longitude]);
    navigate(`?lat=${pet.position.latitude}&lng=${pet.position.longitude}`);
    if (pet.caseId !== selectedId) {
      changeSelected(pet.caseId);
      if (!isCardShown) {
        showCard(!isCardShown);
      }
    }
  }

  return (
    <div className="relative flex h-full w-full">
      <MapContainer
        center={mapPosition}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerPainter handleMapClick={handleMapClick} />
      </MapContainer>
    </div>
  );
}
