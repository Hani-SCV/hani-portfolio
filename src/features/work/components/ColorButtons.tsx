import gsap from "gsap";
import { useRef } from "react";

import { useCustomizerStore } from "@/features/work/stores/useCustomizerStore";
import { animate } from "@/shared/utils/animate";

const colors = [
  { name: "red", base: "#C1121F", dark: "#7A0C12" },
  { name: "purple", base: "#7C3AED", dark: "#4C1D95" },
  { name: "yellow", base: "#EAB308", dark: "#92400E" },
  { name: "gray", base: "#6B7280", dark: "#374151" },
];

type RoundButtonProps = {
  name: string;
  base: string;
  dark: string;
};

function RoundButton({ name, base, dark }: RoundButtonProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const setColor = useCustomizerStore((s) => s.setColor);
  const leftPanelRef = useCustomizerStore((s) => s.leftPanelRef);

  const playSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/colorBtn.mp3");
      audioRef.current.volume = 1;
    }

    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const handleClick = () => {
    setColor({
      name,
      base,
      dark,
    });

    if (leftPanelRef) {
      gsap.killTweensOf(leftPanelRef);

      gsap
        .timeline()
        .to(leftPanelRef, {
          y: -12,
          duration: 0.12,
          ease: "power2.out",
        })
        .to(leftPanelRef, {
          y: 0,
          duration: 0.45,
          ease: "elastic.out(1, 0.4)",
        });
    }
  };

  return (
    <div className="flex h-14 w-14 items-center justify-center overflow-visible rounded-full bg-[#1C1C25]">
      <div className="overflow-hidden rounded-full bg-[#101016]">
        <button
          onClick={handleClick}
          onMouseEnter={(e) =>
            animate(e.currentTarget, {
              y: 6,
              rotation: 90,
              duration: 0.15,
              ease: "power2.in",
            })
          }
          onMouseDown={(e) => {
            playSound();
            animate(e.currentTarget, {
              y: 10,
              duration: 0.15,
              ease: "power2.in",
            });
          }}
          onMouseUp={(e) =>
            animate(e.currentTarget, {
              y: 0,
              boxShadow: "none",
              duration: 0.2,
              ease: "back.out(2)",
            })
          }
          onMouseLeave={(e) =>
            animate(e.currentTarget, {
              y: 0,
              rotation: 0,
              boxShadow: "none",
              duration: 0.2,
            })
          }
          className="relative flex h-10 w-10 items-center justify-center rounded-full"
          style={{
            backgroundColor: base,
          }}
        >
          <div
            className="h-1 w-1/2 rounded"
            style={{ backgroundColor: dark }}
          />
        </button>
      </div>
    </div>
  );
}

export function ColorButtons() {
  return (
    <div className="flex w-full flex-col items-center gap-5 py-4">
      <div className="flex">
        {colors.slice(0, 2).map((c) => (
          <div key={c.name} className="mx-2">
            <RoundButton name={c.name} base={c.base} dark={c.dark} />
          </div>
        ))}
      </div>

      <div className="mt-2 flex">
        {colors.slice(2).map((c) => (
          <div key={c.name} className="mx-2">
            <RoundButton name={c.name} base={c.base} dark={c.dark} />
          </div>
        ))}
      </div>
    </div>
  );
}
