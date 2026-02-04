// components/FadeInSection.jsx
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
            // 한 번 실행 후 관찰 중단
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 } // 10%만 보여도 실행
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