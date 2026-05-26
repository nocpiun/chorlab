"use client";

import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import type { IChord } from "@/lib/chords";
import { createContext, useContext, useState } from "react";

interface ChordContextValue {
  chord: IChord
  setChord: Dispatch<SetStateAction<IChord>>
}

const ChordContext = createContext<ChordContextValue | null>(null);

const DEFAULT_CHORD: IChord = { root: "C", type: "maj" };

export function ChordProvider({
  initial,
  children,
}: PropsWithChildren<{ initial?: IChord }>) {
  const [chord, setChord] = useState<IChord>(initial ?? DEFAULT_CHORD);

  return (
    <ChordContext.Provider value={{ chord, setChord }}>
      {children}
    </ChordContext.Provider>
  );
}

export function useChord(): ChordContextValue {
  const ctx = useContext(ChordContext);
  if(!ctx) throw new Error("useChord must be used within ChordProvider");
  
  return ctx;
}
