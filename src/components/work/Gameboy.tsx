type Props = {
  leftPupilRef?: React.RefObject<HTMLDivElement | null>;
  rightPupilRef?: React.RefObject<HTMLDivElement | null>;
};

export function Gameboy({ leftPupilRef, rightPupilRef }: Props) {
  return (
    <>
      <img
        src="/characters/gameboy/gameboy.png"
        className="h-full w-full object-contain"
      />

      <div className="pointer-events-none absolute top-38 left-37 -translate-x-1/2 -translate-y-1/2">
        <svg
          width="160"
          height="90"
          viewBox="0 0 160 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-13"
        >
          <ellipse
            cx="55"
            cy="55"
            rx="24"
            ry="34"
            fill="white"
            stroke="black"
            strokeWidth="6"
            transform="rotate(-15 55 45)"
          />

          <ellipse
            cx="105"
            cy="45"
            rx="24"
            ry="34"
            fill="white"
            stroke="black"
            strokeWidth="6"
            transform="rotate(-15 105 45)"
          />
        </svg>

        <div ref={leftPupilRef} className="absolute top-9 left-0">
          <img src="/characters/gameboy/gameboy-pupil.svg" className="w-8" />
        </div>

        <div ref={rightPupilRef} className="absolute top-8 left-4">
          <img src="/characters/gameboy/gameboy-pupil.svg" className="w-8" />
        </div>
      </div>
    </>
  );
}
