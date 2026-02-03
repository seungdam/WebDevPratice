import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Background from 'three/src/renderers/common/Background.js';

export function TitleScene({ onSelectGroup }) {
  return (
    <div className="title-container">
      <h1>Title Scene</h1>
      <div className="button-group">
        <button styles={styles.menu_selection_button} onClick={() => onSelectGroup('A')}>Group A 보기</button>
        <button styles={styles.menu_selection_button} onClick={() => onSelectGroup('B')}>Group B 보기</button>
      </div>
    </div>
  );
}
const styles = {
  wrapper: {
    position: 'relative',    
    transform: 'translate(-50%, -50px)', // ✅ 중앙 정렬 + 버튼 위 60px
    width: '100%'
  },

  menu_selection_button: {
      backGroundColoer: '#3B82F6'
  },
};

export default TitleScene;