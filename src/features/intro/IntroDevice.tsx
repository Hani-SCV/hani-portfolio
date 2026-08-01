import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

import { DeviceDots } from "@/shared/ui/DeviceDots";
import { DeviceScrew } from "@/shared/ui/DeviceScrew";
import { animate } from "@/shared/utils/gsap";

type Props = {
  onComplete: () => void;
};

export function IntroDevice({ onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const clickRef = useRef<HTMLImageElement>(null);
  const crackRef = useRef<HTMLImageElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const textScreenRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline();

    gsap.set(rootRef.current, { y: -160 });
    gsap.set(headingRef.current, { y: 30, opacity: 0 });
    gsap.set(descRef.current, { y: 30, opacity: 0 });
    gsap.set(btnRef.current, {
      boxShadow: "0 8px 0 var(--color-primary-dark)",
    });

    gsap.set(clickRef.current, {
      y: 30,
      opacity: 0,
      xPercent: -50,
      yPercent: -50,
    });

    tl.to(rootRef.current, {
      y: 40,
      duration: 0.6,
      ease: "power2.out",
    })
      .to(rootRef.current, {
        y: -10,
        duration: 0.6,
        ease: "power2.inOut",
      })
      .to(rootRef.current, {
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(
        headingRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power3.out",
        },
        "-=0.2",
      )
      .to(
        descRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.1",
      )
      .to(
        clickRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2",
      );
  }, []);

  const handleClick = () => {
    const tl = gsap.timeline({
      onComplete,
    });

    tl.to(deviceRef.current, {
      y: 150,
      rotation: 2,
      duration: 0.6,
      ease: "power2.in",
    })
      // 바닥 충격 (살짝 튕김)
      .to(deviceRef.current, {
        y: 130,
        duration: 0.2,
        ease: "power2.out",
      })
      .to(
        textScreenRef.current,
        {
          opacity: 0,
          scale: 1,
          duration: 0.1,
        },
        "<",
      )
      // 스크린 crack 주기
      .to(
        crackRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.1,
        },
        "<",
      )
      // 전체 페이드 아웃
      .to(
        rootRef.current,
        {
          opacity: 0,
          duration: 0.4,
        },
        "+=0.5",
      );
  };

  return (
    <div ref={rootRef} className="relative flex flex-col items-center">
      <div className="flex flex-1 flex-col items-center select-none">
        <div className="relative flex h-40 flex-col items-center">
          <div className="bg-panel absolute bottom-50 h-40 w-2.5 rounded-b-full" />

          <img src="/device/spring.svg" className="w-10 -translate-y-12" />
        </div>
      </div>
      <div
        ref={deviceRef}
        className="bg-panel relative flex h-120 w-100 flex-col items-center justify-center rounded-2xl p-4.5 shadow-xl"
      >
        <div className="bg-panel absolute -top-18 h-full w-2.5 rounded-t-full" />
        <div className="bg-primary absolute -top-5 -mt-1 h-6 w-6 rounded-t-full" />
        <div className="pointer-events-none absolute top-2 right-0 left-0 z-40 flex items-center justify-between px-2">
          <DeviceScrew />
          <DeviceDots className="translate-x-11" />
          <DeviceScrew />
        </div>

        <div className="bg-screen absolute top-10 right-6 left-6 h-[60%] overflow-hidden rounded-md text-[#EAEAEA]">
          <div ref={textScreenRef} className="bg-screen h-full rounded-lg p-4">
            <div className="mt-8 rounded-lg bg-[#2A2A2A] p-4 tracking-widest text-[#BFBFBF] uppercase">
              <div className="relative overflow-hidden rounded-md bg-[#3A3A3A] p-[1.5em]">
                <div>
                  <h1
                    ref={headingRef}
                    className="mb-1 text-[2.2em] font-black tracking-normal normal-case"
                  >
                    I&apos;m Hani
                  </h1>

                  <div ref={descRef} className="text-[0.7vw] font-bold">
                    웹 백엔드 개발자 김하니입니다. 저의 포트폴리오를 찾아주셔서
                    감사합니다.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-20">
            <img
              src="/textures/glass-texture.jpg"
              className="h-full w-full object-cover opacity-30"
            />
          </div>

          <img
            ref={crackRef}
            src="/device/crack-404.png"
            className="pointer-events-none absolute inset-0 z-30 h-full w-full object-cover opacity-0"
          />
        </div>

        <div className="bg-panel-dark absolute bottom-12 flex h-24 w-24 items-center justify-center overflow-visible rounded-full">
          <button
            ref={btnRef}
            onClick={handleClick}
            onMouseEnter={() =>
              animate(btnRef.current, {
                y: 6,
                scale: 0.95,
                boxShadow: "0 1px 0 var(--color-primary-dark)",
                duration: 0.2,
                ease: "power2.out",
              })
            }
            onMouseDown={() =>
              animate(btnRef.current, {
                y: 8,
                scale: 0.95,
                boxShadow: "inset 0 10px 4px var(--color-primary-dark)",
                duration: 0.15,
                ease: "power2.out",
              })
            }
            onMouseUp={() =>
              animate(btnRef.current, {
                y: 4,
                scale: 0.95,
                boxShadow: "0 3px 0 var(--color-primary-dark)",
                duration: 0.2,
                ease: "back.out(2)",
              })
            }
            onMouseLeave={() =>
              animate(btnRef.current, {
                y: 0,
                scale: 1,
                boxShadow: "0 8px 0 var(--color-primary-dark)",
                duration: 0.2,
                ease: "power2.out",
              })
            }
            className="bg-primary relative z-10 flex h-16 w-16 items-center justify-center rounded-full"
          >
            <img
              src="/device/start.svg"
              alt="ON button icon"
              className="h-6 w-6"
            />
          </button>
          <img
            ref={clickRef}
            src="/device/click.svg"
            className="pointer-events-none absolute top-1/2 left-1/2 z-20 w-60 max-w-none -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <div className="pointer-events-none absolute right-0 bottom-2 left-0 z-40 flex items-center justify-between px-2">
          <DeviceScrew />
          <DeviceDots className="translate-x-12" />
          <DeviceScrew />
        </div>
      </div>
    </div>
  );
}
