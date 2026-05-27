import { animate } from "@/shared/animate";
import gsap from "gsap";
import { Info, Lock } from "lucide-react";
import { useRef } from "react";

interface DoorPanelProps {
  lockSize?: number;
  btnSize?: number;
}

export function DoorPanel({ lockSize = 20, btnSize = 60 }: DoorPanelProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleOpen = () => {
    gsap
      .timeline({
        onComplete: () => {
          gsap.set(rootRef.current, { display: "none" });
        },
      })

      .to(
        [btnRef.current, infoRef.current],
        {
          scale: 0.5,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        0,
      )

      .to(
        leftDoorRef.current,
        {
          xPercent: -100,
          duration: 1,
          ease: "power3.out",
        },
        0.05,
      )
      .to(
        rightDoorRef.current,
        {
          xPercent: 100,
          duration: 1,
          ease: "power3.out",
        },
        0.05,
      )

      .to(rootRef.current, {
        opacity: 0,
        duration: 0.3,
      });
  };

  return (
    <div
      ref={rootRef}
      className="group pointer-events-auto relative h-full overflow-hidden rounded-xl transition-all duration-300 hover:px-3"
    >
      <div
        ref={leftDoorRef}
        className="absolute inset-y-0 left-0 flex w-1/2 border-r-2 border-[#101016] bg-[#1C1C25] p-4"
      >
        <div className="bg-stripe-fixed flex w-full rounded-l-md p-2 opacity-20">
          <div className="h-2 w-2 rounded-full bg-[#3B3B44]" />
        </div>
      </div>

      <div
        ref={rightDoorRef}
        className="absolute inset-y-0 right-0 flex w-1/2 justify-end border-l-2 border-[#25252f] bg-[#1C1C25] p-4"
      >
        <div className="bg-stripe-fixed flex w-full justify-end rounded-r-md p-2 opacity-20">
          <div className="h-2 w-2 rounded-full bg-[#3B3B44]" />
        </div>
      </div>

      <div
        ref={infoRef}
        className="absolute top-4 right-4 z-20 flex h-5 items-center overflow-hidden rounded-md bg-[#25252f] px-2 text-xs text-[#E5E5E5]"
      >
        <div className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:mr-2 group-hover:max-w-xs group-hover:opacity-50">
          Click to open
        </div>

        <Info size={16} className="shrink-0" />
      </div>

      <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <button
          ref={btnRef}
          onClick={handleOpen}
          onMouseEnter={(e) =>
            animate(e.currentTarget, {
              y: 6,
              boxShadow: "none",
              duration: 0.2,
            })
          }
          onMouseDown={(e) =>
            animate(e.currentTarget, {
              y: 8,
              boxShadow:
                "0 -2px 0 #101016, inset 0 1600px 1600px rgba(0,0,0,0.1)",
              duration: 0.15,
              ease: "power2.in",
            })
          }
          onMouseUp={(e) =>
            animate(e.currentTarget, {
              y: 4,
              boxShadow: "0 3px 0 #101016",
              duration: 0.18,
              ease: "power3.out",
            })
          }
          onMouseLeave={(e) =>
            animate(e.currentTarget, {
              y: 0,
              boxShadow: "0 6px 0 #101016",
              duration: 0.2,
              ease: "back.out(2)",
            })
          }
          style={{ width: btnSize, height: btnSize }}
          className="pointer-events-auto flex items-center justify-center rounded-full bg-[#1C1C25] shadow-[0_6px_0_#101016]"
        >
          <Lock size={lockSize} className="text-[#ecb233]" />
        </button>
      </div>
    </div>
  );
}
