"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { PITCHES, type IChord } from "@/lib/chords";
import { ChordItem } from "@/components/chord-item";
import { ChordProvider } from "@/contexts/chord-context";
import { ChordSelector } from "@/components/chord-selector";
import { ChordTable } from "@/components/chord-table";
import { getStorageItem, setStorageItem } from "@/lib/storage";
import { AddChordDialog } from "./add-chord-dialog";
import { useEmitter } from "@/hooks/use-emitter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function Page() {
  const [favorites, setFavorites] = useState<Set<IChord>>(new Set());
  const [capo, setCapo] = useState(getStorageItem("capo"));

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

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Label>变调夹</Label>
              <Select
                value={capo.toString()}
                onValueChange={(value) => {
                  const next = parseInt(value);
                  setCapo(next);
                  setStorageItem("capo", next);
                }}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {PITCHES.map((pitch, i) => (
                      <SelectItem value={i.toString()} key={i}>
                        {pitch}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap gap-1">
              {Array.from(favorites).map((c, i) => (
                <ChordItem
                  chord={c}
                  capo={capo}
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
        </div>
        <ChordTable className="w-[36%] h-full"/>
      </div>
    </ChordProvider>
  );
}
