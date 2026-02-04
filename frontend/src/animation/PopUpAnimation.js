import gsap from 'gsap';
import { DURATION, EASING } from './AnimCommon'; // 가정

/**
 * PopUp animation
 * @param {Element} cardElement - 메인 카드 (Layout)
 * @param {Element|Array} contentElements - 내부 아이템들 (Context)
 * @param {Object} options - 설정 객체 (transform, time 분리)
 */
export const popUpCard = (cardElement, contentElements, options = {}) => {
  // Validation Check
  if (!cardElement || !contentElements)
  {
    console.warn("[popUpCard] Invalid elements passed.");
    return gsap.timeline();
  }

  // Check Transform Factor
  const defaultTransform = {
    dir: { x: 0, y: 1 },
    xOffset: 0, yOffset: 0,        
    scale: 1.0     
  };

  const defaultTime = {
    cardDuration: DURATION.fast,
    itemDuration: DURATION.slow,  
    stagger: 0.1,        // sequence time
    blending: 0.2,       // blending time
    ease: EASING.elastic,  // lerp function
    delay: 0             // delay time
  };

  // 3. Merging Option
  const tf = { ...defaultTransform, ...options.transform };
  const tm = { ...defaultTime, ...options.time };
  const onComplete = options.onComplete ? options.onComplete : null;

  // 4. Init
  const startPos = {
    x: tf.dir.x * tf.xOffset,
    y: tf.dir.y * tf.yOffset
  };

  // 5. Timeline Setup
  const animationSequence = gsap.timeline({ delay: tm.delay, onComplete: onComplete });

  gsap.set(cardElement, { 
    x: startPos.x, y: startPos.y, 
    opacity: 0,
    scale: tf.scale
   });
  
  // Parallax effect
  gsap.set(contentElements, { 
    x: startPos.x * 0.2, 
    y: startPos.y * 0.2, 
    opacity: 0 
  });

  animationSequence.to(cardElement, {
    x: 0, y: 0,
    opacity: 1,
    scale: 1,
    duration: tm.cardDuration,
    ease: tm.ease
  });

  // blending
  animationSequence.to(contentElements, {
    x: 0, y: 0,
    opacity: 1,
    duration: tm.itemDuration,
    stagger: tm.stagger,
    ease: EASING.smooth
  }, `-=${tm.blending}`);

  return animationSequence;
};


export const popDownCard = (cardElement, contentElements, options = {}) => {
  // 1. Validation check
  if (!cardElement) return gsap.timeline();

  // 2. Scoping Logic (Targeting)
  let targets = contentElements;
  if (typeof contentElements === 'string') {
    targets = cardElement.querySelectorAll(contentElements);
  }

  // 3. Config Composition (popUpCard와 동일한 기본값 사용)
  const defaultTransform = {
    dir: { x: 0, y: 1 }, 
    distance: 30,        
    scale: 0.95          
  };

  const defaultTime = {
    cardDuration: DURATION.fast, 
    itemDuration: DURATION.fast, // 사라질 땐 좀 더 빨라도 됨
    stagger: 0.05,       // 간격도 조금 더 타이트하게
    blending: 0.1,       
    ease: "power2.in",   // 사라질 땐 가속도(In)가 자연스러움
    delay: 0
  };

  const tf = { ...defaultTransform, ...options.transform };
  const tm = { ...defaultTime, ...options.time };
  
  // 4. Vector Calculation (돌아갈 목표 위치 계산)
  const endPos = {
    x: tf.dir.x * tf.distance,
    y: tf.dir.y * tf.distance
  };

  // 5. Timeline Setup
  const animationSequence = gsap.timeline({ 
    delay: tm.delay, 
    onComplete: options.onComplete 
  });

  // =========================================================
  // [Step 1: Contents Exit] (내용물 먼저 퇴장)
  // =========================================================
  if (targets && targets.length > 0) {
    animationSequence.to(targets, {
      x: endPos.x * 0.2, // 패럴랙스 위치로 복귀
      y: endPos.y * 0.2,
      autoAlpha: 0,      // 사라짐 (visibility: hidden 자동 처리)
      duration: tm.itemDuration,
      // [Reverse Stagger] 끝에서부터 사라짐 (LIFO 구조)
      stagger: { amount: tm.stagger, from: "end" }, 
      ease: tm.ease
    });
  }

  // =========================================================
  // [Step 2: Card Exit] (카드 본체 퇴장)
  // =========================================================
  // 내용물이 사라지기 시작할 때쯤 카드도 같이 움직임
  animationSequence.to(cardElement, {
    x: endPos.x, 
    y: endPos.y,
    autoAlpha: 0,
    scale: tf.scale, // 작아지면서 사라짐
    duration: tm.cardDuration,
    ease: tm.ease
  }, targets && targets.length > 0 ? `<+=${tm.blending}` : "<"); 
  // targets가 없으면 바로 실행, 있으면 blending만큼 겹쳐서 실행

  return animationSequence;
};