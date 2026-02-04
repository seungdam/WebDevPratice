import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import * as MyAnim from "../animation/AnimCommon.js"
import { popUpCard } from '../animation/PopUpAnimation.js'; 
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import FadeInSection from './FadeInSection.jsx';

const DiseaseScene = () => 
{
  const [selected, setSelected] = useState(null);
  const isOpen = !!selected;

  const infoCardRef = useRef(null);
  
  // contents animation
  useEffect(() => 
  {
    if (!selected || !infoCardRef.current) // idle state
    {
      return;
    }
    // 2. 기존 애니메이션 킬 (빠르게 다른 장기 클릭 시 꼬임 방지)
    const ctx = gsap.context(() => 
    {  
      // 3. popUp animations
      // timing supposed to be collaborate with css transition
      popUpCard(infoCardRef.current, ".infoItem", 
      {
        transform: 
        { 
          yOffset: 50, // 아래에서 위로
          scale: 0.95 
        },
        time: 
        {
          delay: 0.2, // 패널이 어느정도 열린 뒤 시작
          stagger: 0.1, // 텍스트들이 다다닥 뜨는 효과 (★핵심)
          itemDuration: 0.6,
          ease: "back.out(1.2)" // 살짝 튕기는 맛
        }
      });

    }, infoCardRef); // Scope 지정

    return () => ctx.revert(); // CleanUp

  }, [selected]); // selected가 바뀔 때마다 실행 (심장 -> 뇌 클릭 시 다시 재생)

  const hOrganClick = (organ) => 
  {
    setSelected(prev => (prev?.id === organ.id ? null : organ));
    gsap.to(window, 
    {
    duration: 0.8, // ★ 핵심: CSS transition 시간과 똑같이 맞춤
    scrollTo: { y: 0, offsetY: 0 },   // 맨 위로
    ease: MyAnim.EASING.smooth, // 훨씬 고급스러운 감속
    overwrite: "auto" // 사용자가 마우스 휠 굴리면 애니메이션 즉시 중단 (UX 보호)
    });

  }
  
  // [Handler] 닫기 버튼
  const hClose = () => 
  {
    setSelected(null);
  };

  return (
    <div className="container" style={styles.container}>
      {/* Scene Title*/}
      <div className="sceneLabel" style={{ padding: '20px' }}>
        <h1>Human Anatomy Analysis</h1>
      </div>

      <div className="panelContainer" style={styles.panelContainer}>
        {/* Left Panel*/}
        <aside
          className="leftStickyPanel"  // 
          style={{
            ...styles.leftStickyPanel,      // Panel Flex Animation: 열리면 4, 닫히면 10
            flex: isOpen ? 4 : 10, 
          }}
        >
          {/* Visual Wrapper -> sticky로 고정 우측 패널 스크롤링*/}
          <div style={styles.visualWrapper}>
            <div style={styles.bodyMapPlaceholder}>
              {/*Organ Buttons*/}
              {ORGAN_DATA.map((organ) => (
                <button
                  key={organ.id}
                  onClick={() => setSelected(organ)}
                  style={{
                  ...styles.organBtn(organ.top, organ.left),
                  opacity: isOpen && selected.id !== organ.id ? 0.3 : 1,
                  transform: isOpen && selected.id === organ.id 
                    ? 'translate(-50%, -50%) scale(1.1)' 
                    : 'translate(-50%, -50%) scale(1)'
                  }}
                >
                {organ.name}
              </button>
          ))}
          </div>
          {/* State Message */}
           {!isOpen && (
             <p style={styles.guideText}>
               분석하고 싶은 장기를 선택하세요.
             </p>
           )}
        </div>
      </aside>

      {/*Right Panel: Info Card*/}
      <main
        className="rightContentPanel"
        style={{
            ...styles.rightContentPanel,
            flex: isOpen ? 6 : 0.0001,  // 열리면 6, 닫히면 거의 0
            opacity: isOpen ? 1 : 0,    // 닫힐 때 내용물 바로 안 보이게 처리
            pointerEvents: isOpen ? 'auto' : 'none', 
        }}
      >
      {/* GSAP Target Wrapper */}
      <div ref={infoCardRef} style={styles.infoCard}>
        {selected && (
          <>
            <h2 className="infoItem" style={styles.title}>{selected.title}</h2>
            <div className="infoItem" style={styles.decoLine}></div>
            <p className="infoItem" style={styles.script}>{selected.script}</p>
            <div className="infoItem" style={styles.stats}>{selected.stats}</div>
            
            <button 
              className="infoItem" 
              style={styles.closeBtn}
              onClick={hClose}
            >
              Close View
            </button>
          </>
        )}
      </div>
      </main>
    </div>
    </div>
  );
};

