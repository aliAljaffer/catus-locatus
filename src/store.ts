import { create } from "zustand";
import { TPet } from "./components/pets/Pet";

type Store = {
  selectedId: number;
  isCardShown: boolean;
  isDialogOpen: boolean;
  skipAuth: boolean;
  pets: TPet[];
  changeSelected: (id: number) => void;
  showCard: (choice: boolean) => void;
  setIsDialogOpen: (openState: boolean) => void;
  setPets: (fetchedPets: TPet[]) => void;
  setSkipAuth: (choice: boolean) => void;
};
const useStore = create<Store>()((set) => ({
  selectedId: -1,
  isDialogOpen: false,
  isCardShown: false,
  skipAuth: false,
  pets: [],
  changeSelected: (newId) => {
    set({ selectedId: newId });
  },
  showCard: (choice) => set({ isCardShown: choice }),
  setSkipAuth: (auth) => set({ skipAuth: auth }),
  setPets: (newPets) => set({ pets: newPets }),
  setIsDialogOpen: (openState) => {
    set({ isDialogOpen: openState });
  },
}));

export const useSelectedId = () => useStore((state) => state.selectedId);
export const usePets = () => useStore((state) => state.pets);
export const useSetPets = () => useStore((state) => state.setPets);
export const useChangeSelected = () =>
  useStore((state) => state.changeSelected);
export const useShowCard = () => useStore((state) => state.showCard);
export const useSetIsDialogOpen = () =>
  useStore((state) => state.setIsDialogOpen);
export const useIsCardShown = () => useStore((state) => state.isCardShown);
export const useSkipAuth = () => useStore((state) => state.skipAuth);
export const useSetSkipAuth = () => useStore((state) => state.setSkipAuth);
export const useIsDialogOpen = () => useStore((state) => state.isDialogOpen);
