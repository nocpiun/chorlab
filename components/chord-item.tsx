"use client";

import type { IChord, } from "@/lib/chords";
import { Plus, X } from "lucide-react";
import { Chord, CHORD_TYPES } from "@/lib/chords";
import { googleSansCode } from "@/lib/fonts";
import { addCapoToPitch, cn } from "@/lib/utils";
import { useChord } from "@/contexts/chord-context";
import { playNotes } from "@/lib/tone";
import { Button } from "./ui/button";

export function ChordItem({
  chord: _c,
  capo = 0,
  onRemove,
  onAdd,
}: {
  chord: IChord
  capo?: number
  onRemove?: () => void
  onAdd?: () => void
}) {
  const { setChord } = useChord();
  const c: IChord = { root: addCapoToPitch(_c.root, capo), type: _c.type };
  const chord = Chord.from(c);
  const [chordRoot, chordSuffix] = chord.name;
  const label = CHORD_TYPES[chord.type].label;
  const pitches = chord.pitches.join(" ");

  const handleClick = () => {
    setChord(c);
    playNotes(chord.notes());
  };

  return (
    <div
      onClick={() => handleClick()}
      className={cn(
        "relative select-none flex w-28 min-h-28 flex-col items-center gap-1 rounded-md bg-transparent p-3 text-left transition-colors cursor-pointer",
        chordRoot === "C" && "bg-amber-500/20 hover:bg-amber-500/50 dark:bg-yellow-800/50 dark:hover:bg-yellow-800",
        chordRoot === "D" && "bg-muted/80 hover:bg-muted",
        chordRoot === "E" && "bg-blue-500/20 hover:bg-blue-600/50 dark:bg-blue-800/50 dark:hover:bg-blue-800/80",
        chordRoot === "F" && "bg-emerald-500/20 hover:bg-emerald-600/50 dark:bg-emerald-800/50 dark:hover:bg-emerald-800",
        chordRoot === "G" && "bg-sky-100 hover:bg-sky-300/70 dark:bg-sky-800/80 dark:hover:bg-sky-800",
        chordRoot === "A" && "bg-red-200 hover:bg-red-300 dark:bg-red-950 dark:hover:bg-red-900",
        chordRoot === "B" && "bg-green-100 hover:bg-green-200 dark:bg-green-950 dark:hover:bg-green-900"
      )}>
      {onRemove && (
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute top-0.5 left-0.5"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}>
          <X />
        </Button>
      )}
      {onAdd && (
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute top-0.5 right-0.5"
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}>
          <Plus />
        </Button>
      )}
      <div className="text-2xl font-bold">
        {chordRoot}
        <span className="text-sm">
          {chordSuffix}
        </span>
      </div>
      <div
        className={cn(
          googleSansCode.className,
          "text-xs text-center text-muted-foreground mt-auto",
        )}>
        {pitches}
      </div>
      <div className="text-xs text-foreground">
        {label}
      </div>
    </div>
  );
}
