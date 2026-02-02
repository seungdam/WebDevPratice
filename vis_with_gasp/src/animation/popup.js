// /utils/animations/popup.js
import gsap from 'gsap';
import { EASING, DURATION } from './common.js';

/**
 * 기본 팝업 (아래에서 슬라이드 업 + 페이드인)
 * 
 * @param {Element|Ref} container - 팝업 컨테이너
 * @param {Element|Ref} card - 팝업 레이아웃(카드)
 * @param {Array|String} items - 카드 내부 아이템들
 * @param {Object} options - 커스텀 옵션
 * @returns {Timeline} GSAP Timeline
 */
export const popupSlideUp = (container, card, items, options = {}) => {
  const defaults = {
    startY: 50,              // 시작 Y 오프셋
    cardDuration: 0.8,       // 카드 애니메이션 시간
    itemDuration: 0.5,       // 아이템 애니메이션 시간
    stagger: 0.15,           // 아이템 간격
    overlap: 0.4,            // 카드-아이템 오버랩 시간
    ease: EASING.sharp,
    onComplete: null         // 애니메이션이 끝난 후  
  };
  
  const config = { ...defaults, ...options }; // object composition
  gsap.set(card, { y: config.startY, opacity: 0 });
  gsap.set(items, { y: 20, opacity: 0 });

  const tl = gsap.timeline({ onComplete: config.onComplete });
  
  // 카드 등장
  tl.to(card, {
    y: 0,
    opacity: 1,
    duration: config.cardDuration,
    ease: config.ease
  });
  
  // 아이템 순차 등장
  tl.to(items, {
    y: 0,
    opacity: 1,
    duration: config.itemDuration,
    stagger: config.stagger,
    ease: EASING.smooth
  }, `-=${config.overlap}`);  // 오버랩
  
  return tl;
};

/**
 * 팝업 닫기 (역방향)
 * 
 * @param {Element|Ref} card - 팝업 카드
 * @param {Array|String} items - 내부 아이템들
 * @param {Object} options - 커스텀 옵션
 * @returns {Timeline} GSAP Timeline
 */
export const popupSlideDown = (card, items, options = {}) => {
  const defaults = {
    endY: 50,                // 최종 Y 오프셋
    itemDuration: 0.25,      // 아이템 사라지는 시간
    cardDuration: 0.4,       // 카드 사라지는 시간
    stagger: 0.05,           // 아이템 간격
    overlap: 0.15,           // 아이템-카드 오버랩
    ease: EASING.smooth,
    onComplete: null
  };
  
  const config = { ...defaults, ...options };
  
  const tl = gsap.timeline({
    onComplete: config.onComplete
  });
  
  // 아이템 먼저 사라짐
  tl.to(items, {
    opacity: 0,
    y: -10,
    duration: config.itemDuration,
    stagger: config.stagger,
    ease: config.ease
  });
  
  // 카드 사라짐
  tl.to(card, {
    y: config.endY,
    opacity: 0,
    duration: config.cardDuration,
    ease: EASING.sharp
  }, `-=${config.overlap}`);
  
  return tl;
};

/**
 * 스케일 팝업 (중앙에서 확대)
 * 
 * @param {Element|Ref} element - 팝업 요소
 * @param {Object} options - 커스텀 옵션
 * @returns {Timeline} GSAP Timeline
 */
export const popupScale = (element, options = {}) => {
  const defaults = {
    startScale: 0.8,
    duration: 0.6,
    ease: EASING.bouncy,
    onComplete: null
  };
  
  const config = { ...defaults, ...options };
  
  gsap.set(element, { 
    scale: config.startScale, 
    opacity: 0 
  });
  
  return gsap.to(element, {
    scale: 1,
    opacity: 1,
    duration: config.duration,
    ease: config.ease,
    onComplete: config.onComplete
  });
};

/**
 * 특정 위치에서 팝업 (버튼 클릭 위치 등)
 * 
 * @param {Element|Ref} popup - 팝업 요소
 * @param {Object} fromPosition - 시작 위치 { x, y }
 * @param {Object} options - 커스텀 옵션
 * @returns {Timeline} GSAP Timeline
 */
export const popupFromPosition = (popup, fromPosition, options = {}) => {
  const defaults = {
    duration: 0.7,
    ease: EASING.sharp,
    onComplete: null
  };
  
  const config = { ...defaults, ...options };
  
  // 팝업의 최종 위치 계산
  const popupRect = popup.getBoundingClientRect();
  const deltaX = fromPosition.x - popupRect.left;
  const deltaY = fromPosition.y - popupRect.top;
  
  gsap.set(popup, {
    x: deltaX,
    y: deltaY,
    scale: 0.3,
    opacity: 0
  });
  
  return gsap.to(popup, {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
    duration: config.duration,
    ease: config.ease,
    onComplete: config.onComplete
  });
};