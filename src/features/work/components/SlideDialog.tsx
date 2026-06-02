import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

type SlideDialogProps = {
  className?: string;
};

export function SlideDialog({ className = "" }: SlideDialogProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        y: 12,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power1.out",
      },
    );
  }, []);

  return (
    <div ref={ref} className={`pointer-events-none ${className} `}>
      <div className="rounded-xl border border-white/10 bg-[#1C1C25] px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-md">
        slide it!
      </div>
    </div>
  );
}
