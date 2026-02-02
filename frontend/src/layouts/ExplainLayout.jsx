import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// props. startPosX/Y, anim Duration 
const PopUpLayout = forwardRef((props, ref) => 
{
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [isOpen, setIsOpen]= useState(false);
  const { contextSafe } = useGSAP({ scope: containerRef, dependencies: [isOpen]});

  // 1. Card layout Animation
  const cardEntrance = () => {
    return gsap.timeline().from(cardRef.current, {
      y: props.startPosY,           // 100px 아래에서
      opacity: 0,       // 투명도 0
      duration: 1,
      ease: "power4.out"
    });
  };
  // 2. Using stragger for sequential animation
  const contentSequence = () => {
    return gsap.timeline().from(".item", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,   // sequentially animating
      ease: "power3.out"});
  };

  // For External Reference
  useImperativeHandle(ref, () => ({
    open: () => {
      console.log("open");
      setIsOpen(true);
      setTimeout(playEntrance, 0); // 렌더링 직후 애니메이션 실행
    },
    close: () => {
      exitEntrance();
    }
  }));

  const playEntrance = contextSafe(()=> {
    if (!cardRef.current) return;
    const master = gsap.timeline();
    master.add(cardEntrance()).add(contentSequence(), "-=0.4");
  });

  const exitEntrance = contextSafe(() => {
    if(!isOpen) return;
    gsap.timeline({ onComplete: () => setIsOpen(false) })
      .to(".item", { opacity: 0, y: -10, duration: 0.3, stagger: 0.05 })
      .to(cardRef.current, { width: 0, opacity: 0, duration: 0.5, ease: "power3.in" }, "-=0.2");
  });

  if (!isOpen) return null;
  return (
    <div ref={containerRef} style={styles.wrapper}>
      <div ref={cardRef} style={styles.card}>
        <h2 className="item" style={styles.title}>심장 질환 정보</h2>
        <div className="item" style={styles.divider}>통계자료</div>
        <p className="item" style={styles.text}>Context Loading Sequentially</p>
        <p className="item" style={styles.text}>By Using GSAP Timeline Sequence</p>
        <button className="item" onClick={exitEntrance} style={styles.button}>닫기</button>
      </div>
    </div>
  );
});

// Layout styles
const styles = {
  wrapper: {
    position: 'absolute',          // ✅ fixed → absolute (contents 기준)
    bottom: '50%',                 // ✅ contents 중앙(버튼 위치) 기준
    left: '50%',
    transform: 'translate(-50%, -60px)', // ✅ 중앙 정렬 + 버튼 위 60px
    width: '90%',
    maxWidth: '500px',
    pointerEvents: 'none',
    zIndex: 2                      // 버튼보다 위
  },

  card: {
    pointerEvents: 'auto',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '16px',          // ✅ 전체 둥글게 (바텀시트 아니니까)
    padding: '30px 25px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
    
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    
    transform: 'translateY(0)',
    opacity: 1
  },

  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center'
  },

  divider: {
    width: '100%',
    padding: '10px 0',
    borderTop: '2px solid #ff6b6b',
    borderBottom: '2px solid #ff6b6b',
    fontSize: '13px',
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    letterSpacing: '0.5px'
  },

  text: {
    margin: 0,
    fontSize: '15px',
    lineHeight: '1.5',
    color: '#555',
    textAlign: 'center'
  },

  button: {
    marginTop: '8px',
    padding: '12px 36px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    alignSelf: 'center'
  }
};

export default PopUpLayout;