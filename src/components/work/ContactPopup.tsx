import { animate } from "@/shared/utils/animate";
import gsap from "gsap";
import { Mail, X } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

type ContactPopupProps = {
  open?: boolean;
  onClose?: () => void;
};

export function ContactPopup({ open, onClose }: ContactPopupProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const springRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!open) return;
    if (!rootRef.current) return;

    gsap.set(btnRef.current, {
      y: -3,
      boxShadow: "0 6px 0 #7A0C12",
    });

    gsap.set(springRef.current, {
      scaleY: 1.8,
      transformOrigin: "bottom center",
    });

    const tl = gsap.timeline();

    tl.fromTo(
      rootRef.current,
      { y: -160 },
      {
        y: 40,
        duration: 0.6,
        ease: "power2.out",
      },
    )
      .to(rootRef.current, {
        y: -10,
        duration: 0.35,
        ease: "power2.inOut",
      })
      .to(rootRef.current, {
        y: 0,
        duration: 0.25,
        ease: "power2.out",
      })
      .to(springRef.current, {
        scaleY: 1,
      });
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 overflow-hidden bg-[#1C1C25E6]"
      >
        <div
          ref={rootRef}
          className="relative flex h-full w-full flex-col items-center px-9"
        >
          <div className="relative flex w-full flex-col items-center">
            <div
              ref={springRef}
              className="h-16 w-2 rounded-b-full bg-[#D9D9D9]"
            />
            <img src="/device/spring.svg" className="-mt-2 w-10" />
            <div className="-mt-2 h-16 w-2 rounded-t-full bg-[#D9D9D9]" />
            <div className="-mt-1 h-5 w-5 rounded-t-full bg-[#C1121F]" />

            {/* DEVICE */}
            <div className="relative w-full max-w-175 rounded-lg bg-[#D9D9D9] py-3.5 shadow-2xl">
              <div className="flex flex-col">
                <div className="flex w-full border-b-2 border-[#c1c1c1] px-3.5 pb-3.5">
                  <div className="flex w-full items-center justify-between rounded-md bg-[#c1c1c1] p-2">
                    <div className="flex items-center justify-center gap-3">
                      <div className="mr-3 flex h-11.5 w-11.5 items-center justify-center rounded-md bg-[#1c1c25]">
                        <Mail className="text-[#C1121F]" />
                      </div>

                      <div className="text-sm font-bold text-[#3A3A3A]">
                        hello@hani.dev
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-[#C1121F]" />
                      <div className="h-2 w-2 rounded-full bg-[#C1121F]" />
                    </div>
                  </div>

                  <div className="relative ml-3 h-16 w-42 rounded-md bg-[#1C1C1C] p-2">
                    <div className="relative flex h-full overflow-hidden rounded-sm bg-[#3B3B44]">
                      <div className="animate-marquee flex min-w-max items-center">
                        <div className="pr-4">
                          <div className="text-4xl whitespace-nowrap text-[#D9D9D9]">
                            comment me
                          </div>
                        </div>

                        <div className="pr-4">
                          <div className="text-4xl whitespace-nowrap text-[#D9D9D9]">
                            comment me
                          </div>
                        </div>
                      </div>

                      <div className="animated-grain absolute inset-0 z-20 opacity-70 mix-blend-overlay" />
                    </div>

                    <img
                      src="/textures/glass-texture.jpg"
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
                    />
                  </div>

                  <div className="mr-0 ml-3 flex h-16 min-h-16 w-16 min-w-16 items-center justify-center rounded-full bg-[#c1c1c1]">
                    <div className="overflow-hidden rounded-full">
                      <button
                        onClick={onClose}
                        onMouseEnter={(e) =>
                          animate(e.currentTarget, {
                            y: 6,
                            rotation: 90,
                            duration: 0.15,
                          })
                        }
                        onMouseDown={(e) =>
                          animate(e.currentTarget, { y: 10, duration: 0.15 })
                        }
                        onMouseUp={(e) =>
                          animate(e.currentTarget, { y: 0, duration: 0.2 })
                        }
                        onMouseLeave={(e) =>
                          animate(e.currentTarget, {
                            y: 0,
                            rotation: 0,
                            duration: 0.2,
                          })
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500"
                      >
                        <X className="text-[#C1121F]" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-0 h-full px-3.5">
                  <form className="flex flex-col gap-4">
                    <div className="">
                      <div className="flex flex-col pt-3.5">
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className="mb-2 min-h-12 resize-y rounded border border-black bg-[#1C1C25] p-4.5 font-sans text-base text-[#D9D9D9] outline-none placeholder:text-[#D9D9D980]"
                        />

                        <textarea
                          placeholder="your message"
                          className="mb-2 block h-auto max-h-60 min-h-12 w-full resize-y rounded border border-black bg-[#1C1C25] p-4.5 font-sans text-base leading-5 text-[#D9D9D9] outline-none placeholder:text-[#D9D9D980]"
                        />

                        <div className="rounded-lg bg-[#c1c1c1] p-3.5">
                          <button
                            ref={btnRef}
                            type="submit"
                            onMouseEnter={(e) =>
                              animate(e.currentTarget, {
                                y: 0,
                                scale: 1,
                                boxShadow: "0 1px 0 #7A0C12",
                                duration: 0.2,
                                ease: "power2.out",
                              })
                            }
                            onMouseDown={(e) =>
                              animate(e.currentTarget, {
                                y: 0,
                                scale: 1,
                                boxShadow:
                                  "0 -2px 0 #7A0C12, inset 0 6px 1px #7A0C12",
                                duration: 0.1,
                                ease: "power2.out",
                              })
                            }
                            onMouseUp={(e) =>
                              animate(e.currentTarget, {
                                y: 0,
                                scale: 1,
                                boxShadow: "0 1px 0 #7A0C12",
                                duration: 0.18,
                                ease: "power2.out",
                              })
                            }
                            onMouseLeave={(e) =>
                              animate(e.currentTarget, {
                                y: -3,
                                scale: 1,
                                boxShadow: "0 6px 0 #7A0C12",
                                duration: 0.2,
                                ease: "power2.out",
                              })
                            }
                            className="relative -mt-1.5 min-h-10.5 w-full overflow-hidden rounded bg-[#C1121F] text-[#1C1C25]"
                          >
                            <div className="flex h-full w-full items-center justify-center py-4">
                              SUBMIT
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="mt-3 flex items-center justify-between px-5">
                  <div className="text-gray-400">
                    <svg className="h-7 w-7" viewBox="0 0 32 32" fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16345 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0ZM7.65226 15.7594C7.65226 14.6548 8.54769 13.7594 9.65226 13.7594H13.9994V9.41176C13.9994 8.30719 14.8949 7.41176 15.9994 7.41176C17.104 7.41176 17.9994 8.30719 17.9994 9.41176L17.9994 13.7594H22.3475C23.452 13.7594 24.3475 14.6548 24.3475 15.7594C24.3475 16.8639 23.452 17.7594 22.3475 17.7594H17.9994V22.107C17.9994 23.2115 17.104 24.107 15.9994 24.107C14.8949 24.107 13.9994 23.2115 13.9994 22.107V17.7594L9.65226 17.7594C8.54769 17.7594 7.65226 16.8639 7.65226 15.7594Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  <div
                    className="h-5 w-40 translate-x-12 bg-[#C1121F]"
                    style={{
                      WebkitMaskImage: "url(/device/device-dots.png)",
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskSize: "contain",
                      maskImage: "url(/device/device-dots.png)",
                      maskRepeat: "no-repeat",
                      maskSize: "contain",
                    }}
                  />

                  <div className="text-gray-400">
                    <svg className="h-7 w-7" viewBox="0 0 32 32" fill="none">
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
          </div>
        </div>
      </div>
    </>
  );
}
