"use client";

import type { IChord } from "@/lib/chords";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { ChordItem } from "@/components/chord-item";
import { ChordProvider } from "@/contexts/chord-context";
import { ChordSelector } from "@/components/chord-selector";
import { ChordTable } from "@/components/chord-table";
import { getStorageItem, setStorageItem } from "@/lib/storage";
import { AddChordDialog } from "./add-chord-dialog";

export default function Page() {
  const [favorites, setFavorites] = useState<IChord[]>([]);

  const handleAdd = (chord: IChord) => {
    const next = [...favorites, chord];
    setFavorites(next);
    setStorageItem("favorite-chords", next);
  };

  useEffect(() => {
    setFavorites(getStorageItem("favorite-chords"));
  }, []);

  return (
    <ChordProvider>
      <div className="flex-1 flex h-full">
        <div className="flex-1 pt-20 px-[8%] flex flex-col gap-16">
          <ChordSelector className="pl-6"/>
          <div className="flex flex-wrap gap-1">
            {favorites.map((c, i) => (
              <ChordItem
                chord={c}
                key={`${c.root}-${c.type}-${i}`}/>
            ))}
            <AddChordDialog
              onAdd={handleAdd}
              asChild>
              <button
                type="button"
                aria-label="添加和弦"
                className="flex w-28 flex-col items-center justify-center gap-1 rounded-md bg-transparent p-3 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer">
                <Plus className="size-8" />
              </button>
            </AddChordDialog>
          </div>
        </div>
        <ChordTable className="w-[36%] h-full"/>
      </div>
    </ChordProvider>
  );
}
