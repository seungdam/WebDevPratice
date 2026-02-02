import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function TitleScene({ onSelectGroup }) {
  return (
    <div className="title-container">
      <h1>Title Scene</h1>
      <div className="button-group">
        <button onClick={() => onSelectGroup('A')}>Group A 보기</button>
        <button onClick={() => onSelectGroup('B')}>Group B 보기</button>
      </div>
    </div>
  );
}
const styles = {
  wrapper: {
    position: 'absolute',          // ✅ fixed → absolute (contents 기준)
    transform: 'translate(-50%, -50px)', // ✅ 중앙 정렬 + 버튼 위 60px
    width: '100%',
    maxWidth: '500px',
  },

  menu_buttonA: {

  },

  menu_buttonB: {

  }
};

export default TitleScene;