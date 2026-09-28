/* eslint-disable react-hooks/refs */
import gsap from "gsap";
import { ArrowLeft, ArrowRight, Image, X } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";

import { animate, set } from "@/shared/utils/gsap";

import { ColorButtons } from "./ColorButtons";
import { DoorPanel } from "./DoorPanel";
import { Screws } from "./Screws";

type GithubCardProps = {
  onClick: () => void;
};

const CAREER_SECTIONS = [
  {
    title: "CAREER",
    subtitle: "Backend Developer",
    description: "㈜ 시큐어키 · 기술연구소 · 주임",
    period: "2022.11 — 2026.04 · 3년 6개월",
  },
  {
    title: "SPRING BOOT",
    subtitle: "레거시 시스템 마이그레이션",
    description:
      "Java 8, Servlet, iBATIS 기반 레거시 백엔드를 Java 25와 Spring Boot 기반으로 전환하고 REST API를 설계·구현했습니다.",
    period: "Java 25 · Spring Boot 4 · JPA · QueryDSL · Spring Security",
  },
  {
    title: "REACT",
    subtitle: "프론트엔드 마이그레이션",
    description:
      "Vanilla JavaScript 기반 프론트엔드를 React + TypeScript로 전환하고 FSD, Zustand, React Router 기반의 컴포넌트 구조를 설계했습니다.",
    period: "React · TypeScript · Vite · Zustand · FSD",
  },
  {
    title: "COMMON VERSION",
    subtitle: "공용 버전 서비스 개발",
    description:
      "공용 버전의 기능 개발과 릴리즈 전 과정을 담당하고, 레거시 코드 리팩토링과 API 구조 개선 및 운영 장애·보안 이슈에 대응했습니다.",
    period: "6.10.6 — 6.19.0 · 기능 개발 · 리팩토링 · 운영",
  },
  {
    title: "SFTP",
    subtitle: "웹 기반 파일 관리 기능",
    description:
      "Java SSHJ를 활용해 파일·디렉터리 조회 및 관리, 권한 변경, 업로드·다운로드, 다중 파일 처리와 SFTP 세션 관리 기능을 개발했습니다.",
    period: "Java · Spring Boot · SSHJ · REST API",
  },
  {
    title: "CUSTOMIZATION",
    subtitle: "고객사 프로젝트",
    description:
      "국내·해외 통신사 및 금융권 고객사의 요구사항을 분석하고 개발 미팅부터 기능 개발, 제품 커스터마이징 및 운영 이슈 대응까지 수행했습니다.",
    period: "요구사항 분석 · 기능 개발 · 유지보수",
  },
  {
    title: "DEVOPS",
    subtitle: "개발·배포 프로세스 개선",
    description:
      "GitLab CI/CD 기반 배포 자동화와 MR 코드 리뷰 프로세스를 구축하고, Commit/MR Template 및 코드 품질 검증 환경을 적용했습니다.",
    period: "GitLab CI/CD · Git Flow · ESLint · Prettier · Lefthook",
  },
];

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

function ColorButtonSection() {
  return (
    <SectionWrapper className="h-44">
      <ColorButtons />
    </SectionWrapper>
  );
}

function GithubSection() {
  const [open, setOpen] = useState(false);

  return (
    <SectionWrapper className="flex h-44 flex-col items-center justify-center gap-6">
      {open ? (
        <GithubPopup onClose={() => setOpen(false)} />
      ) : (
        <GithubCard onClick={() => setOpen(true)} />
      )}
    </SectionWrapper>
  );
}

