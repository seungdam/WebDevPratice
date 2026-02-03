import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Background from 'three/src/renderers/common/Background.js';

export function TitleScene({ onSelectGroup }) {
  return (
    <div className="titleContainer">
      <h1>Title Scene</h1>
      <div className="buttonGroup">
        <button style={styles.menuSelectButton} onClick={() => onSelectGroup('A')}>질병 탭 보기</button>
        <button style={styles.menuSelectButton} onClick={() => onSelectGroup('B')}>사고 탭 보기</button>
      </div>
    </div>
  );
}
const styles = {
  menuSelectButton: {
      backGroundColoer: '#3B82F6'
  },
};

export default TitleScene;