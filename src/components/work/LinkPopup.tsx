import { animate } from "@/shared/animate";
import gsap from "gsap";
import { X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef } from "react";

export function LinkPopup({
  data,
  onClose,
}: {
  data: { title: string; desc: string; href: string };
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const goBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useLayoutEffect(() => {
    if (!goBtnRef.current) return;
    gsap.set(goBtnRef.current, {
      boxShadow: "0 5px 0 #7A0C12",
    });
  }, []);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="absolute inset-0 z-40 flex items-center justify-center rounded-2xl bg-[#1c1c25e6]"
    >
      <div className="absolute -top-3 -right-3 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25252F]">
        <div className="overflow-hidden rounded-full">
          <button
            ref={closeBtnRef}
            onClick={onClose}
            onMouseEnter={() =>
              animate(closeBtnRef.current, {
                y: 6,
                rotation: 90,
                duration: 0.15,
              })
            }
            onMouseDown={() =>
              animate(closeBtnRef.current, { y: 10, duration: 0.15 })
            }
            onMouseUp={() =>
              animate(closeBtnRef.current, { y: 0, duration: 0.2 })
            }
            onMouseLeave={() =>
              animate(closeBtnRef.current, {
                y: 0,
                rotation: 0,
                duration: 0.2,
              })
            }
            className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500"
          >
            <X className="text-[#C1121F]" />
          </button>
        </div>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-70 max-w-md rounded-xl border border-[#25252f] bg-[#25252f] p-4 shadow-[0_0_1em_0_#000] hover:border-[rgba(196,196,196,0.7)] hover:bg-[#2d2d38] hover:outline hover:outline-[#3b3b44]"
      >
        <div className="flex items-center justify-between">
          <div className="flex w-full items-center rounded-md bg-[#101016] p-4">
            <span className="text-sm font-semibold">{data.title}</span>
          </div>
        </div>

        <div className="mt-4 mb-6 text-sm text-gray-400 normal-case">
          {data.desc}
        </div>
        <a
          ref={goBtnRef}
          href={data.href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseDown={() =>
            animate(goBtnRef.current, {
              y: 8,
              boxShadow: "0 -2px 0 #7A0C12, inset 0 5px 1px #7A0C12",
              duration: 0.15,
            })
          }
          onMouseUp={() =>
            animate(goBtnRef.current, {
              y: 4,
              boxShadow: "0 3px 0 #7A0C12",
              duration: 0.18,
            })
          }
          onMouseEnter={() =>
            animate(goBtnRef.current, {
              y: 6,
              boxShadow: "none",
              duration: 0.2,
            })
          }
          onMouseLeave={() =>
            animate(goBtnRef.current, {
              y: 0,
              boxShadow: "0 5px 0 #7A0C12",
              duration: 0.2,
            })
          }
          className="inline-flex min-h-10 w-full items-center justify-center rounded-md bg-[#C1121F] text-sm font-bold"
        >
          go!
        </a>
      </div>
    </div>
  );
}
