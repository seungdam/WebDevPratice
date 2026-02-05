import imgBrain from  '../assets/Brain.png';
import imgLung from   '../assets/Lung.png';
import imgHeart from  '../assets/Heart.png';
import imgLiver from  '../assets/Liver.png'; // river.png -> Liver로 사용
import imgDigest from '../assets/Digestive.png';
import imgKidney from '../assets/Urology.png';
import imgEndo from   '../assets/Endocrine.png';

export const ORGAN_DATA = 
[
  { 
    id: 'brain', 
    name: 'Nervous System', 
    title: 'Nervous System', 
    script: '뇌와 신경계 데이터 분석', 
    img: imgBrain, 
    top: 63,       
    left: 50,      
    width: 300,    
    height: 600,   
    zIndex: 1     
  },

  { 
    id: 'lungs', 
    name: 'Lungs', 
    title: 'Respiratory System', 
    script: '호흡기계 질환 분석', 
    img: imgLung, 
    top: 50,       
    left: 50,      
    width: 200,    
    height: 200,
    zIndex: 10
  },
  { 
    id: 'heart', 
    name: 'Heart', 
    title: 'Cardiovascular System', 
    script: '심혈관계 질환 분석', 
    img: imgHeart, 
    top: 70,       
    left: 90,      
    width: 120,    
    height: 120,
    zIndex: 12     
  },

  // [상복부] 간과 내분비(췌장)
  { 
    id: 'liver', 
    name: 'Liver', 
    title: 'Hepatic System', 
    script: '간 및 대사 질환 분석', 
    img: imgLiver, 
    top: 70,     
    left: 35,    
    width: 300, 
    height: 100,
    zIndex: 10
  },
  { 
    id: 'endocrine', 
    name: 'Endocrine', 
    title: 'Endocrine System', 
    script: '췌장 및 내분비계 분석', 
    img: imgEndo, 
    top: 60,      
    left: 45,     
    width: 140, 
    height: 100,
    zIndex: 12
  },
  // [중복부] 소화기와 신장
  { 
    id: 'digestive', 
    name: 'Digestive', 
    title: 'Digestive System', 
    script: '소화기계 질환 분석', 
    img: imgDigest, 
    top: 100,      
    left: 50,     
    width: 150, 
    height: 500,
    zIndex: 8    
  },
  { 
    id: 'kidney', 
    name: 'Kidneys', 
    title: 'Urinary System', 
    script: '신장 및 비뇨기계 분석', 
    img: imgKidney, 
    top: 120,       
    left: 50,      
    width: 300, 
    height: 200,
    zIndex: 9    
  },
];

export const ORGAN_CODE_MAP = 
{
  brain: ['I63', 'I61', 'I62','I69','F01, F03',	'G20-G21'],      
  lungs: ['J12-J18', 'C34', 'J44', 'U07.1, U08.2, U10', 'J69'],      
  heart: ['I50', 'I21', 'I10-I13', 'I44-I49', 'A40-A41', 'I25'],           
  liver: ['K70', 'C22', 'K74'], 
  digestive: ['C18', 'C19-C21', 'C16','A03, A04, A06-A09', 'E70-E88'],  
  kidney: ['N17-N19', 'C64-C68', 'C51-C58', 'C50', 'C60-C63'],                   
  endocrine: ['E10-E14', 'C25', 'C23-C24','K80', 'C73'],  
};