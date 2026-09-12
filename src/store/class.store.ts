// stores/useClassStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ClassStore {
  selectedClassId: string;
  selectedClassName: string;
  setSelectedClassId: (id: string) => void;
  /** Simpan ID dan nama kelas secara bersamaan (direkomendasikan). */
  setSelectedClass: (id: string, name: string) => void;
}

export const useClassStore = create<ClassStore>()(
  persist(
    (set) => ({
      selectedClassId: "",
      selectedClassName: "",
      setSelectedClassId: (id) => set({ selectedClassId: id }),
      setSelectedClass: (id, name) =>
        set({ selectedClassId: id, selectedClassName: name }),
    }),
    { name: "class-storage" }
  )
);