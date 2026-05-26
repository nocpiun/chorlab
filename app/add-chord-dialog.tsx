"use client";

import type { ChordType, IChord, Pitch } from "@/lib/chords";
import { type PropsWithChildren, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

export function AddChordDialog({
  children,
  asChild,
  onAdd,
}: PropsWithChildren<{
  asChild?: boolean
  onAdd: (chord: IChord) => void
}>) {
  const [root, setRoot] = useState<Pitch>("C");
  const [type, setType] = useState<ChordType>("maj");

  const previewChord = new Chord(root, type);
  const [previewRoot, previewSuffix] = previewChord.name;

  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>添加收藏和弦</DialogTitle>
          <DialogDescription>
            选择根音与和弦类型
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center gap-1 py-2">
          <div className="text-4xl font-bold">
            {previewRoot}
            <span className="text-lg">
              {previewSuffix}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {previewChord.pitches.join(" ")}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Select value={root} onValueChange={(v) => setRoot(v as Pitch)}>
            <SelectTrigger className="w-24" aria-label="根音">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PITCHES.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={type} onValueChange={(v) => setType(v as ChordType)}>
            <SelectTrigger className="w-44" aria-label="和弦类型">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CHORD_TYPE_ENTRIES.map(([key, def]) => (
                <SelectItem key={key} value={key}>
                  {def.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              取消
            </Button>
          </DialogClose>
          <Button onClick={() => onAdd({ root, type })}>
            添加
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
