import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import * as MyAnim from "../animation/AnimCommon.js"
import { popUpCard } from '../animation/PopUpAnimation.js'; 
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import FadeInSection from './FadeInSection.jsx';
import OrganButton from './OrganButton.jsx'


gsap.registerPlugin(ScrollToPlugin);

import imgBrain from  '../assets/brain2.png';
import imgLung from   '../assets/lung2.png';
import imgHeart from  '../assets/heart2.png';
import imgLiver from  '../assets/liver2.png'; // river.png -> Liver로 사용
import imgDigest from '../assets/digestive2.png';
import imgKidney from '../assets/urology2.png';
import imgEndo from   '../assets/Endocrine2.png';
import imgRepro from  '../assets/man2.png'; // 또는 여성.png



const ORGAN_DATA = 
[
  { 
    id: 'brain', 
    name: 'Nervous System', 
    title: 'Nervous System', 
    script: '뇌와 신경계 데이터 분석', 
    img: imgBrain, 
    top: 63,       
    left: 50,      
    width: 500,    
    height: 600,   
    zIndex: 1     
  },

  { 
    id: 'lungs', 
    name: 'Lungs', 
    title: 'Respiratory System', 
    script: '호흡기계 질환 분석', 
    img: imgLung, 
    top: 40,       
    left: 50,      
    width: 200,    
    height: 200,
    zIndex: 10
  },
  { 
    id: 'heart', 
    name: 'Heart', 
    title: 'Cardiovascular System', 
    script: '심혈관계 질환 분석', 
    img: imgHeart, 
    top: 60,       
    left: 70,      
    width: 100,    
    height: 100,
    zIndex: 11     
  },

  // [상복부] 간과 내분비(췌장)
  { 
    id: 'liver', 
    name: 'Liver', 
    title: 'Hepatic System', 
    script: '간 및 대사 질환 분석', 
    img: imgLiver, 
    top: 60,     
    left: 45,    
    width: 130, 
    height: 100,
    zIndex: 10
  },
  { 
    id: 'endocrine', 
    name: 'Endocrine', 
    title: 'Endocrine System', 
    script: '췌장 및 내분비계 분석', 
    img: imgEndo, 
    top: 60,      
    left: 35,     
    width: 90, 
    height: 70,
    zIndex: 10
  },

  // [중복부] 소화기와 신장
  { 
    id: 'digestive', 
    name: 'Digestive', 
    title: 'Digestive System', 
    script: '소화기계 질환 분석', 
    img: imgDigest, 
    top: 80,      
    left: 50,     
    width: 100, 
    height: 500,
    zIndex: 12    
  },
  { 
    id: 'kidney', 
    name: 'Kidneys', 
    title: 'Urinary System', 
    script: '신장 및 비뇨기계 분석', 
    img: imgKidney, 
    top: 120,       
    left: 50,      
    width: 300, 
    height: 200,
    zIndex: 9    
  },

  { 
    id: 'repro', 
    name: 'Reproductive', 
    title: 'Reproductive System', 
    script: '생식기계 질환 분석', 
    img: imgRepro, 
    top: 90,      
    left: 0,     
    width: 300, 
    height: 300,
    zIndex: 10
  }
];


