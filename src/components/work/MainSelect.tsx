import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { LeftPanel } from "./LeftPanel";
import { CenterPanel } from "./CenterPanel";
import { RightPanel } from "./RightPanel";

export function MainSelect() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      rootRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    );
  }, []);

  return (
    <div
      ref={rootRef}
      className="box-border w-full font-[greycliff-cf] text-[0.9vw] leading-[1.2] font-bold tracking-[0.08em] uppercase select-none [-webkit-text-size-adjust:100%]"
    >
      <div className="mx-auto my-auto flex w-full max-w-[90em] flex-col items-center justify-center px-[2.22em] py-[3em]">
        <div className="grid h-[90vh] w-full grid-cols-[320px_1fr_360px] gap-4">
          <LeftPanel />
          <CenterPanel />
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
