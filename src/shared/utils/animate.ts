import gsap from "gsap";

export const animate = (el: gsap.TweenTarget, vars: gsap.TweenVars) => {
  return gsap.to(el, vars);
};