const DiseaseScene = () => 
{
  const [selected, setSelected] = useState(null);
  const isOpen = !!selected;

  const rightPanelRef =useRef(null);
  const [hoveredId, setHoveredId] = useState(null); // z-index 제어용
  const contentRef = useRef(null);

  // Contents Animation
  useEffect(() => 
  {
    if (!isOpen || !contentRef.current) // idle state
    {
      return;
    }
    // 2. Kill prev-rendering animation (빠르게 다른 장기 클릭 시 꼬임 방지)
    let ctx = gsap.context(() => 
    {  
      if(isOpen && contentRef.current)
      // 3. Pre-defined PopUp animation function
      // CSS Transition과 타이밍 맞추기 유용함.
      popUpCard(contentRef.current, ".popUpItem", 
      {
        transform: 
        { 
          yOffset: 60, // 아래에서 위로
          scale: 0.95 
        },
        time: 
        {
          delay: 0.4, // 패널이 어느정도 열린 뒤 시작
          stagger: 0.1, // stagger: 아이템이 다닥다닥뜨는 효과
          cardDuration: 0.6,
          itemDuration: 0.5,
          ease: "back.out(1.2)" // 살짝 튕기는 맛
        }
      });

    }, contentRef); // Scope 지정

    return () => ctx.revert(); // CleanUp

  }, [selected]); // selected가 바뀔 때마다 실행 (심장 -> 뇌 클릭 시 다시 재생)


  // Plan: 닫을 시, Scrolling
  const hOrganClick = (organ) => 
  {
    const nextSelected = selected?.id === organ.id ? null : organ;
    setSelected(nextSelected); // 같은거 Select 시 닫기
    
    if(rightPanelRef.current)
    {
      gsap.to(rightPanelRef.current, 
      {
      duration: 0.8, 
      scrollTo: { y: 0 },
      ease: MyAnim.EASING.smooth,
      overwrite: "auto"
      });
    }
  }
  return (
    <div className="container" style={styles.container}>
      {/* Scene Title*/}
      <div className="titleLabel" style={styles.titleLabel}>
        <h1>Human Anatomy Analysis</h1>
      </div>

      <div style= {styles.panelContainer}>
      {/* Left Panel*/}
      <aside
          className="leftStickyPanel"  // 
          style={{
            ...styles.leftStickyPanel,      // Panel Flex Animation: 열리면 4, 닫히면 10
            flex: isOpen ? 4 : 10, 
          }}
      >
          <div style={styles.visualWrapper}>
            <div style={{...styles.bodyMapPlaceholder,
              transform: isOpen ? 'scale(0.7)' : 'scale(1)',
              transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)'}
            } 
          >
                
            {/*Organ Buttons*/}
            {ORGAN_DATA.map((organ) => 
            {
              const isSelected = selected?.id === organ.id;
              const isDimmed = isOpen && !isSelected; 

            return (
              <OrganButton
                key={organ.id} organ={organ}
                isSelected={isSelected}
                isDimmed={isDimmed}  
                isHovered={hoveredId === organ.id}
                onSelect={hOrganClick}
                onHoverChange={setHoveredId}
              />);

            })}

          </div>
          {/* State Message */}
           {!isOpen && (
             <p style={styles.guideText}>
               분석하고 싶은 장기를 선택하세요.
             </p>
           )}
        </div>
      </aside>

      {/*Right Panel: Info*/}
      <main
        ref={rightPanelRef}
        className="rightContentPanel"
        style={{
            ...styles.rightContentPanel,
            flex: isOpen ? 6 : 0.0001,  // 열리면 6, 닫히면 거의 0
            opacity: isOpen ? 1 : 0,    // 닫힐 때 내용물 바로 안 보이게 처리
            pointerEvents: isOpen ? 'auto' : 'none', 
            
        }}
      >
        {/* GSAP Target Wrapper */}
        {selected && (
        <div className="contentPanel" style={styles.articleContainer} ref={contentRef}>    
          {/* Header Section */}
            <div className="popUpItem">
              <header style={styles.articleHeader}>
                <span style={styles.tag}>MORTALITY DATA</span>
                <h1 style={styles.mainTitle}>{selected.title}</h1>
                <p style={styles.introScript}>{selected.script}</p>
              </header>
              <div style={styles.divider}></div>
            </div>

            {/* Key Statistics Section */}
            <section className="popUpItem" style={styles.section}>
              <h3 style={styles.subTitle}>Key Statistics</h3>
              <div style={styles.statBox}>
                  <div style={styles.statRow}>
                    <span>연간 사망자 수</span>
                    <strong style={{color: '#e17055'}}>14,203명</strong>
                  </div>
                  <div style={styles.statRow}>
                    <span>주요 원인</span>
                    <strong>{selected.name}암, 만성질환</strong>
                  </div>
              </div>
            </section>

            {/* Chart Section */}
            <FadeInSection>
              <section className="popUpItem" style={styles.section}>
                <h3 style={styles.subTitle}>Annual Trend</h3>
                <div style={styles.chartPlaceholder}>
                    <p> Chart Area</p>
                </div>
              </section>
            </FadeInSection>

            {/* Analysis Text */}
            <FadeInSection>
              <section className="popUpItem" style={styles.section}>
                <h3 style={styles.subTitle}>Medical Analysis</h3>
                <p style={styles.longText}>
                  해당 질병은 조기 발견 시 생존율이 높으나, 초기 증상이 미미하여...
                  (스크롤을 내리면 계속 이어지는 긴 텍스트)
                </p>
              </section>
            </FadeInSection>
            
            {/* Footer Padding */}
            <div style={{height: '100px'}}></div>    
        </div>
        )} 
      </main>
      </div>
    </div>
  );
};

