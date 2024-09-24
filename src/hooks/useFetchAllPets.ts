import { TPet } from "@/data/pets";
import { useQuery } from "@tanstack/react-query";
function useFetchAllPets() {
  const { data, error, isLoading, isPending } = useQuery<TPet[]>({
    queryKey: ["pets"],
    queryFn: async () => {
      return await fetch("http://localhost:5000/pets").then((res) =>
        res.json(),
      );
    },
    staleTime: 15 * 1,
  });

  return { data, error, isLoading, isPending };
}

export default useFetchAllPets;
