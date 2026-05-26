export const PITCHES = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "Ab", "A", "Bb", "B",
] as const;
export type Pitch = (typeof PITCHES)[number];

const PITCH_SEMITONES: Record<Pitch, number> = {
  "C":  0,
  "C#": 1,
  "D":  2,
  "D#": 3,
  "E":  4,
  "F":  5,
  "F#": 6,
  "G":  7,
  "Ab": 8,
  "A":  9,
  "Bb": 10,
  "B":  11,
};

const SEMITONE_TO_PITCH: Pitch[] = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "Ab", "A", "Bb", "B",
];

export interface ChordTypeDef {
  suffix: string
  label: string
  intervals: number[]
}

export const CHORD_TYPES = {
  "maj":   { suffix: "",      label: "大三和弦",     intervals: [0, 4, 7] },
  "min":   { suffix: "m",     label: "小三和弦",     intervals: [0, 3, 7] },
  "aug":   { suffix: "aug",   label: "增三和弦",     intervals: [0, 4, 8] },
  "dim":   { suffix: "dim",   label: "减三和弦",     intervals: [0, 3, 6] },
  "sus2":  { suffix: "sus2",  label: "挂二和弦",     intervals: [0, 2, 7] },
  "sus4":  { suffix: "sus4",  label: "挂四和弦",     intervals: [0, 5, 7] },
  "6":     { suffix: "6",     label: "大六和弦",     intervals: [0, 4, 7, 9] },
  "m6":    { suffix: "m6",    label: "小六和弦",     intervals: [0, 3, 7, 9] },
  "7":     { suffix: "7",     label: "属七和弦",     intervals: [0, 4, 7, 10] },
  "maj7":  { suffix: "maj7",  label: "大七和弦",     intervals: [0, 4, 7, 11] },
  "m7":    { suffix: "m7",    label: "小七和弦",     intervals: [0, 3, 7, 10] },
  "mMaj7": { suffix: "mMaj7", label: "小大七和弦",   intervals: [0, 3, 7, 11] },
  "dim7":  { suffix: "dim7",  label: "减七和弦",     intervals: [0, 3, 6, 9] },
  "m7b5":  { suffix: "m7b5",  label: "半减七和弦",   intervals: [0, 3, 6, 10] },
  "aug7":  { suffix: "aug7",  label: "增七和弦",     intervals: [0, 4, 8, 10] },
  "7sus4": { suffix: "7sus4", label: "属七挂四和弦", intervals: [0, 5, 7, 10] },
  "add9":  { suffix: "add9",  label: "加九和弦",     intervals: [0, 4, 7, 14] },
  "9":     { suffix: "9",     label: "属九和弦",     intervals: [0, 4, 7, 10, 14] },
  "maj9":  { suffix: "maj9",  label: "大九和弦",     intervals: [0, 4, 7, 11, 14] },
  "m9":    { suffix: "m9",    label: "小九和弦",     intervals: [0, 3, 7, 10, 14] },
  "11":    { suffix: "11",    label: "属十一和弦",   intervals: [0, 4, 7, 10, 14, 17] },
  "13":    { suffix: "13",    label: "属十三和弦",   intervals: [0, 4, 7, 10, 14, 17, 21] },
} as const satisfies Record<string, ChordTypeDef>;

export type ChordType = keyof typeof CHORD_TYPES;

export interface IChord {
  root: Pitch
  type: ChordType
}

export class Chord implements IChord {
  public readonly root: Pitch;
  public readonly type: ChordType;

  public constructor(root: Pitch, type: ChordType) {
    this.root = root;
    this.type = type;
  }

  public static default(): Chord {
    return new Chord("C", "maj");
  }

  public static from({ root, type }: IChord): Chord {
    return new Chord(root, type);
  }

  public with(parts: Partial<IChord>): Chord {
    return new Chord(parts.root ?? this.root, parts.type ?? this.type);
  }

  public get name(): [string, string] {
    return [this.root, CHORD_TYPES[this.type].suffix];
  }

  public get pitches(): Pitch[] {
    const rootSemitone = PITCH_SEMITONES[this.root];

    return CHORD_TYPES[this.type].intervals.map((interval) => (
      SEMITONE_TO_PITCH[(rootSemitone + interval) % 12]
    ));
  }

  public notes(rootOctave: number = 4): string[] {
    const rootSemitone = PITCH_SEMITONES[this.root];

    return CHORD_TYPES[this.type].intervals.map((interval) => {
      const abs = rootSemitone + interval;
      const pitch = SEMITONE_TO_PITCH[abs % 12];
      const octave = rootOctave + Math.floor(abs / 12);
      return pitch + octave;
    });
  }
}