function GithubPopup({ onClose }: { onClose: () => void }) {
  const goBtnRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    set(goBtnRef.current, {
      boxShadow: "0 6px 0 #7A0C12",
    });
  }, []);

  return (
    <div className="flex items-center justify-center rounded-xl bg-[#1C1C25]">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="w-full rounded-xl bg-[#1C1C25] p-6">
          <div className="flex h-6 min-w-40 flex-col items-center justify-center gap-2">
            <img
              src="/textures/gitHub.png"
              alt="GitHub"
              className="w-10 pt-9"
            />
            <div className="text-sm font-semibold">View GitHub</div>

            <div className="absolute -top-3 -right-3 flex h-12 w-12 items-center justify-center overflow-visible rounded-full bg-[#25252F]">
              <div className="overflow-hidden rounded-full">
                <button
                  onClick={onClose}
                  onMouseEnter={(e) =>
                    animate(e.currentTarget, {
                      y: 6,
                      rotation: 90,
                      duration: 0.15,
                      ease: "power2.in",
                    })
                  }
                  onMouseDown={(e) =>
                    animate(e.currentTarget, {
                      y: 10,
                      duration: 0.15,
                      ease: "power2.in",
                    })
                  }
                  onMouseUp={(e) =>
                    animate(e.currentTarget, {
                      y: 0,
                      boxShadow: "none",
                      duration: 0.2,
                      ease: "back.out(2)",
                    })
                  }
                  onMouseLeave={(e) =>
                    animate(e.currentTarget, {
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
            href="https://github.com/Hani-SCV"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(e) =>
              animate(e.currentTarget, {
                y: 6,
                boxShadow: "none",
                duration: 0.2,
              })
            }
            onMouseDown={(e) =>
              animate(e.currentTarget, {
                y: 8,
                boxShadow: "0 -2px 0 #7A0C12, inset 0 5px 1px #7A0C12",
                duration: 0.15,
                ease: "power2.in",
              })
            }
            onMouseUp={(e) =>
              animate(e.currentTarget, {
                y: 4,
                boxShadow: "0 3px 0 #7A0C12",
                duration: 0.18,
                ease: "power3.out",
              })
            }
            onMouseLeave={(e) =>
              animate(e.currentTarget, {
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
  );
}

function GithubCard({ onClick }: GithubCardProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    set(btnRef.current, {
      boxShadow: "0 6px 0 #7A0C12",
    });
  }, [btnRef]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={onClick}
        onMouseEnter={(e) =>
          animate(e.currentTarget, {
            y: 6,
            boxShadow: "none",
            duration: 0.2,
          })
        }
        onMouseDown={(e) =>
          animate(e.currentTarget, {
            y: 8,
            boxShadow:
              "0 -2px 0 #7A0C12, inset 0 1600px 1600px rgba(0,0,0,0.1)",
            duration: 0.15,
            ease: "power2.in",
          })
        }
        onMouseUp={(e) =>
          animate(e.currentTarget, {
            y: 4,
            boxShadow: "0 3px 0 #7A0C12",
            duration: 0.18,
            ease: "power3.out",
          })
        }
        onMouseLeave={(e) =>
          animate(e.currentTarget, {
            y: 0,
            boxShadow: "0 6px 0 #7A0C12",
            duration: 0.2,
            ease: "back.out(2)",
          })
        }
        className="relative h-20 w-20 rounded-full bg-[#C1121F]"
      >
        <img
          src="/textures/gitHub.png"
          alt="Portfolio preview"
          className="absolute top-1/2 left-1/2 w-10 -translate-x-1/2 -translate-y-1/2"
        />
      </button>
    </>
  );
}

function CareerContent({ index }: { index: number }) {
  const section = CAREER_SECTIONS[index];

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        <div className="mb-3 text-sm font-medium tracking-widest text-gray-400">
          {section.title}
        </div>

        <h2 className="mb-4 text-2xl font-bold text-white">
          {section.subtitle}
        </h2>

        <p className="mb-6 text-lg leading-relaxed text-gray-300">
          {section.description}
        </p>

        <div className="border-t border-white/10 pt-4 text-sm text-gray-500">
          {section.period}
        </div>
      </div>
    </div>
  );
}

function PortfolioSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const isDefault = currentIndex === 0;

  const currentRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);

  const lastDirection = useRef<"next" | "prev">("next");

  const totalSlides = CAREER_SECTIONS.length + 1;

  const changeSlide = (direction: "next" | "prev") => {
    if (isAnimating) return;

    lastDirection.current = direction;
    setIsAnimating(true);
    setPrevIndex(currentIndex);

    setCurrentIndex((prev) =>
      direction === "next"
        ? (prev + 1) % totalSlides
        : (prev - 1 + totalSlides) % totalSlides,
    );
  };

  useLayoutEffect(() => {
    if (prevIndex === null || !currentRef.current || !prevRef.current) {
      return;
    }

    const isNext = lastDirection.current === "next";

    const enterX = isNext ? "100%" : "-100%";
    const exitX = isNext ? "-100%" : "100%";

    const tl = gsap.timeline({
      onComplete: () => {
        setPrevIndex(null);
        setIsAnimating(false);
      },
    });

    tl.set(currentRef.current, {
      x: enterX,
    });

    tl.to(
      prevRef.current,
      {
        x: exitX,
        duration: 0.5,
        ease: "power3.inOut",
      },
      0,
    );

    tl.to(
      currentRef.current,
      {
        x: "0%",
        duration: 0.5,
        ease: "power3.inOut",
      },
      0,
    );

    return () => {
      tl.kill();
    };
  }, [currentIndex, prevIndex]);
  return (
    <div className="relative flex h-full flex-col rounded-xl border border-[#25252f] bg-[#25252f] shadow-[0_0_16px_#101016] hover:border-[rgba(196,196,196,0.7)]">
      <div className="flex h-full w-full flex-col">
        <div className="flex h-14 items-center justify-between px-4 pt-14">
          <div className="bg-background flex w-full gap-2 p-6 text-lg">
            <Image className="mr-3" />

            <div>PORTFOLIO</div>
          </div>

          <div className="ml-4 flex gap-2">
            {[
              {
                key: "prev",
                Icon: ArrowLeft,
                action: () => changeSlide("prev"),
              },
              {
                key: "next",
                Icon: ArrowRight,
                action: () => changeSlide("next"),
              },
            ].map(({ key, Icon, action }) => (
              <button
                key={key}
                className="bg-background z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-[0_4px_0_#101016]"
                onClick={action}
                onMouseEnter={(e) =>
                  animate(e.currentTarget, {
                    y: 3,
                    boxShadow: "0 1px 0 #101016",
                    duration: 0.2,
                  })
                }
                onMouseDown={(e) =>
                  animate(e.currentTarget, {
                    y: 4,
                    boxShadow:
                      "0 -1px 0 #101016, inset 0 1600px 1600px rgba(0,0,0,0.1)",
                    duration: 0.15,
                  })
                }
                onMouseUp={(e) =>
                  animate(e.currentTarget, {
                    y: 2,
                    boxShadow: "0 2px 0 #101016",
                    duration: 0.2,
                    ease: "back.out(2)",
                  })
                }
                onMouseLeave={(e) =>
                  animate(e.currentTarget, {
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
          <div className="w-full max-w-full rounded-xl bg-[#101016] p-4 lg:max-w-5xl xl:max-w-6xl">
            <div className="relative h-120 overflow-hidden bg-[#1C1C1C]">
              {prevIndex !== null && (
                <div
                  ref={prevRef}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {prevIndex === 0 ? (
                    <>
                      <img
                        src="/portfolio/default.png"
                        alt="Portfolio"
                        className="h-full w-full object-center"
                      />
                      <div className="animated-grain absolute inset-0 z-10" />
                    </>
                  ) : (
                    <CareerContent index={prevIndex - 1} />
                  )}
                </div>
              )}

              <div
                ref={currentRef}
                className="absolute inset-0 flex items-center justify-center"
              >
                {isDefault ? (
                  <>
                    <img
                      src="/portfolio/default.png"
                      alt="Portfolio"
                      className="h-full w-full object-center"
                    />
                    <div className="animated-grain absolute inset-0 z-10" />
                  </>
                ) : (
                  <CareerContent index={currentIndex - 1} />
                )}
              </div>
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
        <ColorButtonSection />
        <GithubSection />
      </div>
    </div>
  );
}
