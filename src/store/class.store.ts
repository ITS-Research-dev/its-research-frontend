// stores/useClassStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ClassStore {
  selectedClassId: string;
  setSelectedClassId: (id: string) => void;
}

export const useClassStore = create<ClassStore>()(
  persist(
    (set) => ({
      selectedClassId: "",
      setSelectedClassId: (id) => set({ selectedClassId: id }),
    }),
    { name: "class-storage" }
  )
);