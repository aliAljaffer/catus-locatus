import { TPet } from "@/components/pets/Pet";
import { useQuery } from "@tanstack/react-query";
import supabase from "@/utils/supabase";
import { STALE_TIME } from "@/utils/helpers";
function useFetchAllPets() {
  const { data, error, isLoading } = useQuery<TPet[]>({
    queryKey: ["pets"],
    queryFn: async () => {
      const { data, error } = await supabase.from("pets").select();
      if (error) throw new Error(error.message);
      return data as TPet[];
    },
    staleTime: STALE_TIME,
  });
  return { data, error, isLoading };
}
export default useFetchAllPets;
