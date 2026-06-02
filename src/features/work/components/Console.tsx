import { useCustomizerStore } from "@/features/work/stores/useCustomizerStore";

type Props = {
  leftPupilRef?: React.RefObject<HTMLDivElement | null>;
  rightPupilRef?: React.RefObject<HTMLDivElement | null>;
};

export function Console({ leftPupilRef, rightPupilRef }: Props) {
  const color = useCustomizerStore((s) => s.color);
  return (
    <>
      <img
        src={`/characters/console/console-${color.name}.png`}
        className="h-full w-full object-contain"
      />

      <div className="pointer-events-none absolute inset-0 top-13 left-27 w-25">
        <img src="/characters/hardDisk/hardDisk-eya.png" />

        <svg
          className="absolute inset-0"
          viewBox="0 0 400 250"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
        <div ref={leftPupilRef} className="absolute top-8 left-3">
          <img src="/characters/gameboy/gameboy-pupil.svg" className="w-10" />
        </div>

        <div ref={rightPupilRef} className="absolute top-8 left-10">
          <img src="/characters/gameboy/gameboy-pupil.svg" className="w-10" />
        </div>
      </div>
    </>
  );
}
