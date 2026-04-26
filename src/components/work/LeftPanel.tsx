import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import DragSlider from "./DragSlider";
import { Settings } from "lucide-react";
import { BarChart3 } from "lucide-react";
import { Toggle } from "@/shared/Toggle";

import { useState } from "react";

const JOBS = ["Graphic & Webdesigner", "Motion Designer", "Webflow Expert"];

export default function ToggleList() {
  const [selected, setSelected] = useState(0);

  return (
    <>
      {JOBS.map((text, i) => (
        <div
          key={text}
          className="flex h-20 items-center justify-between rounded-lg bg-[#D9D9D9] px-3 py-2"
          onClick={() => setSelected(i)} // 카드 클릭도 선택되게
        >
          <div className="flex items-center gap-3">
            <Toggle active={selected === i} />
            <div className="text-sm text-[#3A3A3A]">{text}</div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-2 w-2 rounded-full bg-[#2F3E77]" />
            <div className="h-2 w-2 rounded-full bg-[#2F3E77]" />
          </div>
        </div>
      ))}
    </>
  );
}
export function LeftPanel() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
    );
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-4 rounded-2xl bg-[#D9D9D9] p-4 pb-0"
    >
      <div className="flex w-full items-center justify-between">
        {/* left: logo + name */}
        <div className="flex items-center gap-2">
          {/* logo */}
          <div>
            <BarChart3 className="h-5 w-8 text-[#C1121F]" />
          </div>

          {/* name */}
          <div className="text-xs font-bold tracking-wider text-[#3A3A3A] uppercase">
            Hani Dev
          </div>
        </div>

        {/* right: dots */}
        <div className="flex items-center gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-[#2F3E77]" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#2F3E77]" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#2F3E77]" />
        </div>
      </div>
      <div className="mt-0.5 h-0.5 w-full bg-[#2F3E77]" />
      {/* profile */}
      <div className="relative flex h-60 items-center justify-center overflow-hidden rounded-xl bg-[#1C1C1C]">
        {/* 배경 */}
        <img
          src="/glass-texture.jpg"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />

        {/* 캐릭터 */}
        {/* <img src="/testImg.png" className="relative z-10" /> */}
      </div>

      {/* contact */}
      <DragSlider />

      <div className="flex flex-col gap-3 bg-[#c1c1c1] p-3">
        <div className="mb-2">
          {/* title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* icon */}
              <Settings className="h-6 w-6 text-[#2F3E77] opacity-40" />

              {/* title */}
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold whitespace-nowrap text-[#3A3A3A]">
                  Customizer
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToggleList />
      </div>
      <div className="mt-auto flex h-12 w-full items-center justify-end rounded-t-lg bg-[#3A3A3A] px-4">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-[#BFBFBF]" />
          <div className="h-2 w-2 rounded-full bg-[#BFBFBF]" />
        </div>
      </div>
    </div>
  );
}
