import gsap from "gsap";
import { ArrowLeft, ArrowRight, Image, X } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { ColorButtons } from "./ColorButtons";
import { DoorPanel } from "./DoorPanel";

type GithubCardProps = {
  btnRef: React.RefObject<HTMLButtonElement | null>;
  onClick: () => void;
};

const fastAnimate = (el: HTMLElement | null, vars: gsap.TweenVars) => {
  if (!el) return;
  gsap.to(el, vars);
};

function Screws() {
  return (
    <>
      <div className="absolute top-2 left-2 h-2 w-2 rounded-full bg-[#3B3B44]" />
      <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#3B3B44]" />
      <div className="absolute bottom-2 left-2 h-2 w-2 rounded-full bg-[#3B3B44]" />
      <div className="absolute right-2 bottom-2 h-2 w-2 rounded-full bg-[#3B3B44]" />
    </>
  );
}

function SectionWrapper({
  children,
  className = "",
  hasDoor = true,
}: {
  children: React.ReactNode;
  className?: string;
  hasDoor?: boolean;
}) {
  return (
    <div
      className={`relative rounded-xl border border-[#25252f] bg-[#25252f] shadow-[0_0_16px_#101016] hover:border-[rgba(196,196,196,0.7)] ${className}`}
    >
      <Screws />
      {children}
      {hasDoor && (
        <div className="pointer-events-none absolute inset-0 z-10">
          <DoorPanel lockSize={17} btnSize={50} />
        </div>
      )}
    </div>
  );
}

function ColorButtenSection() {
  return (
    <SectionWrapper className="h-44">
      <ColorButtons />
    </SectionWrapper>
  );
}

function GithubSection() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <SectionWrapper className="flex h-44 flex-col items-center justify-center gap-6">
      {open ? (
        <GithubPopup onClose={() => setOpen(false)} />
      ) : (
        <GithubCard btnRef={btnRef} onClick={() => setOpen(true)} />
      )}
    </SectionWrapper>
  );
}

