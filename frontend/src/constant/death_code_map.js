import imgBrain from  '../assets/object/Brain.png';
import imgLung from   '../assets/object/Lung.png';
import imgHeart from  '../assets/object/Heart.png';
import imgLiver from  '../assets/object/Liver.png'; // river.png -> Liver로 사용
import imgDigest from '../assets/object/Digestive.png';
import imgKidney from '../assets/object/Urology.png';
import imgEndo from   '../assets/object/Endocrine.png';

export const ORGAN_DATA = 
[
  { 
    id: 'brain', 
    name: 'Nervous System', 
    title: 'Nervous System', 
    script: '뇌와 신경계 데이터 분석', 
    img: imgBrain, 
    top: 60,       
    left: 50,      
    width: 100,    
    height: 100,   
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
    width: 60,    
    height: 50,
    zIndex: 9
  },
  { 
    id: 'heart', 
    name: 'Heart', 
    title: 'Cardiovascular System', 
    script: '심혈관계 질환 분석', 
    img: imgHeart, 
    top: 60,       
    left: 60,      
    width: 40,    
    height: 40,
    zIndex: 13   
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
    width: 50, 
    height: 40,
    zIndex: 12
  },
  { 
    id: 'endocrine', 
    name: 'Endocrine', 
    title: 'Endocrine System', 
    script: '췌장 및 내분비계 분석', 
    img: imgEndo, 
    top: 60,      
    left: 45,     
    width: 60, 
    height: 20,
    zIndex: 12
  },
  // [중복부] 소화기와 신장
  { 
    id: 'digestive', 
    name: 'Digestive', 
    title: 'Digestive System', 
    script: '소화기계 질환 분석', 
    img: imgDigest, 
    top: 85,      
    left: 50,     
    width: 100, 
    height: 50,
    zIndex: 8    
  },
  { 
    id: 'kidney', 
    name: 'Kidneys', 
    title: 'Urinary System', 
    script: '신장 및 비뇨기계 분석', 
    img: imgKidney, 
    top: 105,       
    left: 50,      
    width: 50, 
    height: 30,
    zIndex: 9    
  },
];

export const DEATH_CODE_MAP = 
{
  brain: ['I63', 'I61', 'I62','I69','F01, F03',	'G20-G21'],      
  lungs: ['J12-J18', 'C34', 'J44', 'U07.1, U08.2, U10', 'J69'],      
  heart: ['I50', 'I21', 'I10-I13', 'I44-I49', 'A40-A41', 'I25'],           
  liver: ['K70', 'C22', 'K74'], 
  digestive: ['C18', 'C19-C21', 'C16','A03, A04, A06-A09', 'E70-E88'],  
  kidney: ['N17-N19', 'C64-C68', 'C51-C58', 'C50', 'C60-C63'],                   
  endocrine: ['E10-E14', 'C25', 'C23-C24','K80', 'C73'],
  suicide: ['X60-X84'],       // 1. 고의적 자해(자살)
  transport: ['V01-V99'],     // 2. 운수사고
  falls: ['W01-W19'],         // 3. 낙상
  drowning: ['W65-W74'],      // 4. 익사
  mechanical: ['W20-W49'],    // 5. 무생물성 기계적 힘에 노출
  homicide: ['X85-Y09'],      // 6. 타살
  fire: ['X00-X09'],          // 7. 화재    
  nature: ['X30-X39']         // 8. 자연의 힘에 노출
};