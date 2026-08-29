"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function CalBooking() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: {
          branding: { brandColor: "#6366f1" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="w-full h-full min-h-[700px]">
      <Cal
        calLink="samy-nowak/30min"
        style={{ width: "100%", height: "100%", minHeight: "700px" }}
        config={{ layout: "month_view", theme: "dark" }}
      />
    </div>
  );
}
