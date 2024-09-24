import { TPet } from "@/data/pets";
import { useQuery } from "@tanstack/react-query";
import { Map } from "leaflet";
import { RefObject } from "react";

function useFetchInViewPets(map: RefObject<Map>) {
  const { data, error, isLoading, isPending } = useQuery<TPet[]>({
    queryKey: ["pets"],
    queryFn: async () => {
      return await fetch("http://localhost:5000/pets").then((res) =>
        res.json(),
      );
    },
    staleTime: 15 * 1,
  });
  const mapBounds = map?.current?.getBounds();
  let inView: TPet[] = [];
  if (data && mapBounds) {
    inView = data.filter((pet) =>
      mapBounds.contains([pet.position.latitude, pet.position.longitude]),
    );
  }
  console.log("pets in view", inView.length);
  return { inView, error, isLoading, isPending };
}

export default useFetchInViewPets;
