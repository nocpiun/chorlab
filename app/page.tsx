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
import { useEmitter } from "@/hooks/use-emitter";

export default function Page() {
  const [favorites, setFavorites] = useState<Set<IChord>>(new Set());

  const handleAdd = (chord: IChord) => {
    favorites.add(chord);
    setFavorites(new Set(favorites));
    setStorageItem("favorite-chords", Array.from(favorites));
  };

  const handleRemove = (chord: IChord) => {
    favorites.delete(chord);
    setFavorites(new Set(favorites));
    setStorageItem("favorite-chords", Array.from(favorites));
  };

  useEffect(() => {
    setFavorites(new Set(getStorageItem("favorite-chords")));
  }, []);

  useEmitter("add-favorite-chord", (chord: IChord) => {
    handleAdd(chord);
  });

  return (
    <ChordProvider>
      <div className="flex-1 flex h-full">
        <div className="flex-1 pt-20 px-[8%] flex flex-col gap-16">
          <ChordSelector className="pl-6"/>
          <div className="flex flex-wrap gap-1">
            {Array.from(favorites).map((c, i) => (
              <ChordItem
                chord={c}
                onRemove={() => handleRemove(c)}
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
