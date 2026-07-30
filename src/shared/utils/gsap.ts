import gsap from "gsap";

export const set = (el: gsap.TweenTarget | null, vars: gsap.TweenVars) => {
  if (!el) return;

  gsap.set(el, vars);
};

export const animate = (el: gsap.TweenTarget | null, vars: gsap.TweenVars) => {
  if (!el) return;

  return gsap.to(el, vars);
};
