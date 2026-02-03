// 1. 필요한 도구들을 상단에서 가져오기 (Import)
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import SceneController from './layouts/SceneController.jsx'
import TitleScene from './layouts/TitleScene.jsx';
import Scene1 from './layouts/Scene1.jsx';

const  Scenes = {
    "title": TitleScene,
    "Scene1": Scene1,
    "Scene2": null,
    "Scene3": null,
    "Scene4": null,
    "Scene5": null,
    "Scene6": null,
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