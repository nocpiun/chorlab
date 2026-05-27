"use client";

import type { ChordType, Pitch } from "@/lib/chords";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CHORD_TYPES, Chord, PITCHES } from "@/lib/chords";
import { playNotes, playNotesSplit } from "@/lib/tone";
import { cn } from "@/lib/utils";
import { useChord } from "@/contexts/chord-context";

const CHORD_TYPE_ENTRIES = Object.entries(CHORD_TYPES) as [
  ChordType,
  (typeof CHORD_TYPES)[ChordType],
][];

export function ChordSelector({ className }: { className?: string }) {
  const { chord, setChord } = useChord();
  const [chordRoot, chordSuffix] = Chord.from(chord).name;

  const handlePlay = () => {
    playNotes(Chord.from(chord).notes());
  };

  const handleSplitPlay = () => {
    playNotesSplit(Chord.from(chord).notes());
  };

  return (
    <div className={cn("py-14 flex flex-col gap-8", className)}>
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
            <SelectGroup>
              {PITCHES.map((pitch) => (
                <SelectItem
                  className="font-semibold"
                  value={pitch}
                  key={pitch}>
                  {pitch}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={chord.type}
          onValueChange={(value) => setChord({ ...chord, type: value as ChordType })}>
          <SelectTrigger className="w-52" aria-label="和弦类型">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              {CHORD_TYPE_ENTRIES.map(([key, def]) => (
                <SelectItem value={key} key={key}>
                  {def.suffix || "maj"}
                  <span className="text-muted-foreground">
                    {def.label}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button onClick={handlePlay} aria-label="播放和弦">
          <Play />
          播放
        </Button>

        <Button onClick={handleSplitPlay} variant="outline" aria-label="拆分播放和弦">
          <Play />
          拆分播放
        </Button>
      </div>
    </div>
  );
}
