import React, { useState } from 'react';

export function TitleScene({ onSelectGroup }) 
{
  const [hoverLeft,   setHoverLeft] = useState(false);
  const [hoverRight,  setHoverRight] = useState(false);

  return (
   <div style={styles.container}>
      {/* Divide Line */}
      <div style={styles.centerDivider}>
        <span style={styles.vsText}>KOSIS MORTALITY DATA</span>
      </div>

      {/* Disease */}
      <div
        style={{
          ...styles.splitSection,
          ...styles.leftSection,
          ...(hoverLeft ? styles.sectionHover : {}),
          ...(hoverRight ? styles.sectionDimmed : {}), // 반대쪽 호버 시 어둡게 처리
        }}
        onMouseEnter={() => setHoverLeft(true)}
        onMouseLeave={() => setHoverLeft(false)}
        onClick={() => onSelectGroup('Disease')}
      >
        <div style={styles.contentWrapper}>
          <h2 style={styles.subTitle}>Internal Causes</h2>
          <h1 style={styles.mainTitle}>질병</h1>
          <p style={styles.description}>
            암, 심장 질환 등 신체 내부적 요인에 의한<br/>
            사망 원인 데이터를 분석합니다.
          </p>
        </div>
      </div>

      {/* (Accident) */}
      <div
        style={{
          ...styles.splitSection,
          ...styles.rightSection,
          ...(hoverRight ? styles.sectionHover : {}),
          ...(hoverLeft ? styles.sectionDimmed : {}), // 반대쪽 호버 시 어둡게 처리
        }}
        onMouseEnter={() => setHoverRight(true)}
        onMouseLeave={() => setHoverRight(false)}
        onClick={() => onSelectGroup('Accident')}
      >
        <div style={styles.contentWrapper}>
          <h2 style={styles.subTitle}>External Causes</h2>
          <h1 style={styles.mainTitle}>사고</h1>
          <p style={styles.description}>
            교통사고, 추락 등 외부적 요인에 의한<br />
            사망 원인 데이터를 분석합니다.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = 
{
  container: 
  {
    position: 'relative',
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: '#F5F7F9', // Light Clinical Grey
    fontFamily: '"Pretendard", "Malgun Gothic", sans-serif',
  },

  // Both Side Section
  splitSection: 
  {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    
    borderRight: '1px solid rgba(0, 0, 0, 0.08)', 
    
    // css transition
    transition: 'flex 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), background-color 0.4s ease, opacity 0.4s ease',
    backgroundColor: 'transparent', // 기본은 투명 (컨테이너 색상 따라감)
  },

  // Hover Effect
  sectionHover: 
  {
    flex: 1.4, 
    opacity: 1,
    backgroundColor: '#FFFFFF', 
    zIndex: 10,
    boxShadow: '0 0 50px rgba(0,0,0,0.1)',
  },

  // UnHover Effect
  sectionDimmed: 
  {
    opacity: 0.4, 
    filter: 'grayscale(100%)', 
    backgroundColor: '#E9ECEF', 
  },

  contentWrapper: 
  {
    textAlign: 'left',
    maxWidth: '450px',
    padding: '0 3rem', 
    pointerEvents: 'none',
  },

 
  decoLine: 
  {
    width: '50px',
    height: '4px', 
    backgroundColor: '#2D3436',
    marginBottom: '2rem',
  },

  subTitle: 
  {
    fontSize: '0.9rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#636E72', 
    marginBottom: '1rem',
    fontWeight: '600',
  },

  mainTitle: 
  {
    fontSize: '4.5rem', 
    fontWeight: '800', 
    margin: '0 0 1.5rem 0',
    letterSpacing: '-0.03em',
    lineHeight: '1',
    color: '#2D3436', 
  },

  description: 
  {
    fontSize: '1.1rem',
    lineHeight: '1.7',
    color: '#4A4A4A', 
    fontWeight: '400',
    wordBreak: 'keep-all', 
  },

  centerDivider: 
  {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 20,
    pointerEvents: 'none',
  },
  
  vsBadge: 
  {
    padding: '0.8rem 1.2rem',
    borderRadius: '50px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    letterSpacing: '0.1em',
    backgroundColor: '#2D3436', // 뱃지는 반전된 컬러(검정 배경)로 포인트
    color: '#fff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
  }
};

export default TitleScene;