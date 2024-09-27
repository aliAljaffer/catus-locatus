import { TPet } from "@/components/pets/Pet";
import { Map } from "leaflet";
import { RefObject } from "react";
import useFetchAllPets from "./useFetchAllPets";

function useFetchInViewPets(map: RefObject<Map>) {
  const { data, error, isLoading } = useFetchAllPets();
  const mapBounds = map?.current?.getBounds();
  let inView: TPet[] = [];
  if (data && mapBounds) {
    inView = data.filter((pet) =>
      mapBounds.contains([pet.position__latitude, pet.position__longitude]),
    );
  }
  return { inView, error, isLoading };
}

export default useFetchInViewPets;
