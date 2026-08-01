import { useCustomizerStore } from "@/features/work/stores/useCustomizerStore";

type Props = {
  leftPupilRef?: React.RefObject<HTMLDivElement | null>;
  rightPupilRef?: React.RefObject<HTMLDivElement | null>;
};

export function HardDisk({ leftPupilRef, rightPupilRef }: Props) {
  const colorName = useCustomizerStore((s) => s.color.name);
  return (
    <>
      <img
        src={`/characters/hardDisk/hardDisk-${colorName}.png`}
        className="h-full w-full object-contain"
      />

      <div className="pointer-events-none absolute inset-0 top-19 left-28 w-20">
        <img src="/characters/hardDisk/hardDisk-eye.png" />

        <svg
          className="absolute inset-0"
          viewBox="0 0 400 250"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
        <div ref={leftPupilRef} className="absolute top-5 left-2">
          <img src="/characters/gameboy/gameboy-pupil.svg" className="w-10" />
        </div>

        <div ref={rightPupilRef} className="absolute top-5 left-7">
          <img src="/characters/gameboy/gameboy-pupil.svg" className="w-10" />
        </div>
      </div>
    </>
  );
}
