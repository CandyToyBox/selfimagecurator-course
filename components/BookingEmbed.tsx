"use client";

import { useEffect } from "react";
import { BOOKING_URL } from "@/lib/booking";

/**
 * Inline Acuity scheduler so clients book without leaving the course.
 * Loads Acuity's embed.js once (handles iframe auto-resize where supported);
 * a fixed min-height guarantees the calendar is usable even before resize.
 */
export function BookingEmbed({ height = 800 }: { height?: number }) {
  useEffect(() => {
    const id = "acuity-embed-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://embed.acuityscheduling.com/js/embed.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <iframe
      src={BOOKING_URL}
      title="Book Your Blueprint Analysis with Thays"
      width="100%"
      height={height}
      frameBorder="0"
      className="acuity-embed-iframe block w-full"
      style={{ border: "none", minHeight: height, background: "var(--cream)" }}
    />
  );
}
