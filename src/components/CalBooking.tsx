"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const CAL_LINK = "samy-nowak/30min";

export default function CalBooking() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        layout: "month_view",
        styles: {
          branding: { brandColor: "#6366f1" },
        },
      });
    })();
  }, []);

  return (
    <Cal
      calLink={CAL_LINK}
      style={{ width: "100%", height: "100%", minHeight: "650px" }}
      config={{ layout: "month_view", theme: "dark" }}
    />
  );
}
