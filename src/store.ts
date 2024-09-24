import { create } from "zustand";
import { TPet } from "./components/pets/Pet";

type Store = {
  selectedId: number;
  isCardShown: boolean;
  pets: TPet[];
  changeSelected: (id: number) => void;
  showCard: (choice: boolean) => void;
  setPets: (fetchedPets: TPet[]) => void;
};

const useStore = create<Store>()(
  (set) => ({
    selectedId: -1,
    isCardShown: false,
    pets: [],
    changeSelected: (newId) => {
      set({ selectedId: newId });
    },
    showCard: (choice) => set({ isCardShown: choice }),
    setPets: (newPets) => set({ pets: newPets }),
  }),

  // persist(
  //   (set) => ({
  //     selectedId: -1,
  //     pets: [],
  //     changeSelected: (newId) => {
  //       set({ selectedId: newId });
  //     },
  //     setPets: (newPets) => set({ pets: newPets }),
  //   }),
  //   {
  //     name: "selected-id",
  //   },
  // ),
);

export const useSelectedId = () => useStore((state) => state.selectedId);
export const usePets = () => useStore((state) => state.pets);
export const useSetPets = () => useStore((state) => state.setPets);
export const useChangeSelected = () =>
  useStore((state) => state.changeSelected);
export const useShowCard = () => useStore((state) => state.showCard);
export const useIsCardShown = () => useStore((state) => state.isCardShown);
