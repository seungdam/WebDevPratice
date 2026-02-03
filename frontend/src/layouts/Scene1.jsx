import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { popUpCard } from '../animation/popup.js';

const Scene1 = () => {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const infoCardRef = useRef(null);
  const tlRef = useRef(null);

  const handleOrganClick = (organ) => {
    setSelected(organ);
    if (!isOpen) setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (tlRef.current) tlRef.current.kill();

      const animSequence = gsap.timeline();
      tlRef.current = animSequence;

      if (isOpen) {
        // [OPEN Sequence]
        animSequence.to(leftRef.current, {
          flex: 4, // 원본 styles.leftLayout 값
          duration: 0.6,
          ease: "power2.inOut"
        });

        animSequence.to(rightRef.current, {
          flex: 6, // 원본 styles.rightLayout 값
          duration: 0.6,
          ease: "power2.inOut"
        }, "<");

        if (infoCardRef.current) {
          animSequence.set(infoCardRef.current, { visibility: 'visible' });
          
          animSequence.add(popUpCard(infoCardRef.current, ".infoItem", {
            transform: {
              dir: { x: 0, y: 1 },
              distance: 60
            },
            time: {
              cardDuration: 0.5,
              stagger: 0.1
            }
          }), "-=0.3");
        }

      } else {
        // [CLOSE Sequence] - 역순 재생
        if (infoCardRef.current) {
          animSequence.to(".infoItem", {
            opacity: 0,
            y: 60, 
            duration: 0.4,
            stagger: { amount: 0.1, from: "end" }, // 아래에서부터 사라짐
            ease: "power2.in"
          });

          animSequence.to(infoCardRef.current, {
            opacity: 0,
            duration: 0.3
          }, "<+=0.2");

          animSequence.set(infoCardRef.current, { visibility: 'hidden' });
        }

        // Layout Restore
        // React 간섭 없이 GSAP가 부드럽게 0.0001로 돌려놓음
        animSequence.to(rightRef.current, {
          flex: 0.0001,
          duration: 0.6,
          ease: "power2.inOut"
        });

        animSequence.to(leftRef.current, {
          flex: 1, // 중앙 복귀를 위해 1로 설정
          duration: 0.6,
          ease: "power2.inOut"
        }, "<");
      }
    }, containerRef);

    return () => {
        if (tlRef.current) tlRef.current.kill();
    };
  }, [isOpen]);

  return (
    <div className="scene1" style={styles.scene1} ref={containerRef}>
      <div className="SceneLable">
        <h1>Human Anatomy Analysis</h1>
      </div>

      <div className="layoutContainer" style={styles.layoutContainer}>
        <article
          style={{
            ...styles.leftLayout,
            flex: 1, 
            justifyContent: 'center',
            alignItems: 'center'
          }}
          ref={leftRef}
        >
          {ORGAN_DATA.map((organ) => (
            <button
              key={organ.id}
              style={styles.organBtn(organ.top, organ.left)}
              onClick={() => handleOrganClick(organ)}
            >
              {organ.name}
            </button>
          ))}
        </article>

        {/* [Right Panel] 
            isOpen ? 6 : 0.0001 <-- 이 조건문을 제거했습니다.
            React는 항상 '닫힌 상태'만 유지하려 하고, GSAP가 강제로 열고 닫습니다.
        */}
        <article
          style={{
            ...styles.rightLayout,
            flex: 0.0001,
            overflow: 'hidden',
            opacity: 1
          }}
          ref={rightRef}
        >
          <div
            className="infoLayer"
            ref={infoCardRef}
            style={{
              ...styles.infoCard,
              visibility: 'hidden',
              opacity: 0
            }}
          >
            <h2 className="infoItem" style={styles.title}>{selected?.title}</h2>
            <p className="infoItem" style={styles.script}>{selected?.script}</p>
            <div className="infoItem" style={styles.stats}>{selected?.stats}</div>

            <button
              className="infoItem"
              onClick={handleClose}
              style={styles.closeBtn}
            >
              Close
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

// ... (styles와 DATA는 기존과 동일하여 생략)
const styles = {
  scene1: {
    width: "100%", 
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  
  layoutContainer: {
    position: "relative",
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: "100%", 
    height: "85%",
    display: "flex",
    flexDirection: 'row',
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid",
    color: "black",
    gap: "2vw"
  },

  leftLayout: {
    position: "relative",
    backgroundColor: "#D3D3D3", 
    flex: "4",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    borderRadius: "10px",
    border: "1px solid",
    color: "red"
  },

  rightLayout: {
    position: 'relative',
    backgroundColor: "#D3D3D3", 
    flex: "6",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    borderRadius: "10px",
    border: "1px solid",
    color: "red"
  },

  infoCard: { 
    padding: '40px',
    backgroundColor: '#fff',
    border: '2px solid #333',
    borderRadius: '15px'
  },

  organBtn: (top, left) => ({
    position: 'absolute',
    top: `${top}%`,
    left: `${left}%`,
    transform: 'translate(-50%, -50%)',
    padding: '10px 18px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '2px solid #333',
    borderRadius: '30px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.2s ease'
  }),
  
  closeBtn: {
    marginTop: '20px',
    padding: '10px 18px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
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

export default Scene1;