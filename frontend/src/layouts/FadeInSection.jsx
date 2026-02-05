// Plan: 스크롤 애니메이션 컴포넌트 분리
import { useEffect, useRef } from "react";
import * as MyAnim from "../animation/AnimCommon.js"
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