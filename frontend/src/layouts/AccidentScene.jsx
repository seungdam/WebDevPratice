import React from 'react';
import PopUpScrollSection from '../animation/FadeInSection.jsx'; 
import RankingChart from '../chart/RankingChart.jsx'; 
import TrendLineChart from '../chart/TrendChart.jsx'; 

import TrafficImg from '../assets/background/transport.jpg'; 
import FallImg from '../assets/background/Fall.jpg';
import SuicideImg from '../assets/background/Suicide.jpg'; 
import NatureImg from '../assets/background/Nature.jpg';
//import MechImg from '../assets/background/Mechanical.png'; 
import HomicideImg from '../assets/background/Homicide.jpg';
import DrownImg from '../assets/background/Drowning.png';
import FireImg from '../assets/background/Fire.jpg';
const ACCIDENT_SECTIONS = 
[
    {
      key: 'transport',
      title: 'Transport Accidents',
      subTitle: '운수 및 교통 사고',
      descTitle: '도로 위의 예기치 못한 위협',
      desc: '차량, 오토바이, 보행 중 발생하는 운수 사고는 전 연령층에서 주요 사망 원인 중 하나입니다. 연도별 추이와 연령대별 위험도를 분석합니다.',
      img: TrafficImg,
      targetAge: '20-29세' // 트렌드 차트 기본 타겟 연령
    },
    {
      key: 'falls',
      title: 'Falls',
      subTitle: '추락 및 낙상',
      descTitle: '생활 속 높이의 위험',
      desc: '고령층의 낙상 사고와 건설 현장 등에서의 추락 사고는 심각한 신체 손상과 높은 치명률을 보입니다.',
      img: FallImg,
      targetAge: '70-79세'
    },
    {
      key: 'suicide',
      title: 'Intentional Self-harm',
      subTitle: '고의적 자해 (자살)',
      descTitle: '마음의 병과 사회적 손실',
      desc: '사회적, 심리적 요인에 기인한 고의적 자해는 청년층과 노년층 모두에서 심각한 사회 문제입니다.',
      img: SuicideImg, // (임시) 적절한 이미지로 교체 권장
      targetAge: '30-39세'
    },
    {
      key: 'fire',
      title: 'Exposure to Fire',
      subTitle: '화재 및 연기 노출',
      descTitle: '불길과 유독 가스의 위협',
      desc: '건물 화재 및 폭발 사고로 인한 직접적인 화상과 연기 흡입에 의한 사망 원인을 분석합니다.',
      img: FireImg, // (임시)
      targetAge: '40-49세'
    },
    {
      key: 'drowning',
      title: 'Accidental Drowning',
      subTitle: '익사 및 물애 빠짐',
      descTitle: '수상 활동과 안전',
      desc: '여름철 물놀이 사고 및 해상 작업 중 발생하는 익사 사고 데이터를 분석합니다.',
      img: DrownImg, 
      targetAge: '10-19세'
    },
    {
      key: 'mechanical',
      title: 'Mechanical Forces',
      subTitle: '기계적 힘에 노출',
      descTitle: '산업 현장의 위험',
      desc: '공장, 건설 현장에서 기계 장치나 물체에 의한 충격, 끼임 등으로 발생하는 사고입니다.',
      img: HomicideImg, // (임시)
      targetAge: '50-59세'
    },
    {
      key: 'homicide',
      title: 'Assault',
      subTitle: '타살 (폭행)',
      descTitle: '타인에 의한 신체적 위해',
      desc: '폭행, 살인 등 타인의 의도적인 힘의 행사에 의한 사망 원인을 분석합니다.',
      img: HomicideImg, // (임시)
      targetAge: '20-29세'
    },
    {
      key: 'nature',
      title: 'Forces of Nature',
      subTitle: '자연의 힘에 노출',
      descTitle: '자연 재해와 환경',
      desc: '홍수, 지진, 낙뢰, 폭염 및 한파 등 통제 불가능한 자연환경 요인에 의한 사고입니다.',
      img: NatureImg, // (임시)
      targetAge: '80세이상'
    }
  ];