const styles = 
{
  container: 
  {
    width: "100%", height: "100vh",
    display: "flex", flexDirection: "column",
    backgroundColor: "#F5F7F9",
    overflow: "hidden"
  },
  
  panelContainer: 
  {
    flex: 1,
    display: "flex", flexDirection: "row",
    position: "relative",
    width: "100%",
  },

  // [Left Panel] : 장기 모형
  leftStickyPanel: 
  {
    // Plan: leftPanel은 sticky로 레이아웃 고정
    position: "sticky",
    top: 0,
    height: "100vh",

    // Plan: 레이아웃 배치 변환은 복잡한 GSAP 대신 CSS Transition 활용
    transition: "flex 0.8s cubic-bezier(0.25, 1, 0.5, 1)", 
    display: "flex", 
    
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#Eaecef", // 배경색 살짝 변경
    
    overflow: "hidden", // 내부 스크롤 방지
    
    zIndex: 10,
  },

  // [Right Panel]: 통계 자료 및 콘텐츠
  rightContentPanel: 
  {
    // Flex + Opacity 변화 동시에
    transition: "flex 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease",
    display: "flex", justifyContent: "center", alignItems: "center",
    backgroundColor: "#FFFFFF",
    overflow: "hidden"
  },

  organBtn: (top, left) => ({
    position: 'absolute',
    top: `${top}%`, left: `${left}%`,
    transform: 'translate(-50%, -50%)',
    padding: '10px 20px',
    backgroundColor: '#fff',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '30px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease', // 버튼 자체의 호버/딤 효과는 CSS로
    zIndex: 10
  }),

  // [Info Card Content]
  infoCard: { 
    width: '100%', maxWidth: '500px',
    padding: '40px',
    display: 'flex', flexDirection: 'column',
    gap: '20px'
  },
  
  title: { fontSize: '2.5rem', margin: 0, color: '#2d3436' },
  decoLine: { width: '40px', height: '4px', backgroundColor: '#e17055' },
  script: { fontSize: '1rem', lineHeight: '1.6', color: '#636e72' },
  stats: { padding: '15px', backgroundColor: '#f1f2f6', borderRadius: '10px', fontWeight: 'bold' },
  
  closeBtn: {
    padding: '10px 20px', alignSelf: 'flex-start',
    backgroundColor: '#2d3436', color: '#fff',
    border: 'none', borderRadius: '5px', cursor: 'pointer'
  }
};

const ORGAN_DATA = [
  {
    id: 'brain',
    name: '뇌',
    top: 8,
    left: 50,
    title: 'Brain (Cerebrum)',
    script: '인체의 중앙 제어 장치입니다. 감각 정보의 통합, 운동 지시, 기억 및 사고를 담당하며 전체 에너지의 20%를 소비합니다.',
    stats: '신경세포 수: 약 860억 개'
  },
  {
    id: 'lungs',
    name: '폐',
    top: 25,
    left: 50,
    title: 'Lungs (Pulmonary)',
    script: '호흡을 통해 산소를 받아들이고 이산화탄소를 배출합니다. 좌우 한 쌍으로 구성되며 혈액의 가스 교환이 일어나는 핵심 장기입니다.',
    stats: '평균 호흡수: 12~20회/min'
  },
  {
    id: 'heart',
    name: '심혈관',
    top: 32,
    left: 45,
    title: 'Heart (Cardiovascular)',
    script: '강력한 근육 펌프 작용을 통해 온몸으로 혈액을 순환시킵니다. 평생 동안 단 한 순간도 쉬지 않고 박동을 유지합니다.',
    stats: '평균 심박수: 72 BPM'
  },
  {
    id: 'liver',
    name: '간',
    top: 45,
    left: 42,
    title: 'Liver (Hepatic)',
    script: '인체의 화학 공장으로 불립니다. 500가지 이상의 기능을 수행하며, 특히 해독 작용과 영양소 저장 및 대사에 중추적인 역할을 합니다.',
    stats: '재생 능력: 최대 75% 복구 가능'
  },
  {
    id: 'pancreas',
    name: '췌장',
    top: 48,
    left: 58,
    title: 'Pancreas',
    script: '소화 효소와 인슐린 같은 호르몬을 분비합니다. 혈당 조절에 핵심적인 역할을 하며 소화와 대사 모두에 관여합니다.',
    stats: '인슐린 분비 능력: 정상'
  },
  {
    id: 'duodenum',
    name: '십이지장',
    top: 55,
    left: 50,
    title: 'Duodenum',
    script: '위에서 넘어온 산성 음식물을 중화시키고 본격적인 소화가 시작되는 소장의 첫 부분입니다. 손가락 12개를 옆으로 늘어놓은 길이라 하여 붙여진 이름입니다.',
    stats: '길이: 약 25~30cm'
  }
];

export default DiseaseScene;