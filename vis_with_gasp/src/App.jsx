// 1. 필요한 도구들을 상단에서 가져오기 (Import)
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// 2. 컴포넌트 함수 정의
function App() {
  const containerRef = useRef(null);
  const boxRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleClick = contextSafe(() => {
    gsap.to(boxRef.current, { rotation: "+=360", duration: 1 });
  });

  // 3. UI 구조 내보내기 (Return)
  return (
    <div ref={containerRef} className="app-container">
      <h1>나의 첫 GSAP 상호작용</h1>
      <button onClick={handleClick}>박스 돌리기</button>
      
      <div ref={boxRef} className="box">
        ROLL
      </div>

      <style>{`
        .app-container { 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          height: 100vh; 
        }
        .box { 
          width: 100px; height: 100px; 
          background: skyblue; 
          margin-top: 20px; 
          display: flex; align-items: center; justify-content: center;
          font-weight: bold; border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

// 4. 이 컴포넌트를 밖으로 내보내기
export default App;