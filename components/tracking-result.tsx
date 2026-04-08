"use client";

import type { TrackingData, ProductInfo } from "@/lib/types";
import { TrackingProgress } from "./tracking-progress";
import { TrackingTimeline } from "./tracking-timeline";
import { TrackingSidebar } from "./tracking-sidebar";

export function TrackingResult({ data, products }: { data: TrackingData; products?: ProductInfo[] }) {
  const info = data.track_info;
  const status = info.latest_status.status;
  const events = info.tracking.providers?.[0]?.events || [];
  const carrier = info.tracking.providers?.[0]?.provider;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
      <div style={{ marginTop: 40, marginBottom: 40 }}>
        <TrackingProgress milestones={info.milestone} currentStatus={status} />
      </div>

      <div style={{ minHeight: 100, display: "flex", flexDirection: "column" }}>
        <div className="tracking-content" style={{ marginBottom: 20, width: "100%", overflow: "hidden" }}>
          <TrackingTimeline events={events} statusLabel={status} />
          <TrackingSidebar
            trackingNumber={data.number}
            carrierName={carrier?.name || ""}
            carrierHomepage={carrier?.homepage || ""}
            products={products || []}
          />
        </div>
      </div>
    </div>
  );
}
