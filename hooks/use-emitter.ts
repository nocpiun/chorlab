import { useEffect } from "react";
import { emitter } from "@/lib/emitter";

export function useEmitter(eventName: string, listener: (...args: any[]) => void) {
  useEffect(() => {
    emitter.on(eventName, listener);

    return () => {
      emitter.off(eventName, listener);
    };
  }, [eventName, listener]);
}
