import type { ChordType, IChord } from "@/lib/chords";
import { CHORD_TYPES, PITCHES } from "@/lib/chords";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ChordItem } from "./chord-item";
import { emitter } from "@/lib/emitter";

const CHORD_TYPE_KEYS = Object.keys(CHORD_TYPES) as ChordType[];

export function ChordTable({ className }: { className?: string }) {
  return (
    <Card className={cn("rounded-tr-none rounded-br-none", className)}>
      <CardHeader>
        <CardTitle>所有和弦</CardTitle>
        <CardDescription>
          按根音分类排列的所有和弦，点击和弦以播放
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-0 h-full">
        <Tabs defaultValue="C" className="h-full">
          <TabsList className="w-full h-10!">
            {PITCHES.map((pitch) => (
              <TabsTrigger
                className="text-base"
                value={pitch}
                key={pitch}>
                {pitch}
              </TabsTrigger>
            ))}
          </TabsList>
          {PITCHES.map((pitch) => (
            <TabsContent className="overflow-y-auto" value={pitch} key={pitch}>
              <div className="flex gap-1 flex-wrap pt-2">
                {CHORD_TYPE_KEYS.map((type) => {
                  const chord: IChord = { root: pitch, type };
                  return (
                    <ChordItem
                      chord={chord}
                      onAdd={() => emitter.emit("add-favorite-chord", chord)}
                      key={type}/>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
