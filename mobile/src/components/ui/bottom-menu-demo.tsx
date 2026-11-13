// The component's own demo, kept as it came (web only: it draws HTML). Not used by the app.
"use client";
import BottomMenu from "@/components/ui/bottom-menu";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-background p-8">
      <BottomMenu />
    </div>
  );
}
