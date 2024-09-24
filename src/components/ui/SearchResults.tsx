import useFetchAllPets from "@/hooks/useFetchAllPets";
import { Spinner } from "@radix-ui/themes";
import { TPet } from "../pets/Pet";
import { useNavigate } from "react-router-dom";
import { useChangeSelected } from "@/store";

type SearchResultsProps = {
  searchTerm: string;
};
export default function SearchResults({ searchTerm }: SearchResultsProps) {
  const { data, isLoading, isPending } = useFetchAllPets();
  const changeSelected = useChangeSelected();
  const navigate = useNavigate();
  if (isLoading || isPending) return <Spinner />;
  if (!data) return null;
  const filteredResults = searchPets(data, searchTerm);
  if (searchTerm.length < 1) return null;
  return (
    <div className="z-[9999] flex h-auto w-full flex-col gap-1 border-b border-zinc-700 bg-zinc-100">
      {filteredResults.length > 0 ? (
        filteredResults.slice(0, 8).map((pet) => (
          <div
            onClick={() => {
              navigate(
                `?lat=${pet.position.latitude}&lng=${pet.position.longitude}`,
              );
              changeSelected(pet.caseId);
            }}
            className="flex items-center justify-start gap-1 border-b px-2 py-1 hover:cursor-pointer hover:border-b hover:border-zinc-700"
          >
            <span className="w-fit text-sm">{pet.name}</span>{" "}
            {pet.petType === "dog" ? "🐶" : "🐱"}{" "}
            <span className="truncate text-sm">{pet.description}</span>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center gap-2 py-2">
          No results found for {searchTerm} <span>😢</span>
        </div>
      )}
    </div>
  );
}

function searchPets(petsList: TPet[], searchTerm: string): TPet[] {
  if (!petsList.length) return [];
  if (searchTerm.length < 1) return [];
  return petsList.filter((pet) => {
    return (
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.caseStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.petType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.tags.join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
}
