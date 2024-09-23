import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
// import { useUrlPosition } from "../../hooks/useUrlPosition";
import { useGeolocation } from "../../hooks/useGeolocation";
import { LatLngExpression } from "leaflet";
import { useNavigate } from "react-router-dom";
export default function Map() {
  // Context to load pets

  const [mapPosition, setMapPosition] = useState<LatLngExpression>([
    24.732715, 46.676868,
  ]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  //   const [mapLat, mapLng] = useUrlPosition();
  //   const [mapLat, mapLng] = [1, 2];
  //   if (mapLat && mapLng) setMapPosition([Number(mapLat), Number(mapLng)]);
  return (
    <div className="relative flex h-full w-full">
      {1 && (
        <button
          className="absolute right-[50%] top-0 z-[99999] mt-2 translate-x-[50%] border-2 border-red-500 px-4 py-0.5"
          onClick={getPosition}
        >
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

type ChangeCenterProps = {
  position: LatLngExpression;
};

function ChangeCenter({ position }: ChangeCenterProps) {
  const map = useMap();
  if ("lat" in position && "lng" in position)
    map.setView([position.lat, position.lng], map.getZoom());
  return null;
}
function DetectClick() {
  //   const navigate = useNavigate();

  useMapEvents({
    click: (e) => console.log(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
