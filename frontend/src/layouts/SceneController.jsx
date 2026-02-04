import { useState } from "react";
import gsap from "gsap";

import * as MyAnim from "../animation/AnimCommon.js"

import FadeInSection from "./FadeInSection"; 

// Scene Component
import DiseaseScene from "./DiseaseScene"; 
import TitleScene from "./TitleScene.jsx";
// import AccidentScene from "./AccidentScene";


// Plan: 일단 게임 개발할 때 했던 방식대로 컴포넌트 구성
// Using Fine-State-Machine

const SCENE_GROUPS = 
{
  "Disease": ["DiseaseScene"],
  "Accident": [], // ["AccidentScene"]
};

const  SCENE_MAPS = 
{
    "Title": TitleScene,
    "DiseaseScene": DiseaseScene,
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

  const currentSceneList = activeGroup ? SCENE_GROUPS[activeGroup] : [];

  return (
    <div className="container" style={styles.container}>
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
                <FadeInSection>
                  <TargetScene />
                </FadeInSection>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
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