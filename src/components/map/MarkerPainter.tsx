import { useState } from "react";
import { TPet } from "../pets/Pet";
import { Marker, useMapEvents } from "react-leaflet";
import { icon } from "leaflet";
import useFetchAllPets from "@/hooks/useFetchAllPets";
type MarkerPainterProps = {
  handleMapClick: (p: TPet) => void;
};

export default function MarkerPainter({ handleMapClick }: MarkerPainterProps) {
  const [inViewPets, setInViewPets] = useState<TPet[]>([]);

  const map = useMapEvents({
    moveend: loadInView,
  });

  const { data } = useFetchAllPets();

  function loadInView() {
    let inView: TPet[] = [];
    if (data && map) {
      inView = data.filter((pet) =>
        map
          .getBounds()
          .contains([pet.position__latitude, pet.position__longitude]),
      );
    }
    console.log("pets in view", inView.length);
    setInViewPets(inView);
  }

  return (
    <>
      {inViewPets.map((pet) => {
        const markerIcon = icon({
          iconUrl: `/${pet.petType}.png`,
          iconSize: [40, 40],
          iconAnchor: [0, 15],
        });
        return (
          <Marker
            icon={markerIcon}
            key={pet.caseId}
            position={[pet.position__latitude, pet.position__longitude]}
            title={pet.name}
            eventHandlers={{
              click: () => {
                handleMapClick(pet as TPet);
                map.setView(
                  [pet.position__latitude, pet.position__longitude],
                  14,
                );
              },
            }}
          ></Marker>
        );
      })}
    </>
  );
}