const styles = 
{
  container: 
  {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F5F7F9",
    fontFamily: '"Pretendard", sans-serif',
  },
  
  titleLabel: 
  {
    padding: '20px',
    backgroundColor: "#F5F7F9",
  },

  panelContainer: 
  {
    width: "100%", 
    display: "flex", 
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F5F7F9",
    fontFamily: '"Pretendard", sans-serif',
  },

  // [Left Panel] : 장기 모형
  leftStickyPanel: 
  {
    // Plan: leftPanel은 sticky로 레이아웃 고정
    position: "sticky",
    top: 0,
    height: "calc(100vh)",

    // Plan: 레이아웃 배치 변환은 복잡한 GSAP 대신 CSS Transition 활용
    transition: "flex 0.8s cubic-bezier(0.25, 1, 0.5, 1)", 
    display: "flex", 
    
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#Eaecef", // 배경색 살짝 변경
    
    zIndex: 10,
    borderRight: '1px solid rgba(0,0,0,0.05)',
  },

  guideText: 
  {
    marginTop: '9rem',
    color: '#636E72',
    fontWeight: 600,
    animation: 'fadeIn 1s ease',
    zIndex: 30
  },

  // [Right Panel]: 통계 자료 및 콘텐츠
  rightContentPanel: 
  {
    // Flex + Opacity 변화 동시에
    transition: "flex 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    minHeight: "100vh",
    overflowY: "auto",
    overflowX: "hidden",
  },
  
  visualWrapper: 
  {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bodyMapPlaceholder: 
  {
    width: '300px',
    height: '500px',
    position: 'relative',
    // backgroundImage: 'url(...)', // Plan: 인체 실루엣 추가 예정
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },

  articleContainer: 
  {
    width: '100%',
    maxWidth: '1280px', // 가독성을 위한 최대 너비 제한
    padding: '80px 40px', // 넉넉한 상하 패딩
    display: 'flex',
    flexDirection: 'column',
    gap: '60px', // 섹션 간 간격
  },

  // organBtn: (top, left) => ({
  //   position: 'absolute',
  //   top: `${top}%`, left: `${left}%`,
  //   transform: 'translate(-50%, -50%)',
  //   padding: '10px 20px',
  //   backgroundColor: '#fff',
  //   border: '1px solid rgba(0,0,0,0.1)',
  //   borderRadius: '30px',
  //   cursor: 'pointer',
  //   fontWeight: 'bold',
  //   boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  //   transition: 'all 0.3s ease', // 버튼 자체의 호버/딤 효과는 CSS로
  //   zIndex: 10
  // }),

  organBtn: (top, left, width, height, zIndex) => ({
    position: 'absolute',
    top: `${top}%`, 
    left: `${left}%`,
    transform: 'translate(-50%, -50%)',
    
    width: `${width}px`,  
    height: `${height}px`,
    
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    

    backgroundColor: 'transparent', 
    border: 'none', 
    backdropFilter: 'none', 
    boxShadow: 'none', 
    
    padding: '0',
    
    cursor: 'pointer',
    zIndex: zIndex, 
    
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    
    WebkitTapHighlightColor: 'transparent', 
  }),

  // [수정] 이미지 아이콘: 버튼을 가득 채우도록 변경
  organIcon: {
    width: '100%',     // 너비 꽉 채움
    height: '100%',     // 높이의 85% 차지 (나머지 15%는 텍스트)
    objectFit: 'contain', // 비율 유지하면서 꽉 차게
    filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.2))', // 이미지 자체 그림자 (입체감)
    marginBottom: '5px'
  },


  articleHeader: { marginBottom: '20px' },
  tag: { fontSize: '0.8rem', fontWeight: 800, color: '#b2bec3', letterSpacing: '0.1em' },
  mainTitle: { fontSize: '3.5rem', fontWeight: 800, color: '#2d3436', margin: '10px 0 20px 0', lineHeight: 1 },
  introScript: { fontSize: '1.2rem', lineHeight: '1.7', color: '#636e72' },
  divider: { width: '100%', height: '1px', backgroundColor: '#dfe6e9' },
  section: { display: 'flex', flexDirection: 'column', gap: '20px' },
  subTitle: { fontSize: '1.5rem', fontWeight: 700, color: '#2d3436', borderLeft: '4px solid #2d3436', paddingLeft: '15px' },
  statBox: { backgroundColor: '#F8F9FA', padding: '30px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '15px' },
  statRow: { display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', borderBottom: '1px dashed #dfe6e9', paddingBottom: '10px' },
  chartPlaceholder: { width: '100%', height: '300px', backgroundColor: '#fff', border: '2px solid #f1f2f6', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#b2bec3' },
  longText: { fontSize: '1.1rem', lineHeight: '1.8', color: '#4a4a4a', wordBreak: 'keep-all' },  
  closeBtn: 
  {
    padding: '10px 20px', alignSelf: 'flex-start',
    backgroundColor: '#2d3436', color: '#fff',
    border: 'none', borderRadius: '5px', cursor: 'pointer'
  }
};


export default DiseaseScene;