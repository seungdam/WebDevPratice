// Plan: 스크롤 애니메이션 컴포넌트 분리
import { useEffect, useRef } from "react";
import * as MyAnim from "./AnimCommon.js"
import gsap from "gsap";

export default function FadeInSection({ children, delay = 0 }) 
{
  const containerRef = useRef(null);
  useEffect(() => 
  {
    if (!containerRef.current) 
    {
        return;
    }
    
    const element = containerRef.current;
    const observer = new IntersectionObserver( (entries) => 
    {
        entries.forEach((entry) => 
        {
          if (entry.isIntersecting)
          {
            gsap.fromTo(
              element,
              { opacity: 0, y: 50 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                ease: MyAnim.EASING.cinematic,
                delay: delay // 필요하면 딜레이 추가
              }
            );
          }
          else 
          {
             gsap.to(element, 
             { 
              opacity: 0, 
              y: 50, // 원래 위치로 되돌림
              duration: 0.3, 
              ease: MyAnim.EASING.cinematic // 나갈 때는 조금 빠르게
              });
          }
        });
      },
      { threshold: 0, rootMargin: "-5% 0px -5% 0px" } 
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={containerRef} className="sceneWrapper" style={{ width: "100%", height: "100%" }}>
      {children}
    </div>
  );
}


export function PopUpScrollSection({ children, direction = 'left', delay = 0 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const element = containerRef.current;
    
    // 방향에 따른 초기값 설정
    // left: 왼쪽에서 오른쪽으로 등장, right: 오른쪽에서 왼쪽으로 등장
    const xOffset = direction === 'left' ? -100 : 100; 
    const rotateYVal = direction === 'left' ? -15 : 15; // 살짝 비틀어서 3D 느낌

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 🟢 [Enter] 화면에 들어올 때: 밝아지면서 + 제자리로 + 3D 회전 복구
            gsap.fromTo(
              element,
              { 
                opacity: 0, 
                x: xOffset,       // 좌우 밀림
                y: 50,            // 약간 아래에서
                rotationY: rotateYVal, // 3D 회전 상태
                scale: 0.9,       // 약간 작게
                filter: "brightness(0.5) blur(2px)", // [음영 효과] 어둡고 흐리게
                transformOrigin: "center center"
              },
              { 
                opacity: 1, 
                x: 0, 
                y: 0, 
                rotationY: 0,     // 정면 보기
                scale: 1, 
                filter: "brightness(1) blur(0px)", // [음영 제거] 밝고 선명하게
                duration: 1.0, 
                ease: CINEMATIC_EASE,
                delay: delay
              }
            );
          } else {
            // 🔴 [Leave] 화면 밖으로 나갈 때: 다시 어두워지며 뒤로 빠짐
            gsap.to(element, { 
              opacity: 0, 
              x: xOffset / 2, // 나갈 때는 조금만 이동
              y: 50, 
              rotationY: rotateYVal,
              scale: 0.9,
              filter: "brightness(0.5) blur(2px)", // 다시 어두워짐
              duration: 0.4, 
              ease: "power2.in"
            });
          }
        });
      },
      // threshold: 0.1 -> 요소가 10% 정도 보일 때 트리거 (너무 늦지 않게)
      // rootMargin: 중앙에 오기 전 미리 시작하도록 설정
      { threshold: 0.1, rootMargin: "-10% 0px -10% 0px" } 
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [direction, delay]);

  return (
    // perspective: 1000px -> 자식 요소의 3D 회전(rotationY)이 입체적으로 보이게 함
    <div style={{ perspective: '1000px', width: '100%', marginBottom: '20px' }}>
      <div 
        ref={containerRef} 
        className="popUpCardWrapper"
        style={{ width: '100%', height: '100%', willChange: 'transform, opacity, filter' }}
      >
        {children}
      </div>
    </div>
  );
}