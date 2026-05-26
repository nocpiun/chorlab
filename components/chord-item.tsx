"use client";

import type { IChord } from "@/lib/chords";
import { Chord, CHORD_TYPES } from "@/lib/chords";
import { googleSansCode } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useChord } from "@/contexts/chord-context";
import { playNotes } from "@/lib/tone";

export function ChordItem({ chord: c }: { chord: IChord }) {
  const { setChord } = useChord();
  const chord = Chord.from(c);
  const [chordRoot, chordSuffix] = chord.name;
  const label = CHORD_TYPES[chord.type].label;
  const pitches = chord.pitches.join(" ");

  const handleClick = () => {
    setChord(c);
    playNotes(chord.notes());
  };

  return (
    <button
      type="button"
      onClick={() => handleClick()}
      className="flex w-28 flex-col items-center gap-1 rounded-md bg-transparent p-3 text-left transition-colors hover:bg-muted cursor-pointer">
      <div className="text-2xl font-bold">
        {chordRoot}
        <span className="text-sm">
          {chordSuffix}
        </span>
      </div>
      <div
        className={cn(
          googleSansCode.className,
          "text-xs text-center text-muted-foreground",
        )}>
        {pitches}
      </div>
      <div className="text-xs text-foreground">
        {label}
      </div>
    </button>
  );
}
