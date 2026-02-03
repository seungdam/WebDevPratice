import { useState, useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { EASING } from '../animation/common.js';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// 예시 데이터 구조: 그룹별로 씬 목록을 분리
const sceneGroups = {
  A: ["Scene1", "Scene2", "Scene3"],
  B: ["Scene4", "Scene5", "Scene6"],
};

export default function SceneController({ scenes }) {
  const [activeGroup, setActiveGroup] = useState(null);  // Key A vs  B

  const TopScene = scenes["title"];

  // 그룹 변경 핸들러 (TopScene에서 호출)
  const hSceneGroupSelect = (group) => {
    gsap.to(".headerAreas", {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        setActiveGroup(group);
      }
    });
  };

  useEffect(() => {
    if (!activeGroup) return;

    // 새로운 콘텐츠가 나타날 때 전체 페이드 인
    gsap.fromTo(".contentDisplay", 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, ease: "power2.out" }
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target, 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
          );
          observer.unobserve(entry.target);
        }});
      }, { threshold: 0.2 })
    });

    const sceneItems = document.querySelectorAll(".scene-item");
    sceneItems.forEach(el => observer.observe(el));


  const currentSceneList = activeGroup ? sceneGroups[activeGroup] : [];

  return (
    <div className="layouts" style={styles.layout}>
      {!activeGroup ? (
        <div className="headerAreas" style={styles.headerArea}>
          {TopScene && <TopScene onSelectGroup={hSceneGroupSelect} />}
        </div>
      ) : (
        <div className="contentDisplay" style={styles.contentDisplay}>
          {currentSceneList.map((sceneName) => { 
            const SceneComponent = scenes[sceneName];
            if(!SceneComponent) return null;
            return (
              <article key={sceneName} style={styles.scene_item} className="scene-item">
                <SceneComponent />
              </article>
            );
          })}
        </div>
        )}
    </div>
  );
}


const styles = {
  layout: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5'
  },
  
  headerArea: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#ffffff',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  
  contentDisplay: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '2vh', // 스무스 스크롤 확인 가능한 간격
    paddingBottom: '2vh'
  },
  
  scene_item: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  
};