function GithubPopup({ onClose }: { onClose: () => void }) {
  const goBtnRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    if (!goBtnRef.current) return;

    gsap.set(goBtnRef.current, {
      boxShadow: "0 6px 0 #7A0C12",
    });
  }, []);

  return (
    <>
      <div className="flex items-center justify-center rounded-xl bg-[#1C1C25]">
        <div className="flex w-full max-w-md flex-col items-center gap-6">
          <div className="w-full rounded-xl bg-[#1C1C25] p-6">
            <div className="flex h-6 w-50 flex-col items-center justify-center gap-2">
              <img src="/gitHub.png" className="w-10 pt-9" />
              <div className="text-sm font-semibold">View GitHub</div>

              <div className="absolute -top-3 -right-3 flex h-12 w-12 items-center justify-center overflow-visible rounded-full bg-[#25252F]">
                <div className="overflow-hidden rounded-full">
                  <button
                    onClick={onClose}
                    onMouseEnter={(e) =>
                      fastAnimate(e.currentTarget, {
                        y: 6,
                        rotation: 90,
                        duration: 0.15,
                        ease: "power2.in",
                      })
                    }
                    onMouseDown={(e) =>
                      fastAnimate(e.currentTarget, {
                        y: 10,
                        duration: 0.15,
                        ease: "power2.in",
                      })
                    }
                    onMouseUp={(e) =>
                      fastAnimate(e.currentTarget, {
                        y: 0,
                        boxShadow: "none",
                        duration: 0.2,
                        ease: "back.out(2)",
                      })
                    }
                    onMouseLeave={(e) =>
                      fastAnimate(e.currentTarget, {
                        y: 0,
                        rotation: 0,
                        boxShadow: "none",
                        duration: 0.2,
                      })
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500"
                  >
                    <X className="text-[#C1121F]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-14 w-14 items-center justify-center overflow-visible rounded-full bg-[#1C1C25] pb-2">
            <a
              ref={goBtnRef}
              onMouseEnter={(e) =>
                fastAnimate(e.currentTarget, {
                  y: 6,
                  boxShadow: "none",
                  duration: 0.2,
                })
              }
              onMouseDown={(e) =>
                fastAnimate(e.currentTarget, {
                  y: 8,
                  boxShadow: "0 -2px 0 #7A0C12, inset 0 5px 1px #7A0C12",
                  duration: 0.15,
                  ease: "power2.in",
                })
              }
              onMouseUp={(e) =>
                fastAnimate(e.currentTarget, {
                  y: 4,
                  boxShadow: "0 3px 0 #7A0C12",
                  duration: 0.18,
                  ease: "power3.out",
                })
              }
              onMouseLeave={(e) =>
                fastAnimate(e.currentTarget, {
                  y: 0,
                  boxShadow: "0 6px 0 #7A0C12",
                  duration: 0.2,
                  ease: "back.out(2)",
                })
              }
              className="rounded-md bg-[#C1121F] px-4 py-2 text-sm font-bold"
            >
              go!
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function GithubCard({ btnRef, onClick }: GithubCardProps) {
  useLayoutEffect(() => {
    if (!btnRef.current) return;

    gsap.set(btnRef.current, {
      boxShadow: "0 6px 0 #7A0C12",
    });
  }, [btnRef]);

  return (
    <>
      <div className="absolute top-2 left-2 h-2 w-2 rounded-full bg-[#3B3B44]" />
      <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#3B3B44]" />

      <button
        ref={btnRef}
        onClick={onClick}
        onMouseEnter={(e) =>
          fastAnimate(e.currentTarget, {
            y: 6,
            boxShadow: "none",
            duration: 0.2,
          })
        }
        onMouseDown={(e) =>
          fastAnimate(e.currentTarget, {
            y: 8,
            boxShadow:
              "0 -2px 0 #7A0C12, inset 0 1600px 1600px rgba(0,0,0,0.1)",
            duration: 0.15,
            ease: "power2.in",
          })
        }
        onMouseUp={(e) =>
          fastAnimate(e.currentTarget, {
            y: 4,
            boxShadow: "0 3px 0 #7A0C12",
            duration: 0.18,
            ease: "power3.out",
          })
        }
        onMouseLeave={(e) =>
          fastAnimate(e.currentTarget, {
            y: 0,
            boxShadow: "0 6px 0 #7A0C12",
            duration: 0.2,
            ease: "back.out(2)",
          })
        }
        className="relative h-20 w-20 rounded-full bg-[#C1121F]"
      >
        <img
          src="/gitHub.png"
          alt=""
          className="absolute top-1/2 left-1/2 w-10 -translate-x-1/2 -translate-y-1/2"
        />
      </button>

      <div className="absolute bottom-2 left-2 h-2 w-2 rounded-full bg-[#3B3B44]" />
      <div className="absolute right-2 bottom-2 h-2 w-2 rounded-full bg-[#3B3B44]" />
    </>
  );
}

function PortfolioSection() {
  return (
    <div className="relative flex h-full flex-col rounded-xl border border-[#25252f] bg-[#25252f] shadow-[0_0_16px_#101016] hover:border-[rgba(196,196,196,0.7)]">
      <div className="flex h-full w-full flex-col">
        <div className="flex h-14 items-center justify-between px-4 pt-14">
          <div className="flex w-full gap-2 bg-[#1c1c25] p-6 text-lg">
            <Image className="mr-3" />

            <div>PORTFOLIO</div>

            <div className="flex flex-1 items-center justify-end">
              <div
                className="h-6 w-14 bg-[#C1121F]"
                style={{
                  WebkitMaskImage: "url(/device-dots.png)",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskImage: "url(/device-dots.png)",
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                }}
              />
            </div>
          </div>

          <div className="ml-4 flex gap-2">
            {[ArrowLeft, ArrowRight].map((Icon, i) => (
              <button
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1c1c25] shadow-[0_4px_0_#101016]"
                onMouseEnter={(e) =>
                  fastAnimate(e.currentTarget, {
                    y: 3,
                    boxShadow: "0 1px 0 #101016",
                    duration: 0.2,
                  })
                }
                onMouseDown={(e) =>
                  fastAnimate(e.currentTarget, {
                    y: 4,
                    boxShadow:
                      "0 -1px 0 #101016, inset 0 1600px 1600px rgba(0,0,0,0.1)",
                    duration: 0.15,
                  })
                }
                onMouseUp={(e) =>
                  fastAnimate(e.currentTarget, {
                    y: 2,
                    boxShadow: "0 2px 0 #101016",
                    duration: 0.2,
                    ease: "back.out(2)",
                  })
                }
                onMouseLeave={(e) =>
                  fastAnimate(e.currentTarget, {
                    y: 0,
                    boxShadow: "0 4px 0 #101016",
                    duration: 0.2,
                  })
                }
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center px-4 pt-5">
          <div className="w-full max-w-full rounded-xl bg-[#101016] p-4 transition-all duration-300 lg:max-w-5xl xl:max-w-6xl">
            <div className="relative h-120 overflow-hidden bg-[#1C1C1C]">
              <img
                src="/glass-texture.jpg"
                className="h-full w-full object-cover opacity-50"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-10">
        <DoorPanel />
      </div>
    </div>
  );
}

export function CenterPanel() {
  return (
    <div className="flex flex-col gap-4">
      <PortfolioSection />
      <div className="grid grid-cols-2 gap-4">
        <ColorButtenSection />
        <GithubSection />
      </div>
    </div>
  );
}
