import { useState } from "react";
import { TPet } from "../pets/Pet";
import { Marker, useMapEvents } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
type MarkerPainterProps = {
  handleMapClick: (p: TPet) => void;
};
export default function MarkerPainter({ handleMapClick }: MarkerPainterProps) {
  const [inViewPets, setInViewPets] = useState<TPet[]>([]);

  const map = useMapEvents({
    moveend: loadInView,
  });

  const { data } = useQuery<TPet[]>({
    queryKey: ["pets"],
    queryFn: async () => {
      return await fetch("http://localhost:5000/pets").then((res) =>
        res.json(),
      );
    },
    staleTime: 50 * 1,
  });

  function loadInView() {
    let inView: TPet[] = [];
    if (data && map) {
      inView = data.filter((pet) =>
        map
          .getBounds()
          .contains([pet.position.latitude, pet.position.longitude]),
      );
    }
    console.log("pets in view", inView.length);
    setInViewPets(inView);
  }

  return (
    <>
      {inViewPets.map((pet) => {
        return (
          <Marker
            key={pet.caseId}
            position={[pet.position.latitude, pet.position.longitude]}
            title={pet.name}
            eventHandlers={{
              click: () => {
                handleMapClick(pet as TPet);
                map.setView(
                  [pet.position.latitude, pet.position.longitude],
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
