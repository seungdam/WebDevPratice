import gsap from 'gsap';
import { EASING, DURATION, getElementInfo } from './common';

/**
 * 요소의 높이를 자연스럽게 변경
 * (다른 레이아웃이 밀려나는 효과)
 * 
 * @param {Element|Ref} element - 대상 요소
 * @param {Number} newHeight - 새로운 높이 (px 또는 "auto")
 * @param {Object} options - 커스텀 옵션
 * @returns {Timeline} GSAP Timeline
 */
export const resizeHeight = (element, newHeight, options = {}) => {
  const defaults = {
    duration: DURATION.normal,
    ease: EASING.smooth,
    onComplete: null
  };
  
  const config = { ...defaults, ...options };
  
  return gsap.to(element, {
    height: newHeight,
    duration: config.duration,
    ease: config.ease,
    onComplete: config.onComplete
  });
};

/**
 * 레이아웃이 확장될 때 주변 요소들 자연스럽게 이동
 * 
 * @param {Element|Ref} expandingElement - 확장되는 요소
 * @param {Array} affectedElements - 영향받는 요소들
 * @param {Number} expandHeight - 확장될 높이
 * @param {Object} options - 커스텀 옵션
 * @returns {Timeline} GSAP Timeline
 */
export const expandWithPush = (expandingElement, affectedElements, expandHeight, options = {}) => {
  const defaults = {
    duration: DURATION.normal,
    ease: EASING.smooth,
    stagger: 0.05,           // 주변 요소 순차 이동
    onComplete: null
  };
  
  const config = { ...defaults, ...options };
  
  const animation_sequence = gsap.timeline({
    onComplete: config.onComplete
  });
  
  // 확장되는 요소의 높이 증가
  animation_sequence.to(expandingElement, {
    height: expandHeight,
    duration: config.duration,
    ease: config.ease
  });
  
  // 주변 요소들 아래로 밀어내기
  animation_sequence.to(affectedElements, {
    y: expandHeight,
    duration: config.duration,
    stagger: config.stagger,
    ease: config.ease
  }, "<");  // 동시 시작
  
  return animation_sequence;
};

/**
 * 공간 확보 (opacity 0 → 1 + 높이 확장)
 * 
 * @param {Element|Ref} element - 나타날 요소
 * @param {Object} options - 커스텀 옵션
 * @returns {Timeline} GSAP Timeline
 */
export const expandSpace = (element, options = {}) => {
  const defaults = {
    duration: DURATION.normal,
    ease: EASING.smooth,
    onStart: null,
    onComplete: null
  };
  
  const config = { ...defaults, ...options };
  
  // 실제 높이 측정 (display: block 상태에서)
  const originalDisplay = element.style.display;
  element.style.display = 'block';
  element.style.opacity = '0';
  const targetHeight = element.offsetHeight;
  element.style.height = '0px';
  element.style.opacity = '1';
  
  const tl = gsap.timeline({
    onStart: config.onStart,
    onComplete: () => {
      element.style.height = 'auto';  // 최종적으로 auto로
      element.style.display = originalDisplay;
      if (config.onComplete) config.onComplete();
    }
  });
  
  tl.to(element, {
    height: targetHeight,
    duration: config.duration,
    ease: config.ease
  });
  
  return tl;
};

/**
 * 공간 축소 (높이 축소 + opacity 1 → 0)
 * 
 * @param {Element|Ref} element - 사라질 요소
 * @param {Object} options - 커스텀 옵션
 * @returns {Timeline} GSAP Timeline
 */
export const collapseSpace = (element, options = {}) => {
  const defaults = {
    duration: DURATION.normal,
    ease: EASING.smooth,
    onComplete: null
  };
  
  const config = { ...defaults, ...options };
  
  return gsap.to(element, {
    height: 0,
    opacity: 0,
    duration: config.duration,
    ease: config.ease,
    onComplete: () => {
      element.style.display = 'none';
      if (config.onComplete) config.onComplete();
    }
  });
};

/**
 * 레이아웃 재배치 (Flip 애니메이션)
 * 요소들이 새 위치로 자연스럽게 이동
 * 
 * @param {Array} elements - 재배치될 요소들
 * @param {Function} repositionCallback - 새 위치로 변경하는 함수
 * @param {Object} options - 커스텀 옵션
 * @returns {Timeline} GSAP Timeline
 */
export const smoothReposition = (elements, repositionCallback, options = {}) => {
  const defaults = {
    duration: DURATION.normal,
    ease: EASING.smooth,
    stagger: 0.03
  };
  
  const config = { ...defaults, ...options };
  
  // 1. 현재 위치 저장
  const curPositions = elements.map(el => getElementInfo(el));
  
  // 2. 새 위치로 변경 (DOM 조작)
  repositionCallback();
  
  // 3. 새 위치 측정
  const nextPosition = elements.map(el => getElementInfo(el));
  
  // 4. 이동 거리 계산 및 애니메이션
  const tl = gsap.timeline();
  
  elements.forEach((el, i) => {
    const deltaX = curPositions[i].x - nextPosition[i].x;
    const deltaY = curPositions[i].y - nextPosition[i].y;
    
    // 이전 위치에서 시작
    gsap.set(el, { x: deltaX, y: deltaY });
    
    // 새 위치로 이동
    tl.to(el, {
      x: 0,
      y: 0,
      duration: config.duration,
      ease: config.ease
    }, i * config.stagger);
  });
  
  return tl;
};