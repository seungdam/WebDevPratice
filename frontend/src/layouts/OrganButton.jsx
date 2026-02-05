import React from 'react';

const OrganButton = ({ 
  organ,          // 장기 데이터 객체 (id, img, top, left, width, height)
  isSelected,     // 현재 선택된 상태인지 (True/False)
  isHovered,      // 현재 마우스가 올라가 있는지 (True/False)
  isDimmed,       // 블러 처리 할 것인지
  onSelect,       // 클릭 이벤트 핸들러
  onHoverChange   // 호버 상태 변경 핸들러
}) => {

  let zIndex;
  
  const getStyles = () => 
  {
    
    if (isSelected) {
      const isBrain = organ.id === 'brain';
      return {
        opacity: 1,
        zIndex: isBrain ? 1 : 20, 
        scale: 1.15, 
        filter: 'brightness(1.1) drop-shadow(0 0 15px rgba(255,255,255,0.6))'
      };
    }

    if (isDimmed) 
    {
      const isBrain = organ.id === 'brain';
      return {
      
        opacity: isBrain ? 0.5 : 0.3, 
        zIndex: isBrain ? 1 : 10, 
        scale: 1,
        filter: 'grayscale(100%) blur(2px)' 
      };
    }

    if (isHovered) 
    {
      const isBrain = organ.id === 'brain';
      return {
        opacity: 1,
        zIndex: isBrain ? 1 : 50, 
        scale: 1.05,
        filter: isBrain 
          ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.1))' 
          : 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))'
      };
    }

    const isBrain = organ.id === 'brain';
    return {
      opacity: 0.9,
      zIndex: organ.zIndex || 10,
      scale: 1,
      // 기본 입체감 그림자
      filter: isBrain 
        ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.05))' 
        : 'drop-shadow(0 8px 12px rgba(0,0,0,0.3))'
    };
  };

  const currentStyle = getStyles();


  return (
    <button
      className="organ-btn-container"
      onClick={() => onSelect(organ)}
      onMouseEnter={() => onHoverChange(organ.id)}
      onMouseLeave={() => onHoverChange(null)}
      style= {{
        position: 'absolute',
        top: `${organ.top}%`,
        left: `${organ.left}%`,
        
        // [수정] 데이터 자체가 % 단위라고 가정
        width: `${organ.width}%`,
        height: `${organ.height}%`,
      
        transform: `translate(-50%, -50%) scale(${currentStyle.scale})`,
        zIndex: currentStyle.zIndex,
        opacity: currentStyle.opacity,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        backgroundColor: 'transparent',
        padding: 0,
        cursor: 'pointer',
        
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <img
        src={organ.img}
        alt={organ.name}
        className="organ-img" 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))', // 기본 그림자
          transition: 'filter 0.3s ease'
        }}
      />
    </button>
  );
};

export default OrganButton;