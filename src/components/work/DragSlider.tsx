import gsap from "gsap";
import { ArrowBigRightDash } from "lucide-react";
import { useState, useRef, useLayoutEffect } from "react";

export default function DragSlider() {
  const [x, setX] = useState(0);

  const dragging = useRef(false);
  const startX = useRef(0);

  const containerRef = useRef(null);
  const handleRef = useRef(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    gsap.set(btnRef.current, {
      y: -6,
      boxShadow: "0 6px 0 #7A0C12",
    });
  }, []);

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

  const onMouseEnter = () => {
    gsap.to(btnRef.current, {
      y: 0,
      scale: 1,
      boxShadow: "0 1px 0 #7A0C12",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const onMouseLeave = () => {
    gsap.to(btnRef.current, {
      y: -6,
      scale: 1,
      boxShadow: "0 6px 0 #7A0C12",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const onBtnMouseDown = () => {
    gsap.to(btnRef.current, {
      y: 0,
      scale: 1,
      boxShadow: "inset 0 8px 2px #7A0C12",
      duration: 0.1,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative h-12 w-full overflow-visible rounded-md bg-white"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="flex h-full transition-transform duration-200"></div>
      </div>

      <div
        ref={handleRef}
        className="absolute top-0 left-0 z-10 cursor-grab active:cursor-grabbing"
        style={{ transform: `translateX(${x}px)` }}
        onMouseDown={onMouseDown}
      >
        <button
          ref={btnRef}
          onMouseDown={onBtnMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="h-12 rounded-md bg-[#C1121F] px-4 font-bold text-black"
        >
          CONTACT ME
        </button>
      </div>

      <div className="absolute top-1/2 right-3 z-0 -translate-y-1/2 text-[#C1121F]">
        <ArrowBigRightDash />
      </div>
    </div>
  );
}
