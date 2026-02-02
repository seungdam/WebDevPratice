export * from './common';
export * from './popup';
export * from './layout';


import { popupSlideUp, popupSlideDown } from './popup';
import { expandSpace, collapseSpace } from './layout';


export const fullPopupSequence = (container, card, items, affectedElements, options = {}) => {
  const animations = gsap.timeline();
  animations.add(expandSpace(container, { duration: 0.4 }));
  animations.add(popupSlideUp(container, card, items, options), "-=0.2");
  return animations;
};

export const fullCloseSequence = (container, card, items, options = {}) => {
  const animations = gsap.timeline();
  animations.add(popupSlideDown(card, items, options));
  animations.add(collapseSpace(container, { duration: 0.4 }), "-=0.2");
  return animations;
};