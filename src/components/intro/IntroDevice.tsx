import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

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
      boxShadow: "0 8px 0 #7A0C12",
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

  const handleMouseEnter = () => {
    gsap.to(btnRef.current, {
      y: 6,
      scale: 0.95,
      boxShadow: "0 1px 0 #7A0C12",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, {
      y: 0,
      scale: 1,
      boxShadow: "0 8px 0 #7A0C12",
      duration: 0.2,
      ease: "power2.out",
    });
  };

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

  const handleMouseDown = () => {
    gsap.to(btnRef.current, {
      y: 8,
      scale: 0.95,
      boxShadow: "inset 0 10px 4px #7A0C12",
      duration: 0.15,
      ease: "power2.out",
    });
  };

  const handleRelease = () => {
    gsap.to(btnRef.current, {
      y: 4,
      scale: 0.95,
      boxShadow: "0 3px 0 #7A0C12",
      duration: 0.2,
      ease: "back.out(2)",
    });
  };

  return (
    <div ref={rootRef} className="relative flex flex-col items-center">
      {/* spring */}
      <div className="flex flex-1 flex-col items-center select-none">
        <div className="relative flex h-40 flex-col items-center">
          <div className="absolute bottom-50 h-40 w-2.5 rounded-b-full bg-[#D9D9D9]" />

          <img src="/spring.svg" className="w-10 -translate-y-12" />
        </div>
      </div>
      {/* device */}
      <div
        ref={deviceRef}
        className="relative flex h-120 w-100 flex-col items-center justify-center rounded-2xl bg-[#D9D9D9] p-4.5 shadow-xl"
      >
        <div className="absolute -top-18 h-full w-2.5 rounded-t-full bg-[#D9D9D9]" />
        <div className="absolute -top-5 -mt-1 h-6 w-6 rounded-t-full bg-[#C1121F]" />
        {/* top screws + dots */}
        <div className="pointer-events-none absolute top-2 right-0 left-0 z-40 flex items-center justify-between px-2">
          <div className="text-gray-400">
            <svg className="h-5 w-5" viewBox="0 0 32 32" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16345 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0ZM7.65226 15.7594C7.65226 14.6548 8.54769 13.7594 9.65226 13.7594H13.9994V9.41176C13.9994 8.30719 14.8949 7.41176 15.9994 7.41176C17.104 7.41176 17.9994 8.30719 17.9994 9.41176L17.9994 13.7594H22.3475C23.452 13.7594 24.3475 14.6548 24.3475 15.7594C24.3475 16.8639 23.452 17.7594 22.3475 17.7594H17.9994V22.107C17.9994 23.2115 17.104 24.107 15.9994 24.107C14.8949 24.107 13.9994 23.2115 13.9994 22.107V17.7594L9.65226 17.7594C8.54769 17.7594 7.65226 16.8639 7.65226 15.7594Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div
            className="z-40 h-5 w-40 translate-x-11 bg-[#C1121F]"
            style={{
              WebkitMaskImage: "url(/device-dots.png)",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskImage: "url(/device-dots.png)",
              maskRepeat: "no-repeat",
              maskSize: "contain",
            }}
          />

          <div className="text-gray-400">
            <svg className="h-5 w-5" viewBox="0 0 32 32" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16345 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0ZM7.65226 15.7594C7.65226 14.6548 8.54769 13.7594 9.65226 13.7594H13.9994V9.41176C13.9994 8.30719 14.8949 7.41176 15.9994 7.41176C17.104 7.41176 17.9994 8.30719 17.9994 9.41176L17.9994 13.7594H22.3475C23.452 13.7594 24.3475 14.6548 24.3475 15.7594C24.3475 16.8639 23.452 17.7594 22.3475 17.7594H17.9994V22.107C17.9994 23.2115 17.104 24.107 15.9994 24.107C14.8949 24.107 13.9994 23.2115 13.9994 22.107V17.7594L9.65226 17.7594C8.54769 17.7594 7.65226 16.8639 7.65226 15.7594Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* screen */}
        <div className="absolute top-10 right-6 left-6 h-[60%] overflow-hidden rounded-md bg-[#1C1C1C] text-[#EAEAEA]">
          <div
            ref={textScreenRef}
            className="h-full rounded-lg bg-[#1C1C1C] p-4"
          >
            <div className="mt-8 rounded-lg bg-[#2A2A2A] p-[1.0em] tracking-[0.08em] text-[#BFBFBF] uppercase">
              <div className="relative overflow-hidden rounded-md bg-[#3A3A3A] p-[1.5em]">
                <div>
                  <h1
                    ref={headingRef}
                    className="mb-1 text-[2.2em] font-black tracking-normal normal-case"
                  >
                    I&apos;m Hani
                  </h1>

                  <div ref={descRef} className="text-[0.7vw] font-bold">
                    I am a web backend developer. Thank you for viewing my
                    portfolio.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* texture */}
          <div className="pointer-events-none absolute inset-0 z-20">
            <img
              src="/glass-texture.jpg"
              className="h-full w-full object-cover opacity-30"
            />
          </div>

          {/* crack */}
          <img
            ref={crackRef}
            src="/crack-404.png"
            className="pointer-events-none absolute inset-0 z-30 h-full w-full object-cover opacity-0"
          />
        </div>

        {/* button */}
        <div className="absolute bottom-12 flex h-24 w-24 items-center justify-center overflow-visible rounded-full bg-[#c1c1c1]">
          <button
            ref={btnRef}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleRelease}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#C1121F]"
          >
            <img src="/start.svg" alt="ON button icon" className="h-6 w-6" />
          </button>
          <img
            ref={clickRef}
            src="/click.svg"
            className="pointer-events-none absolute top-1/2 left-1/2 z-20 w-60 max-w-none -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {/* bottom screw */}
        <div className="pointer-events-none absolute right-0 bottom-2 left-0 z-40 flex items-center justify-between px-2">
          <div className="text-gray-400">
            <svg className="h-5 w-5" viewBox="0 0 32 32" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16345 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0ZM7.65226 15.7594C7.65226 14.6548 8.54769 13.7594 9.65226 13.7594H13.9994V9.41176C13.9994 8.30719 14.8949 7.41176 15.9994 7.41176C17.104 7.41176 17.9994 8.30719 17.9994 9.41176L17.9994 13.7594H22.3475C23.452 13.7594 24.3475 14.6548 24.3475 15.7594C24.3475 16.8639 23.452 17.7594 22.3475 17.7594H17.9994V22.107C17.9994 23.2115 17.104 24.107 15.9994 24.107C14.8949 24.107 13.9994 23.2115 13.9994 22.107V17.7594L9.65226 17.7594C8.54769 17.7594 7.65226 16.8639 7.65226 15.7594Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div
            className="z-40 h-5 w-40 translate-x-12 bg-[#C1121F]"
            style={{
              WebkitMaskImage: "url(/device-dots.png)",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskImage: "url(/device-dots.png)",
              maskRepeat: "no-repeat",
              maskSize: "contain",
            }}
          />

          <div className="text-gray-400">
            <svg className="h-5 w-5" viewBox="0 0 32 32" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16345 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0ZM7.65226 15.7594C7.65226 14.6548 8.54769 13.7594 9.65226 13.7594H13.9994V9.41176C13.9994 8.30719 14.8949 7.41176 15.9994 7.41176C17.104 7.41176 17.9994 8.30719 17.9994 9.41176L17.9994 13.7594H22.3475C23.452 13.7594 24.3475 14.6548 24.3475 15.7594C24.3475 16.8639 23.452 17.7594 22.3475 17.7594H17.9994V22.107C17.9994 23.2115 17.104 24.107 15.9994 24.107C14.8949 24.107 13.9994 23.2115 13.9994 22.107V17.7594L9.65226 17.7594C8.54769 17.7594 7.65226 16.8639 7.65226 15.7594Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
