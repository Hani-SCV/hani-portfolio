import { Info, Lock, PanelsTopLeft } from "lucide-react";
import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { LinkPopup } from "./LinkPopup";

const projects = [
  {
    icon: "/web-backend.svg",
    title: "웹 백엔드 가이드",
    desc: "Notion API, Docusaurus, Netlify를 기반으로 한 웹 백엔드 가이드입니다.",
  },
  {
    icon: "/chrome-popup.png",
    title: "크롬 확장 프로그램",
    desc: "크롬에서 작은 모바일 형태의 팝업 창으로 웹사이트를 빠르게 열 수 있는 확장 프로그램입니다.",
  },
  {
    icon: "/erp.png",
    title: "유치원 ERP",
    desc: "유치원 관리에 필요한 전사적 자원관리,물적 자원을 효율적으로 관리 하여 경쟁력을 강화시켜주는 통합관리시스템.",
  },
  {
    icon: "/todo.png",
    title: "Todo",
    desc: "Node.js, Express, MongoDB를 기반으로 한 간단한 TO-DO 프로젝트.",
  },
  {
    icon: "/portfolio.png",
    title: "포트폴리오",
    desc: "React, Tailwind CSS, GSAP 기반 인터랙티브 포트폴리오",
  },
];

function RightPanel() {
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const removedSet = useRef(new Set<number>());

  const animate = (el: HTMLElement | null, vars: gsap.TweenVars) => {
    if (!el) return;
    gsap.to(el, vars);
  };

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    gsap.set(containerRef.current.querySelectorAll(".project-btn"), {
      boxShadow: "0 8px 0 #101016",
    });
  }, []);

  const handleBtn = (
    type: "down" | "up" | "enter" | "leave",
    el: HTMLElement,
  ) => {
    const map = {
      down: {
        y: 8,
        boxShadow: "0 -1px 0 #101016, inset 0 10px 1px #101016",
        duration: 0.15,
      },
      up: { y: 4, boxShadow: "0 3px 0 #101016", duration: 0.2 },
      enter: { y: 6, boxShadow: "none", duration: 0.2 },
      leave: { y: 0, boxShadow: "0 8px 0 #101016", duration: 0.2 },
    };
    animate(el, map[type]);
  };

  const handleScrewClick = (index: number, el: HTMLElement) => {
    if (removedSet.current.has(index)) return;

    removedSet.current.add(index);

    gsap
      .timeline({
        onComplete: () => {
          if (removedSet.current.size === 4) {
            gsap
              .timeline()
              .to(rootRef.current, {
                y: 100,
                rotation: 10,
                opacity: 0,
                duration: 0.4,
              })
              .to(
                nextRef.current,
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.4,
                },
                "-=0.2",
              );
          }
        },
      })
      .to(el, { rotation: 180, duration: 0.3 })
      .to(el, { y: 100, opacity: 0, duration: 0.4 });
  };

  const handleScrewHover = (el: HTMLElement, enter: boolean) => {
    animate(el, {
      color: enter ? "#c4c4c4" : "#51515D",
      duration: 0.2,
    });
  };

  return (
    <div className="flex h-full flex-col gap-4 p-3">
      {selected && (
        <LinkPopup data={selected} onClose={() => setSelected(null)} />
      )}

      <div className="flex h-20 items-center rounded-xl bg-[#1C1C25] px-4">
        <PanelsTopLeft />
        <div className="flex items-center justify-center pl-12">
          SIDE PROJECTS
        </div>
      </div>

      <div ref={containerRef} className="grid flex-1 grid-cols-2 gap-4">
        {projects.map((item, i) => (
          <div
            key={i}
            className="relative aspect-square rounded-xl bg-[#1C1C25]"
          >
            <div className="absolute top-2 left-2 h-2 w-2 rounded-full bg-[#3B3B44]" />
            <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#3B3B44]" />
            <button
              className="project-btn absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#25252F]"
              onClick={() => setSelected(item)}
              onMouseDown={(e) => handleBtn("down", e.currentTarget)}
              onMouseUp={(e) => handleBtn("up", e.currentTarget)}
              onMouseEnter={(e) => handleBtn("enter", e.currentTarget)}
              onMouseLeave={(e) => handleBtn("leave", e.currentTarget)}
            >
              <img
                src={item.icon}
                className="absolute top-1/2 left-1/2 w-10 -translate-x-1/2 -translate-y-1/2"
              />
            </button>
            <div className="absolute bottom-2 left-2 h-2 w-2 rounded-full bg-[#3B3B44]" />
            <div className="absolute right-2 bottom-2 h-2 w-2 rounded-full bg-[#3B3B44]" />
          </div>
        ))}
      </div>

      <div className="relative">
        <div
          ref={nextRef}
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-[#1C1C25] opacity-0"
        >
          <div className="w-full max-w-lg pt-2 text-center">
            <div className="text-lg">Stack</div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { src: "/stack-icon/vite-icon.png", label: "Vite" },
                { src: "/stack-icon/ts-icon.png", label: "Ts" },
                { src: "/stack-icon/react-icon.png", label: "React" },
                { src: "/stack-icon/gsap-icon.png", label: "Gsap" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <div className="flex h-10 w-10 items-center justify-center">
                    <img
                      src={item.src}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div ref={rootRef} className="relative h-50 rounded-xl bg-[#1C1C25]">
          <img
            src="/sound-dots.svg"
            className="absolute top-1/2 left-1/2 w-30 -translate-x-1/2 -translate-y-1/2"
          />
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              onClick={(e) => handleScrewClick(i, e.currentTarget)}
              onMouseEnter={(e) => handleScrewHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleScrewHover(e.currentTarget, false)}
              className={`absolute cursor-pointer text-[#51515D] ${i === 0 && "top-2 left-2"} ${i === 1 && "top-2 right-2"} ${i === 2 && "bottom-2 left-2"} ${i === 3 && "right-2 bottom-2"} `}
            >
              <svg className="h-5 w-5" viewBox="0 0 32 32" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16345 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0ZM7.65226 15.7594C7.65226 14.6548 8.54769 13.7594 9.65226 13.7594H13.9994V9.41176C13.9994 8.30719 14.8949 7.41176 15.9994 7.41176C17.104 7.41176 17.9994 8.30719 17.9994 9.41176L17.9994 13.7594H22.3475C23.452 13.7594 24.3475 14.6548 24.3475 15.7594C24.3475 16.8639 23.452 17.7594 22.3475 17.7594H17.9994V22.107C17.9994 23.2115 17.104 24.107 15.9994 24.107C14.8949 24.107 13.9994 23.2115 13.9994 22.107V17.7594L9.65226 17.7594C8.54769 17.7594 7.65226 16.8639 7.65226 15.7594Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DoorPanel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftDoorRef = useRef<HTMLDivElement>(null);
  const rightDoorRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const animate = (el: HTMLElement, vars: gsap.TweenVars) => {
    gsap.to(el, vars);
  };

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
    <div ref={rootRef} className="relative h-full overflow-hidden rounded-2xl">
      <div
        ref={leftDoorRef}
        className="absolute inset-y-0 left-0 flex w-1/2 border-r-2 border-[#101016] bg-[#1C1C25] p-4"
      >
        <div
          className="flex w-full rounded-l-md p-2 opacity-20"
          style={{
            background:
              "repeating-linear-gradient(45deg, #e5e5e5 0, #e5e5e5 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
          }}
        >
          <div className="h-2 w-2 rounded-full bg-[#3B3B44]" />
        </div>
      </div>

      <div
        ref={rightDoorRef}
        className="absolute inset-y-0 right-0 flex w-1/2 justify-end border-l-2 border-[#25252f] bg-[#1C1C25] p-4"
      >
        <div
          className="flex w-full justify-end rounded-r-md p-2 opacity-20"
          style={{
            background:
              "repeating-linear-gradient(45deg, #e5e5e5 0, #e5e5e5 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
          }}
        >
          <div className="h-2 w-2 rounded-full bg-[#3B3B44]" />
        </div>
      </div>

      <div
        ref={infoRef}
        className="absolute top-4 right-4 z-20 flex h-10 items-center overflow-hidden rounded-md bg-[#25252f] px-3 text-xs text-[#E5E5E5]"
      >
        <div className="mr-2 whitespace-nowrap opacity-50">Click to open</div>

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
          className="pointer-events-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#1C1C25] shadow-[0_6px_0_#101016]"
        >
          <Lock size={28} className="text-[#ecb233]" />
        </button>
      </div>
    </div>
  );
}

export function RightSection() {
  return (
    <div className="relative rounded-2xl border border-[#25252f] bg-[#25252f] shadow-[0_0_16px_#101016] hover:border-[rgba(196,196,196,0.7)]">
      <RightPanel />

      <div className="pointer-events-none absolute inset-0 z-10">
        <DoorPanel />
      </div>
    </div>
  );
}
