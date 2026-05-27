import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Pitch, PITCHES } from "./chords";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function addCapoToPitch(pitch: Pitch, capo: number): Pitch {
  if(capo < 0 || capo >= PITCHES.length) return pitch;

  const index = PITCHES.indexOf(pitch);
  if(index < 0) return pitch;

  let newIndex = index + capo;
  if(newIndex >= PITCHES.length) {
    newIndex -= PITCHES.length;
  }
  return PITCHES[newIndex];
}
