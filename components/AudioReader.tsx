"use client";

import { useState, useEffect, useCallback } from "react";
import { Volume2, Square, Pause, Play } from "lucide-react";

interface AudioReaderProps {
  text: string;
  label?: string;
}

export function AudioReader({ text, label = "Listen to this section" }: AudioReaderProps) {
  const [state, setState] = useState<"idle" | "speaking" | "paused">("idle");
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88;
    utterance.pitch = 1.0;
    utterance.lang = "en-US";
    utterance.onstart = () => setState("speaking");
    utterance.onend = () => setState("idle");
    utterance.onerror = () => setState("idle");
    utterance.onpause = () => setState("paused");
    utterance.onresume = () => setState("speaking");
    window.speechSynthesis.speak(utterance);
  }, [text, supported]);

  const pause = () => { window.speechSynthesis.pause(); setState("paused"); };
  const resume = () => { window.speechSynthesis.resume(); setState("speaking"); };
  const stop = () => { window.speechSynthesis.cancel(); setState("idle"); };

  if (!supported) return null;

  return (
    <div
      className="flex items-center gap-3 px-5 py-3 w-fit"
      style={{
        background: state !== "idle" ? "var(--plum)" : "var(--parchment)",
        border: "1px solid var(--ink-ghost)",
        transition: "background 0.2s ease",
      }}
    >
      {state === "idle" && (
        <button
          onClick={speak}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"
          style={{ color: state === "idle" ? "var(--ink)" : "var(--cream)" }}
        >
          <Volume2 size={14} />
          {label}
        </button>
      )}
      {state === "speaking" && (
        <>
          <button
            onClick={pause}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--cream)" }}
          >
            <Pause size={14} />
            Pause
          </button>
          <span style={{ color: "rgba(238,239,237,0.3)" }}>|</span>
          <button
            onClick={stop}
            className="flex items-center gap-1.5 text-xs uppercase tracking-widest"
            style={{ color: "rgba(238,239,237,0.65)" }}
          >
            <Square size={12} />
            Stop
          </button>
        </>
      )}
      {state === "paused" && (
        <>
          <button
            onClick={resume}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--cream)" }}
          >
            <Play size={14} />
            Resume
          </button>
          <span style={{ color: "rgba(238,239,237,0.3)" }}>|</span>
          <button
            onClick={stop}
            className="flex items-center gap-1.5 text-xs uppercase tracking-widest"
            style={{ color: "rgba(238,239,237,0.65)" }}
          >
            <Square size={12} />
            Stop
          </button>
        </>
      )}
    </div>
  );
}
