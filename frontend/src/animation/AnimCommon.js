export const EASING = {
  smooth: "power2.out",
  snappy: "power3.out",
  bouncy: "back.out(1.4)",
  elastic: "elastic.out(1, 0.5)",
  sharp: "power4.out",

  scenematic: "power2.inOut",
  dramatic: "power3.inOut"
};

export const DIRECTION = {
  LEFT_TO_RIGHT: 'LTR', 
  RIGHT_TO_LEFT: 'RTL', 
  TOP_TO_BOTTOM: 'TTB', 
};

export const DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2
};

export const getElementInfo = (element) => {
  const rect = element.getBoundingClientRect();
  const computed = window.getComputedStyle(element);
  
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
    marginTop: parseFloat(computed.marginTop),
    marginBottom: parseFloat(computed.marginBottom),
    marginLeft: parseFloat(computed.marginLeft),
    marginRight: parseFloat(computed.marginRight)
  };
};

export const getDistance = (elem1, elem2) => {
  const rect1 = elem1.getBoundingClientRect();
  const rect2 = elem2.getBoundingClientRect();
  
  return {
    x: rect2.left - rect1.left,
    y: rect2.top - rect1.top
  };
};