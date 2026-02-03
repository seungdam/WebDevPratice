// 1. 필요한 도구들을 상단에서 가져오기 (Import)
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import SceneController from './layouts/SceneController.jsx'
import TitleScene from './layouts/TitleScene.jsx';
import Scene1 from './layouts/Scene1.jsx';
import Scene2 from './layouts/Scene2.jsx';
import Scene3 from './layouts/Scene3.jsx';
import Scene4 from './layouts/Scene4.jsx';
import Scene5 from './layouts/Scene5.jsx';
import Scene6 from './layouts/Scene6.jsx';

const  Scenes = {
    "title": TitleScene,
    "Scene1": Scene1,
    "Scene2": Scene2,
    "Scene3": Scene3,
    "Scene4": Scene4,
    "Scene5": Scene5,
    "Scene6": Scene6,
}

// 2. 컴포넌트 함수 정의
function App() 
{
  return ( <SceneController scenes={Scenes} />);
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
    backgroundColor: '#f9f9fa',
  }
};






// 4. 이 컴포넌트를 밖으로 내보내기
export default App;