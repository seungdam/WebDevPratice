import { useState, useRef, useLayoutEffect } from "react";
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
    setActiveGroup(group); 
    setTimeout(() => {
      gsap.to(window, { duration: 1, scrollTo: ".content-display", ease: EASING.sharp});
    }, 100
    );
  };
const currentSceneList = activeGroup ? sceneGroups[activeGroup] : [];

return (
    <div>
      <div className="header-area" style={styles.header_area}>
        {typeof TopScene === "function" && <TopScene onSelectGroup={hSceneGroupSelect} />}
      </div>
      <hr/>
      {activeGroup && (
        <div className="content-display" style={styles.content_display}>
          {currentSceneList.map((sceneName) => {  // map -> for 문
            const SceneComponent = scenes[sceneName];
            return (SceneComponent ? (
              <div key={sceneName} style={styles.scene_item} className="scene-item">
                <SceneComponent />
              </div>
            ) : null );
          })}
        </div>
      )}
    </div>
  );
}


const styles = {
  header_area: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1ff10",
  },
  "content-display": {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    // 시네마틱한 전환을 위한 추가 설정
    scrollSnapType: "y mandatory", 
  },
  "scene-item": {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    scrollSnapAlign: "start",
  }
};