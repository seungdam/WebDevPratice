import { useState } from "react";
import gsap from "gsap";

import * as MyAnim from "../animation/AnimCommon.js"

import FadeInSection from "../animation/FadeInSection.jsx"; 

// Scene Component
import DiseaseScene from "./DiseaseScene"; 
import TitleScene from "./TitleScene.jsx";
import AccidentScene from "./AccidentScene.jsx";


// Plan: 일단 게임 개발할 때 했던 방식대로 컴포넌트 구성
// Using Fine-State-Machine

const SCENE_GROUPS = 
{
  "Disease": ["DiseaseScene"],
  "Accident": ["AccidentScene"], // ["AccidentScene"]
};

const  SCENE_MAPS = 
{
    "Title": TitleScene,
    "DiseaseScene": DiseaseScene,
    "AccidentScene": AccidentScene
}

export default function SceneController() 
{
  const [activeGroup, setActiveGroup] = useState(null); 
  const TopScene = SCENE_MAPS["Title"];

  // Intro -> Main Changes
  const hSceneGroupSelect = (group) => 
  {
    gsap.to(".headerArea", 
      {
        opacity: 0,
        duration: 0.6,
        ease: MyAnim.EASING.cinematic,
        onComplete: () => 
        {
          setActiveGroup(group);
        }
      }
    );
  };

  const hGoBackTitle = () => 
  {
    gsap.to(".contentDisplay", 
    {
      opacity: 0,
      duration: 0.6,
      ease: MyAnim.EASING.cinematic, // 동일한 Easing 사용
      onComplete: () => {
        setActiveGroup(null); // 상태 변경 (TitleScene 마운트)
      }
    });

  };

  const currentSceneList = activeGroup ? SCENE_GROUPS[activeGroup] : [];

  return (
    <div className="container" style={styles.container}>
      {activeGroup && (
        <HomeButton onClick={hGoBackTitle} />
      )}
      {/* 1. Intro */}
      {!activeGroup && TopScene && (
        <div className="headerArea" style={styles.headerArea}>
           <TopScene onSelectGroup={hSceneGroupSelect} />
        </div>
      )}

      {/* 2. MainContents */}
      {activeGroup && (
        <div className="contentDisplay" style={styles.contentDisplay}>
          {currentSceneList.map((sceneName) => {
            const TargetScene = SCENE_MAPS[sceneName] || SCENE_MAPS[sceneName];
            if (!TargetScene)
            { 
              return null;
            }
            return (
              <article key={sceneName} style={styles.sceneItem}>
                {/*Make Animation With Wrapper Section*/}
                <TargetScene />
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = 
{
  container: 
  {
    width: '100vw',
    minHeight: '100vh', // maxHeight 제거 (스크롤 되려면 minHeight만 있어야 함)
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    position:'relative',
    overflowX: 'hidden' // 가로 스크롤 방지
  },
  headerArea: 
  {
    width: '100%',
    height: '100vh',
    position: 'absolute', // 페이드 아웃 시 위치 고정
    top: 0, left: 0,
    zIndex: 10
  },
  contentDisplay: 
  {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  sceneItem:
  {
    width: '100vw',
    height: '100vh', // 각 씬은 화면 하나를 가득 채움
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
};

const HomeButton = ({ onClick }) => 
{
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        // [Layout] 화면 우측 상단 고정
        position: 'fixed',
        top: '30px',
        right: '40px',
        zIndex: 9999, // 그 어떤 요소보다 위에 있어야 함

        // [Shape & Size]
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isHovered ? '10px' : '0px', // 텍스트 나올 공간 확보
        
        padding: isHovered ? '12px 20px 12px 16px' : '12px', // 호버 시 가로로 길어짐
        borderRadius: '50px', // 완전한 둥근 알약 형태
        
        // [Glassmorphism Style] 고급진 유리 질감
        backgroundColor: 'rgba(255, 255, 255, 0.75)', 
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
        
        // [Text & Color]
        color: '#2d3436',
        fontSize: '0.95rem',
        fontWeight: '600',
        fontFamily: '"Pretendard", sans-serif',
        
        // [Transition] 부드러운 애니메이션
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        overflow: 'hidden', // 텍스트 숨김 처리용
        whiteSpace: 'nowrap',
      }}
    >
      {/* Home Icon (SVG) */}
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{
           // 아이콘 미세 조정
           transform: isHovered ? 'scale(1)' : 'scale(1.1)',
           transition: 'transform 0.3s ease'
        }}
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>

      {/* Text Label (Hover 시 등장) */}
      <span 
        style={{
          display: 'inline-block',
          maxWidth: isHovered ? '100px' : '0px', // 너비 변화로 스르륵 효과
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        Back to Title
      </span>
    </button>
  );
};