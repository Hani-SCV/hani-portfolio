import { useLayoutEffect, useRef } from "react";

import { fromTo } from "@/shared/utils/gsap";

import { CenterPanel } from "./CenterPanel";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";

export function MainSelect() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    fromTo(
      rootRef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
    );
  }, []);

  return (
    <div
      ref={rootRef}
      className="mx-auto box-border w-full max-w-300 py-12 select-none"
    >
      <div className="grid h-[90vh] grid-cols-[340px_minmax(0,1fr)_320px] gap-4">
        <LeftPanel />
        <CenterPanel />
        <RightPanel />
      </div>
    </div>
  );
}
