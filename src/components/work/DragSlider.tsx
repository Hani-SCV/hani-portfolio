import { ArrowBigRightDash } from "lucide-react";
import { useState, useRef } from "react";

export default function DragSlider() {
  const [x, setX] = useState(0);

  const dragging = useRef(false);
  const startX = useRef(0);

  const containerRef = useRef(null);
  const handleRef = useRef(null);

  const onMouseDown = (e) => {
    dragging.current = true;
    startX.current = e.clientX - x;
  };

  const onMouseMove = (e) => {
    if (!dragging.current) return;

    const container = containerRef.current;
    const handle = handleRef.current;
    if (!container || !handle) return;

    const containerWidth = container.offsetWidth;
    const handleWidth = handle.offsetWidth;

    let nextX = e.clientX - startX.current;

    // clamp
    const max = containerWidth - handleWidth;
    if (nextX < 0) nextX = 0;
    if (nextX > max) nextX = max;

    setX(nextX);
  };

  const onMouseUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative h-15 w-full overflow-hidden bg-[#c1c1c1]"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="flex h-full transition-transform duration-200"></div>
      </div>

      <div
        ref={handleRef}
        className="absolute top-0 left-0 h-full cursor-grab active:cursor-grabbing"
        style={{ transform: `translateX(${x}px)` }}
        onMouseDown={onMouseDown}
      >
        <button className="h-full rounded-md bg-[#C1121F] px-4 font-bold text-black">
          CONTACT ME
        </button>
      </div>

      <div className="absolute top-1/2 right-3 -translate-y-1/2 text-[#C1121F]">
        <ArrowBigRightDash />
      </div>
    </div>
  );
}
