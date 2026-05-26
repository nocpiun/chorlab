"use client";

import type { ChordType, Pitch } from "@/lib/chords";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CHORD_TYPES, Chord, PITCHES } from "@/lib/chords";
import { cn } from "@/lib/utils";
import { useChord } from "@/contexts/chord-context";

const CHORD_TYPE_ENTRIES = Object.entries(CHORD_TYPES) as [
  ChordType,
  (typeof CHORD_TYPES)[ChordType],
][];

export function ChordSelector({ className }: { className?: string }) {
  const { chord, setChord } = useChord();
  const [chordRoot, chordSuffix] = Chord.from(chord).name;

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="text-9xl font-semibold tracking-tight tabular-nums">
        {chordRoot}
        <span className="text-7xl">
          {chordSuffix}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Select
          value={chord.root}
          onValueChange={(value) => setChord({ ...chord, root: value as Pitch })}>
          <SelectTrigger className="w-24 font-semibold" aria-label="根音">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PITCHES.map((pitch) => (
              <SelectItem
                className="font-semibold"
                value={pitch}
                key={pitch}>
                {pitch}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={chord.type}
          onValueChange={(value) => setChord({ ...chord, type: value as ChordType })}>
          <SelectTrigger className="w-52" aria-label="和弦类型">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            {CHORD_TYPE_ENTRIES.map(([key, def]) => (
              <SelectItem value={key} key={key}>
                {def.suffix || "maj"}
                <span className="text-muted-foreground">
                  {def.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
