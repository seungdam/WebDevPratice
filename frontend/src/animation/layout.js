import gsap from 'gsap';
import { EASING, DURATION, getElementInfo } from './common';

// ----------------------------------------------------------------------
// 1. Resize Dimension (크기 변경)
// ----------------------------------------------------------------------
export const resizeDimension = (element, size, options = {}) => {
  if (!element) return gsap.timeline();

  const defaultTransform = { axis: 'y' };
  const defaultTime = {
    duration: DURATION.normal,
    ease: EASING.smooth,
    onComplete: null
  };

  const tf = { ...defaultTransform, ...options.transform };
  const tm = { ...defaultTime, ...options.time };

  const targetProp = tf.axis === 'x' ? 'width' : 'height';

  return gsap.to(element, {
    [targetProp]: size,
    duration: tm.duration,
    ease: tm.ease,
    onComplete: tm.onComplete
  });
};

// ----------------------------------------------------------------------
// 2. Expand & Push (밀어내기)
// ----------------------------------------------------------------------
export const expandWithPush = (expandingElement, affectedElements, expandSize, options = {}) => 
{
  // Safe Casting: 배열, 단일요소, 선택자 문자열 모두 처리
  const neighbors = gsap.utils.toArray(affectedElements); 

  const defaultTransform = { dir: { x: 0, y: 1 } };
  const defaultTime = {
    duration: DURATION.normal,
    ease: EASING.smooth,
    stagger: 0.05,
    onComplete: null
  };

  const tf = { ...defaultTransform, ...options.transform };
  const tm = { ...defaultTime, ...options.time };
  
  const animationSequence = gsap.timeline({ onComplete: tm.onComplete });

  const isHorizontal = Math.abs(tf.dir.x) > 0;
  const sizeProp = isHorizontal ? 'width' : 'height';
  const moveProp = isHorizontal ? 'x' : 'y';

  // 1. Target Expansion
  animationSequence.to(expandingElement, {
    [sizeProp]: expandSize,
    duration: tm.duration,
    ease: tm.ease
  });
  
  // 2. Push Neighbors (Relative Movement)
  // [Fix] 단순 할당이 아니라 "+=" 연산자를 써야 현재 위치 기준에서 밀려납니다.
  // 방향(Vector)에 따라 부호를 결정할 수도 있지만, 보통 확장이면 양수(+) 방향으로 밉니다.
  if (neighbors.length > 0) {
    animationSequence.to(neighbors, {
      [moveProp]: `+=${expandSize}`,
      duration: tm.duration,
      stagger: tm.stagger,
      ease: tm.ease
    }, "<"); 
  }
  
  return animationSequence;
};

// ----------------------------------------------------------------------
// 3. Space Management (공간 확보/제거)
// ----------------------------------------------------------------------
export const toggleSpace = (element, isOpen, options = {}) => {
  if (!element) return gsap.timeline();

  const defaultTime = {
    duration: DURATION.normal,
    ease: EASING.smooth,
    onStart: null,
    onComplete: null
  };
  
  const tm = { ...defaultTime, ...options.time };

  if (isOpen) {
    // [Fix] 무조건 'block'이 아니라, CSS에 정의된 원래 속성(flex, grid 등)을 복구
    element.style.removeProperty('display'); 
    
    if (window.getComputedStyle(element).display === 'none') 
    {
        element.style.display = 'block'; 
    }

    // Reflow 발생 (targetHeight 계산을 위해 필수)
    const targetHeight = element.offsetHeight;
    
    // 애니메이션 준비
    element.style.height = '0px';
    element.style.opacity = '0';
    element.style.overflow = 'hidden'; // 높이 애니메이션 중 내용 넘침 방지

    const animationSequence = gsap.timeline({
      onStart: tm.onStart,
      onComplete: () => {
        element.style.height = 'auto';
        element.style.overflow = ''; // 애니메이션 끝나면 스크롤 복구
        if (tm.onComplete) tm.onComplete();
      }
    });

    animationSequence.to(element, {
      height: targetHeight,
      opacity: 1, // 투명도도 같이 켜줘야 자연스러움
      duration: tm.duration,
      ease: tm.ease
    });
    return animationSequence;

  } else {
    // Close
    element.style.overflow = 'hidden'; // 닫힐 때 내용물 삐져나옴 방지

    return gsap.to(element, {
      height: 0,
      opacity: 0,
      duration: tm.duration,
      ease: tm.ease,
      onComplete: () => {
        element.style.display = 'none';
        element.style.height = ''; // 다음 오픈을 위해 style 정리
        element.style.overflow = '';
        if (tm.onComplete) tm.onComplete();
      }
    });
  }
};

// ----------------------------------------------------------------------
// 4. Smooth Reposition (FLIP Animation)
// ----------------------------------------------------------------------
export const smoothReposition = (elements, repositionCallback, options = {}) => {
  // Safe Casting
  const targets = gsap.utils.toArray(elements);
  if (targets.length === 0) return gsap.timeline();

  const defaultTime = {
    duration: DURATION.normal,
    ease: EASING.smooth,
    stagger: 0.03
  };

  const tm = { ...defaultTime, ...options.time };
  
  // 1. Capture State (Pre-layout)
  // [Good] Batch Read
  const curPositions = targets.map(el => el.getBoundingClientRect());
  
  // 2. Apply Layout Change
  repositionCallback();
  
  // 3. Capture State (Post-layout)
  const nextPositions = targets.map(el => el.getBoundingClientRect());
  
  // 4. Animate Delta
  const animationSequence = gsap.timeline();
  
  targets.forEach((el, i) => {
    if (!curPositions[i] || !nextPositions[i]) return;

    const deltaX = curPositions[i].left - nextPositions[i].left; 
    const deltaY = curPositions[i].top - nextPositions[i].top;
    
    // Invert
    gsap.set(el, { x: deltaX, y: deltaY });
    
    // Play
    animationSequence.to(el, {
      x: 0,
      y: 0,
      duration: tm.duration,
      ease: tm.ease
    }, i * tm.stagger);
  });
  
  return animationSequence;
};