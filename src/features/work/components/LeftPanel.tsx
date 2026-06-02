import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { DragSlider } from "./DragSlider";
import { Settings } from "lucide-react";
import { BarChart3 } from "lucide-react";
import { Toggle } from "@/shared/ui/Toggle";

import { useState } from "react";
import { Gameboy } from "./Gameboy";
import { HardDisk } from "./HardDisk";
import { Console } from "./Console";
import { SlideDialog } from "./SlideDialog";
import { ContactPopup } from "./ContactPopup";
import { useCustomizerStore } from "@/features/work/stores/useCustomizerStore";
type ToggleListProps = {
  selected: number;
  onSelect: (index: number) => void;
};

const JOBS = ["GameBoy", "Hard Disk", "Console"];

function ToggleList({ selected, onSelect }: ToggleListProps) {
  return (
    <>
      {JOBS.map((text, i) => (
        <div
          key={text}
          className="flex h-20 cursor-pointer items-center justify-between rounded-lg bg-[#D9D9D9] px-3 py-2 hover:bg-[#CFCFCF]"
          onClick={() => onSelect(i)}
        >
          <div className="flex items-center gap-3">
            <Toggle active={selected === i} />
            <div className="text-sm text-[#3A3A3A]">{text}</div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-2 w-2 rounded-full bg-gray-400" />
            <div className="h-2 w-2 rounded-full bg-gray-400" />
          </div>
        </div>
      ))}
    </>
  );
}

export function LeftPanel() {
  const [selected, setSelected] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [sliderResetTrigger, setSliderResetTrigger] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);

  const color = useCustomizerStore((s) => s.color);
  const setLeftPanelRef = useCustomizerStore((s) => s.setLeftPanelRef);

  useEffect(() => {
    setLeftPanelRef(ref.current);
  }, [setLeftPanelRef]);

  const BASE_LEFT_X = 3;
  const BASE_RIGHT_X = 3;

  useLayoutEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const moveX = x * 8;
    const moveY = y * 8;

    gsap.to(leftPupilRef.current, {
      x: BASE_LEFT_X + moveX,
      y: moveY,
      duration: 0.2,
      ease: "power2.out",
    });

    gsap.to(rightPupilRef.current, {
      x: BASE_RIGHT_X + moveX,
      y: moveY,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to([leftPupilRef.current, rightPupilRef.current], {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleClosePopup = () => {
    setOpenContact(false);
    setSliderResetTrigger((prev) => prev + 1);
  };

  const renderCharacter = () => {
    switch (selected) {
      case 0:
        return (
          <Gameboy leftPupilRef={leftPupilRef} rightPupilRef={rightPupilRef} />
        );

      case 1:
        return (
          <HardDisk leftPupilRef={leftPupilRef} rightPupilRef={rightPupilRef} />
        );

      case 2:
        return (
          <Console leftPupilRef={leftPupilRef} rightPupilRef={rightPupilRef} />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div
        ref={ref}
        className="flex flex-col gap-4 rounded-2xl bg-[#D9D9D9] p-4 pb-0"
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <BarChart3
                className="h-5 w-8"
                style={{
                  color: color.base,
                }}
              />
            </div>

            <div className="text-xs font-bold tracking-wider text-[#3A3A3A] uppercase">
              Hani Dev
            </div>
          </div>

          <div className="flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-[#2F3E77]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#2F3E77]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#2F3E77]" />
          </div>
        </div>

        <div className="mt-0.5 h-0.5 w-full bg-[#2F3E77]" />

        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex h-60 items-center justify-center overflow-hidden rounded-xl bg-[#1C1C1C]"
        >
          <img
            src="/textures/glass-texture.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />

          <div className="relative z-10">
            {renderCharacter()}

            <div className="animated-grain absolute inset-0 z-10" />
          </div>
          {showDialog && (
            <SlideDialog className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2" />
          )}
        </div>

        <div className="rounded-lg bg-[#c1c1c1] px-3 py-3">
          <DragSlider
            resetTrigger={sliderResetTrigger}
            onDialogChange={setShowDialog}
            onComplete={() => setOpenContact(true)}
          />
        </div>

        <div className="flex flex-col gap-3 rounded-lg bg-[#c1c1c1] p-3">
          <div className="mb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings
                  className="h-6 w-6 opacity-40"
                  style={{
                    color: color.base,
                  }}
                />

                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold whitespace-nowrap text-[#3A3A3A]">
                    Customizer
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ToggleList selected={selected} onSelect={setSelected} />
        </div>

        <div
          className="mt-auto flex h-12 w-full items-center justify-end rounded-t-lg px-4"
          style={{
            backgroundColor: color.base,
          }}
        >
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-[#BFBFBF]" />
            <div className="h-2 w-2 rounded-full bg-[#BFBFBF]" />
          </div>
        </div>
      </div>
      <ContactPopup open={openContact} onClose={handleClosePopup} />
    </>
  );
}
