import gsap from "gsap";
import { ArrowBigRightDash } from "lucide-react";
import { useEffect,useLayoutEffect, useRef } from "react";

import { useCustomizerStore } from "@/features/work/stores/useCustomizerStore";
import { animate } from "@/shared/utils/animate";

type DragSliderProps = {
  onDialogChange: (open: boolean) => void;
  onComplete: () => void;
  resetTrigger?: number;
};
export function DragSlider({
  onDialogChange,
  onComplete,
  resetTrigger,
}: DragSliderProps) {
  const color = useCustomizerStore((s) => s.color);

  const dragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!handleRef.current) return;

    currentX.current = 0;

    gsap.to(handleRef.current, {
      x: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [resetTrigger]);

  useLayoutEffect(() => {
    gsap.set(btnRef.current, {
      y: -6,
      boxShadow: `0 6px 0 ${color.dark}`,
    });

    gsap.set(handleRef.current, {
      x: 0,
    });
  }, [color.dark]);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    startX.current = e.clientX - currentX.current;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;

    const container = containerRef.current;
    const handle = handleRef.current;

    if (!container || !handle) return;

    const containerWidth = container.offsetWidth;
    const handleWidth = handle.offsetWidth;

    let nextX = e.clientX - startX.current;

    const max = containerWidth - handleWidth;

    if (nextX < 0) nextX = 0;
    if (nextX > max) nextX = max;

    currentX.current = nextX;

    gsap.set(handle, {
      x: nextX,
    });

    if (nextX >= max - 6) {
      dragging.current = false;

      currentX.current = max;

      gsap.to(handle, {
        x: max,
        duration: 0.12,
        ease: "power2.out",
        onComplete: () => {
          onComplete?.();
        },
      });

      return;
    }
  };

  const onMouseUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative h-12 w-full overflow-visible rounded-md bg-white"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="flex h-full transition-transform duration-200"></div>
      </div>

      <div
        ref={handleRef}
        className="absolute top-0 left-0 z-10 cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
      >
        <button
          ref={btnRef}
          onMouseEnter={() =>
            animate(btnRef.current, {
              y: 0,
              boxShadow: `0 1px 0 ${color.base}`,
              duration: 0.2,
              ease: "power2.out",
            })
          }
          onMouseDown={() => {
            onDialogChange(true);
            animate(btnRef.current, {
              y: 0,
              boxShadow: `0 -2px 0 ${color.dark}, inset 0 6px 1px ${color.dark}`,
              duration: 0.1,
              ease: "power2.out",
            });
          }}
          onMouseUp={() => {
            onDialogChange(false);
            animate(btnRef.current, {
              y: 0,
              boxShadow: `0 1px 0 ${color.dark}`,
              duration: 0.18,
              ease: "power2.out",
            });
          }}
          onMouseLeave={() => {
            onDialogChange(false);
            animate(btnRef.current, {
              y: -6,
              boxShadow: `0 6px 0 ${color.dark}`,
              duration: 0.2,
              ease: "power2.out",
            });
          }}
          className="h-12 rounded-md px-4 font-bold text-black"
          style={{
            backgroundColor: color.base,
          }}
        >
          COMMENT ME
        </button>
      </div>

      <div
        className="text- absolute top-1/2 right-3 z-0 -translate-y-1/2"
        style={{
          color: color.base,
        }}
      >
        <ArrowBigRightDash />
      </div>
    </div>
  );
}
