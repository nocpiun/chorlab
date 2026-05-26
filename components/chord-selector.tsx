"use client";

import type { ChordType, Pitch } from "@/lib/chords";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CHORD_TYPES, Chord, PITCHES } from "@/lib/chords";

const CHORD_TYPE_ENTRIES = Object.entries(CHORD_TYPES) as [
  ChordType,
  (typeof CHORD_TYPES)[ChordType],
][];

export function ChordSelector() {
  const [chord, setChord] = useState<Chord>(Chord.default());
  const [chordRoot, chordType] = useMemo(() => chord.name, [chord]);

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="text-9xl font-semibold tracking-tight tabular-nums">
        {chordRoot}
        <span className="text-7xl">
          {chordType}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Select
          value={chord.root}
          onValueChange={(value) => setChord(chord.with({ root: value as Pitch }))}>
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
          onValueChange={(value) => setChord(chord.with({ type: value as ChordType }))}>
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