const AccidentScene = () => 
{
 
  return (
    <div style={styles.container}>
      
      {/* ─── Header Section ─── */}
      <div style={styles.header}>
        <h2 style={styles.headerSub}>External Causes Analysis</h2>
        <h1 style={styles.headerTitle}>사고 및 외부 요인</h1>
        <p style={styles.headerDesc}>
          신체 외부의 물리적 충격이나 환경적 요인에 의한<br />
          사망 원인 데이터를 심층 분석합니다.
        </p>
      </div>

      {/* ─── Loop Sections ─── */}
      {
        ACCIDENT_SECTIONS.map((section, index) => 
        {
          const isLeftImage = index % 2 === 0;

          return (
            <div key={section.key} style={isLeftImage ? styles.row : styles.rowReverse}>
            
              {/* 1. 이미지 카드 영역 */}
              <div style={styles.col}>
                <PopUpScrollSection direction={isLeftImage ? "left" : "right"}>
                  <div style={styles.imageCard}>
                    <div style={{ ...styles.imageBg, backgroundImage: `url(${section.img})` }} />
                    <div style={styles.overlay}>
                      <h3 style={styles.cardTitle}>{section.title}</h3>
                      <p style={styles.cardDesc}>{section.subTitle}</p>
                      <div style={styles.decoLine} />
                    </div>
                  </div>
                </PopUpScrollSection>
              </div>

            {/* 2. 컨텐츠 & 차트 영역 */}
              <div style={styles.col}>
                <PopUpScrollSection direction={isLeftImage ? "right" : "left"} delay={0.2}>
                  <div style={styles.contentCard}>
                    <h3 style={styles.sectionTitle}>{section.descTitle}</h3>
                    <p style={styles.sectionText}>{section.desc}</p>

                    {/* 랭킹 차트 */}
                    <div style={styles.chartWrapper}>
                      <RankingChart selectedObject={section.key} />
                    </div>

                    {/* 트렌드 차트 */}
                    <div style={{ marginTop: '20px' }}>
                      <TrendLineChart 
                        selectedObject={section.key} 
                      /> 
                    </div>
                  </div>
                </PopUpScrollSection>
              </div>
            </div>
          );
      })}

      {/* Footer Space */}
      <div style={{ height: '100px' }} />

    </div>
  );
};

const styles = 
{
  container: 
  {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa', 
    padding: '75% 5% 0 5%', // 하단 패딩은 footer space로 대체
    boxSizing: 'border-box',
    overflowX: 'hidden', 
  },
  
  // 헤더 스타일
  header: 
  {
    textAlign: 'center',
    marginBottom: '120px',
  },
  headerSub: 
  {
    fontSize: '1rem',
    color: '#1976d2', 
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '10px',
  },
  headerTitle: 
  {
    fontSize: '3rem',
    fontWeight: '800',
    color: '#212529',
    marginBottom: '20px',
  },
  headerDesc: 
  {
    fontSize: '1.1rem',
    color: '#868e96',
    lineHeight: '1.6',
  },

  // 레이아웃 그리드
  row: 
  {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap', 
    gap: '40px',
    marginBottom: '160px', // 섹션 간 간격 더 넓게
    alignItems: 'center',
  },
  rowReverse: 
  {
    display: 'flex',
    flexDirection: 'row-reverse', // ★ 핵심: 반대 방향 배치
    flexWrap: 'wrap',
    gap: '40px',
    marginBottom: '160px',
    alignItems: 'center',
  },
  col: 
  {
    flex: 1,
    minWidth: '400px', // 차트가 너무 찌그러지지 않게 최소 너비 확보
  },

  // 이미지 카드
  imageCard: 
  {
    width: '100%',
    height: '650px', // 조금 더 길게
    borderRadius: '24px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)', 
  },
  imageBg: 
  {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.5s ease', 
  },
  overlay: 
  {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '60%', 
    background: 'linear-gradient(to top, rgba(21, 101, 192, 0.95), transparent)', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '40px',
    boxSizing: 'border-box',
  },
  cardTitle: 
  {
    color: '#fff',
    fontSize: '2.4rem',
    fontWeight: '800',
    marginBottom: '8px',
    fontFamily: '"Oswald", sans-serif', 
    lineHeight: 1.1,
  },
  cardDesc: 
  {
    color: 'rgba(255,255,255,0.9)',
    fontSize: '1.2rem',
    fontWeight: '500',
    marginTop: '5px'
  },
  decoLine: 
  {
    width: '60px',
    height: '5px',
    backgroundColor: '#fff', 
    marginTop: '25px',
    borderRadius: '3px',
  },

  // 컨텐츠 카드
  contentCard: 
  {
    backgroundColor: '#fff',
    borderRadius: '24px',
    padding: '50px',
    boxShadow: '0 10px 40px rgba(33, 150, 243, 0.08)', 
    border: '1px solid rgba(33, 150, 243, 0.1)',
  },
  sectionTitle: 
  {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#212529',
    marginBottom: '20px',
    borderLeft: '6px solid #1976d2', 
    paddingLeft: '20px',
  },
  sectionText: 
  {
    fontSize: '1.05rem',
    color: '#495057',
    lineHeight: '1.7',
    marginBottom: '40px',
  },
  chartWrapper: 
  {
    height: '500px', 
    position: 'relative',
    width: '100%',
  }
};

export default AccidentScene;