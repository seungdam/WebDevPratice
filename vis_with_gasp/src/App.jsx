// 1. 필요한 도구들을 상단에서 가져오기 (Import)
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import Buttons from './buttons/ShakingButtons.jsx'
import StatisticLayout from './layouts/ExplainLayout.jsx';


// 2. 컴포넌트 함수 정의
function App() 
{
  const statsRef = useRef(null);
  const hButtonAction = () => {
      statsRef?.current.open(); 
  };

  return (
      <div className="app-container" style={styles.appContainer}>
        <h1>GSAP Sample</h1>      
        <div style={styles.contents}>
          <StatisticLayout ref={statsRef} startPosY={50} />
          <Buttons onTrigger={hButtonAction} scale={1.2} intensity={5} />
        </div>
      </div>
  );
}

// App.jsx styles
const styles = {
  appContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden'
  },

  contents: {
    position: 'relative',          // 버튼과 Layout 모두의 기준점
    width: '100%',
    maxWidth: '1200px',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',      // 버튼 가로 중앙
    alignItems: 'center',          // 버튼 세로 중앙
  }
};






// 4. 이 컴포넌트를 밖으로 내보내기
export default App;