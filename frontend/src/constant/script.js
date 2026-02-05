// 1. 이미지 에셋 Import
import BrainAnalysis1 from '../assets/object/BrainAnalysis1.jpg';
import BrainAnalysis2 from '../assets/object/BrainAnalysis2.jpg';
import HeartAnalysis1 from '../assets/object/HeartAnalysis1.jpg';
import HeartAnalysis2 from '../assets/object/HeartAnalysis2.jpg';
import EndocrineAnalysis1 from '../assets/object/EndocrineAnalysis1.jpg';
import EndocrineAnalysis2 from '../assets/object/EndocrineAnalysis2.jpg';
import LiverAnalysis1 from '../assets/object/LiverAnalysis1.jpg';
import LiverAnalysis2 from '../assets/object/LiverAnalysis2.jpg';
import LungsAnalysis1 from '../assets/object/LungsAnalysis1.jpg';
import LungsAnalysis2 from '../assets/object/LungsAnalysis2.jpg'; // 만성폐쇄성폐질환 (New)
import DigestAnalysis1 from '../assets/object/DigestAnalysis1.jpg';

export const MEDICAL_ANALYSIS_DATA = 
{
  // [뇌: Brain]
  "brain": [
    {
      id: 1,
      category: "뇌 - 치매 (Dementia)",
      context: `치매는 가장 많은 사람을 즉시 죽이는 병은 아니다.\n대신 기억을 하나씩 지워가며,\n사람이 살아 있는 시간과 삶의 의미를 동시에 무너뜨린다.\n\n이 병의 사망 통계 뒤에는,\n이미 오래전부터 시작된 수많은 상실의 시간이 쌓여 있다.`,
      link: "https://www.nhis.or.kr/static/alim/paper/oldpaper/202309/sub/section1_4.html",
      linkTitle: "노인장기요양보험 웹진: 치매 예방과 관리",
      image: BrainAnalysis1 
    },
    {
      id: 2,
      category: "뇌 - 뇌경색 (Cerebral Infarction)",
      context: `뇌경색은 특별한 관리가 필요한 병이 아니다.\n\n혈압을 재고, 담배를 줄이고, 하루\n조금만 몸을 움직이는 것처럼\n이미 알고 있는 생활습관만 지켜도 위험을 낮출 수 있다.`,
      link: "https://www.snuh.org/health/nMedInfo/nView.do?category=DIS&medid=AA001202",
      linkTitle: "서울대학교병원 N의학정보: 뇌경색",
      image: BrainAnalysis2
    }
  ],

  // [심장: Heart]
  'heart': [
    {
      id: 1,
      category: "심장 - 급성심근경색증 (Acute Myocardial Infarction)",
      context: `급성심근경색은 갑자기 생기는 병처럼 보이지만,\n대부분은 고혈압, 당뇨, 흡연처럼\n오래 누적된 위험요인의 결과다.\n\n사망자 수가 중·장년층에서 급격히 늘어나는 이유는\n증상이 나타나기 전까지 병을 자각하기 어렵기 때문이다.\n\n이 질병의 통계는, 심장이 아프기 시작한 시점이 아니라\n관리를 시작하지 않았던 시간이 얼마나 길었는지를 보여준다.`,
      link: "https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=32111",
      linkTitle: "서울아산병원 질환백과: 급성심근경색증",
      image: HeartAnalysis1
    },
    {
      id: 2,
      category: "심장 - 고혈압성 질환 (Hypertensive Diseases)",
      context: `고혈압은 특별한 증상이 없는 병이다.\n그래서 아프지 않다는 이유로 그냥 지나치기 쉽다.\n\n하지만 혈압을 재고, 짠 음식을 줄이고,\n조금만 몸을 움직이는 것만으로도 충분히 관리할 수 있다.`,
      link: "https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=31322",
      linkTitle: "서울아산병원 질환백과: 고혈압",
      image: HeartAnalysis2
    }
  ],

  // [간: Liver]
  'liver': [
    {
      id: 1,
      category: "간 - 간의 섬유증 및 경화 (Fibrosis and Cirrhosis of Liver)",
      context: `간암은 갑자기 생겨나는 병처럼 보이지만,\n대부분은 오래된 간질환의 끝에서 발견된다.\n\nB·C형 간염, 과도한 음주, 지방간처럼 흔한 문제가\n시간을 거치며 암으로 이어진 결과다.\n\n간암 사망이 증가하는 이유는,\n간이 아파도 증상이 늦게 나타나기 때문이다.`,
      link: "https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=30480",
      linkTitle: "서울아산병원 질환백과: 간경변증",
      image: LiverAnalysis1
    },
    {
      id: 2,
      category: "간 - 알코올성 간질환 (Alcoholic Liver Disease)",
      context: `알코올성 간질환은 병원보다 일상에서 먼저 시작된다.\n술의 종류가 아니라, 마시는 빈도와 쉬는 날이 있는지가 더 중요하다.\n\n완전히 끊지 않더라도, 마시는 횟수를 줄이고 간을 쉬게 하면\n충분히 되돌릴 수 있는 단계에서 멈출 수 있다.`,
      link: "https://www.snuh.org/health/nMedInfo/nView.do?category=DIS&medid=AA000311",
      linkTitle: "서울대학교병원 N의학정보: 알코올성 간질환",
      image: LiverAnalysis2
    }
  ],

  // [내분비: Endocrine]
  'endocrine': [
    {
      id: 1,
      category: "내분비 - 당뇨병 (Diabetes Mellitus)",
      context: `당뇨병은 갑자기 생명을 끊는 병이 아니다.\n대신 오랜 시간에 걸쳐 혈관과 장기를 망가뜨리며,\n사람이 늙어가는 속도를 앞당긴다.\n\n이 병의 사망 통계는 하나의 원인이 아니라,\n수십 년 동안 누적된 '방심'의\n결과다.`,
      link: "https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=31596",
      linkTitle: "서울아산병원 질환백과: 당뇨병",
      image: EndocrineAnalysis1
    },
    {
      id: 2,
      category: "내분비 - 담석증 (Cholelithiasis)",
      context: `담석증은 특별한 병이 아니라,\n식습관과 생활 리듬이 조금씩 어긋날 때 생긴다.\n\n규칙적으로 식사하고, 급격한 다이어트를 피하고,\n몸을 자주 움직이는 것만으로도 충분히 예방할 수 있다.`,
      link: "https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=30478",
      linkTitle: "서울아산병원 질환백과: 담석증",
      image: EndocrineAnalysis2
    }
  ],

  // [폐: Lungs]
  'lungs': [
    {
      id: 1,
      category: "폐 - 폐렴 (Pneumonia)",
      context: `폐렴은 특별한 병이 아니라,\n면역력이 떨어진 순간 누구에게나 찾아오는 감염이다.\n\n고령층에서 사망자 수가 급격히 늘어나는 이유는\n폐렴 자체보다, '몸이 회복하지 못하는 상태'에서 발병하기 때문이다.\n\n그래서 폐렴 사망 통계는\n질병의 확산이 아니라 취약해진 삶의 조건이 얼마나 늘어났는지를 보여준다.`,
      link: "https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=31631",
      linkTitle: "서울아산병원 질환백과: 폐렴",
      image: LungsAnalysis1
    },
    {
      id: 2,
      category: "폐 - 만성폐쇄성폐질환 (COPD)",
      context: `만성폐쇄성폐질환은 특별한 치료보다,\n생활을 바꾸는 것만으로도 진행을 늦출 수 있는 병이다.\n\n금연, 실내 공기 관리, 꾸준한\n가벼운 운동처럼\n이미 알고 있는 선택들이 가장 큰 예방이 된다.`,
      link: null, // 링크 없음
      linkTitle: null,
      image: LungsAnalysis2
    }
  ],
  
  // 나머지 장기 초기화
  digestive: [
  {
    id: 1,
    category: '소화계 - 장 감염 질환',
    context:' 장 감염 질환은 생활 속 위생만으로도 충분히 막을 수 있는 병이다.\n손을 씻고, 음식물을 익혀 먹고, 물과 조리 환경을 관리하는 것만으로 발생 위험은 크게 줄어든다.\n이 질환의 통계는 특별한 치료의 문제가 아니라,\n기본적인 생활 습관이 얼마나 잘 지켜지고 있는지를 보여준다.',
    link:"https://www.amc.seoul.kr/asan/healthinfo/disease/diseaseDetail.do?contentId=31684",
    image: DigestAnalysis1
  }

  ],
  kidney: []
};