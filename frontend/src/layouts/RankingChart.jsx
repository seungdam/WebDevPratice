import React, { useState, useMemo, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle
} from 'recharts';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import rawData from '../../../public/chart_data_v3.json'; 
import { ORGAN_CODE_MAP } from '../Data/organ.js';


const COLORS = [
  '#ff6b6b', // 0: Red
  '#fcc419', // 1: Yellow
  '#6BFFA6', // 2: Green
  '#4ecdc4', // 3: Turquoise
  '#a29bfe', // 4: Purple
  '#ff9f43', // 5: Orange
  '#54A0FF'  // 6: Blue
];


const isMatch = (code, rule) => 
{
  const cleanCode = code.trim(); // 데이터 코드 (예: "J18")
  const cleanRule = rule.trim(); // 규칙 (예: "J12-J18")

  // 1. 범위 처리 (예: "J12-J18")
  if (cleanRule.includes('-')) {
    const [start, end] = cleanRule.split('-');
    // 알파벳이 다르면 범위 밖 (예: J와 I 비교)
    if (cleanCode.charAt(0) !== start.charAt(0)) return false;
    
    // 숫자 부분만 추출해서 비교 (예: 18 >= 12 && 18 <= 18)
    const codeNum = parseFloat(cleanCode.substring(1));
    const startNum = parseFloat(start.substring(1));
    const endNum = parseFloat(end.substring(1));
    
    return codeNum >= startNum && codeNum <= endNum;
  }

  // 2. 정확한 일치 또는 하위 코드 포함 (예: "C34"는 "C34.1"도 포함하도록 startsWith 사용)
  return cleanCode.startsWith(cleanRule);
};

// 헬퍼 함수: 전체 규칙 배열과 질병 코드를 검사
const checkCodeMatch = (dataCode, rules) => 
{
  if (!dataCode) return false;
  
  return rules.some(rule => {
    // 1. 콤마로 구분된 다중 규칙 처리 (예: "F01, F03")
    if (rule.includes(',')) {
      const subRules = rule.split(',').map(s => s.trim());
      return subRules.some(subRule => isMatch(dataCode, subRule));
    }
    // 2. 단일 규칙 처리
    return isMatch(dataCode, rule);
  });
};

const CustomYAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      {/* 🎨 1. 배경 박스 (글자 뒤에 깔리는 색상) */}
      <rect
        x={-115}       // 축(x) 기준 왼쪽으로 115px 이동
        y={-12}        // 수직 중앙 정렬 보정
        width={110}    // 박스 너비 (YAxis width와 맞춤)
        height={24}    // 박스 높이
        rx={4}         // 둥근 모서리 정도
        fill="#f1f3f5" // ★ 배경색 (연한 회색)
        // stroke="#dee2e6" // (옵션) 테두리 선 색상
      />
      
      {/* ✍️ 2. 글자 */}
      <text
        x={-10}        // 박스 오른쪽 끝에서 살짝 안쪽으로(-10px)
        y={4}          // 수직 중앙 정렬 보정
        textAnchor="end" // 오른쪽 정렬
        fill="#495057" // 글자색
        fontSize={8}
        fontWeight={700} // 글자 굵게
      >
        {payload.value}
      </text>
    </g>
  );
};


const DiseaseChart = ({ selectedOrgan }) => 
{
  // 1. 데이터 구조 정규화
  const safeData = useMemo(() => 
  {
    if (!rawData) return [];
    if (Array.isArray(rawData)) return rawData; 
    if (rawData.records && Array.isArray(rawData.records)) return rawData.records; 
    if (rawData.data && Array.isArray(rawData.data)) return rawData.data;       
    return [];
  }, []); 


  // 2. 연도, 나이 기반 그룹핑
  const YEARS = useMemo(() => 
  {
    if (safeData.length === 0) return [];
    const years = [...new Set(safeData.map(d => d.stat_year))];
    // 숫자 기준 오름차순 정렬 (2020, 2021...)
    return years.sort((a, b) => Number(a) - Number(b));
  }, [safeData]);

  const AGE_GROUPS = useMemo(() => 
  {
    if (safeData.length === 0) return [];
    
    const extractAge = (r) => r.age_range || r.Age || r.age || null; 
    const agesFiltered = [...new Set(safeData.map(extractAge).filter(Boolean))];
    
    // 숫자 기준 오름차순 정렬 (0세 -> 65세)
    return agesFiltered.sort((a, b) => 
    {
      const aNum = parseInt(a.match(/\d+/)?.[0] || 0);
      const bNum = parseInt(b.match(/\d+/)?.[0] || 0);
      return aNum - bNum;
    });
  }, [safeData]);

  const [selectedYear, setSelectedYear] = useState(null);
  const [ageIdx, setAgeIdx] = useState(0);

  // 초기값 설정 (가장 마지막 연령대, 2024)
  useEffect(() => 
  {
    if (YEARS.length > 0) 
    {
      setSelectedYear(YEARS[YEARS.length - 1]);
    }

    if (AGE_GROUPS.length > 0) 
    {
      setAgeIdx(Math.max(0, AGE_GROUPS.length - 1));
    }
  }, [YEARS, AGE_GROUPS]);

  // 3. 데이터 필터링 & 가공
  const processedData = useMemo(() => 
  {
    if (!selectedOrgan || safeData.length === 0 || !selectedYear || AGE_GROUPS.length === 0) return [];

    const targetAge = AGE_GROUPS[ageIdx];
    const targetRules = ORGAN_CODE_MAP[selectedOrgan] || []; // 코드 목록 가져오기

    // Step 1: 연도 필터링
    let filtered = safeData.filter(item => item.stat_year == selectedYear);

    // Step 2: 연령 & 질병코드 정밀 필터링
    filtered = filtered.filter(item => {
      const currentAge = item.age_range || item.Age;
      // 데이터의 코드 (cause_code가 없으면 cat이나 빈 문자열)
      const currentCode = item.cause_code || item.cat || ''; 
      
      if (currentAge !== targetAge) return false;
      
      // ★ [핵심] 새로 만든 스마트 매칭 함수 사용
      return checkCodeMatch(currentCode, targetRules);
    });

    const mapped = filtered.map(item => {
      const name = item.cause_name || item.name || '알 수 없음';
      const rawCount = item.total_death_count ?? item.death_count ?? item.val ?? 0;
      const countNum = typeof rawCount === 'string' 
        ? parseInt(rawCount.replace(/,/g, ''), 10) 
        : Number(rawCount);
      return { name, value: isNaN(countNum) ? 0 : countNum };
    });

    const sorted = mapped.sort((a, b) => b.value - a.value).slice(0, 7);

    return sorted.map((item, index) => ({
      ...item,
      fill: COLORS[index % COLORS.length]
    }));

  }, [selectedOrgan, selectedYear, ageIdx, AGE_GROUPS, safeData]);
  // --- UI Render ---

  // 예외 처리
  if (!selectedOrgan) return <div style={styles.centerMsg}>장기를 선택해주세요</div>;
  if (safeData.length === 0) return <div style={styles.centerMsg}>데이터를 로드할 수 없습니다</div>;
  if (processedData.length === 0) return <div style={styles.centerMsg}>표시할 데이터가 없습니다</div>;

  return (
 <div style={styles.container}>
      
      
      {/* [Chart] Racing Bar Effect */}
      <div style={{ flex: 1, minHeight: '0', position: 'relative', marginTop: '10px' }}>
        {processedData.length === 0 ? (
          <div style={styles.centerMsg}>해당 연도/조건의 데이터가 없습니다.</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              layout="vertical" 
              data={processedData} 
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.4} />
              <XAxis type="number" hide />
              
              {/* Y축: 랭킹이 바뀌면 순서가 자동으로 바뀜 */}
              <YAxis 
                type="category" 
                dataKey="name" 
                width={110} 
                tick={CustomYAxisTick} 
                interval={0} 
              />
              
              <Tooltip 
                cursor={{ fill: 'rgba(0,0,0,0.03)' }} 
                formatter={(value) => [`${value.toLocaleString()}명`, '사망자 수']} 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.12)' }} 
              />
              
              <Bar 
                dataKey="value" 
                barSize={20} 
                isAnimationActive={true} 
                animationDuration={600} // ★ 부드러운 위치 이동을 위한 속도 조절
                animationEasing="ease-in-out"
                shape={(props) => (
                  <Rectangle
                    {...props}
                    fill={props.payload.fill} 
                    radius={[0, 6, 6, 0]} 
                  />
                )}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      
      {/* 연도 선택기 & 타이틀 */}
      <div style={styles.headerRow}>
        <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#868e96' }}>
          Statistic Year
        </span>
        <select 
          value={selectedYear || ''} 
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          style={styles.yearSelect}
        >
          {YEARS.map(year => (
            <option key={year} value={year}>{year}년</option>
          ))}
        </select>
      </div>


      {/* 🎚️ [Slider] Age Control */}
      <div style={styles.sliderWrapper}>
        <div style={styles.sliderHeader}>
          <span style={{ fontSize: '0.8rem', color: '#868e96' }}>TARGET AGE</span>
          <span style={{ fontSize: '0.95rem', color: '#228be6', fontWeight: '800' }}>
            {AGE_GROUPS[ageIdx]}
          </span>
        </div>
        <div style={{ padding: '0 10px' }}>
          <Slider
            min={0} 
            max={Math.max(0, AGE_GROUPS.length - 1)}
            value={ageIdx} 
            onChange={setAgeIdx}
            styles={{
              track: { backgroundColor: '#228be6', height: 6, borderRadius: 3 },
              rail: { backgroundColor: '#e9ecef', height: 6, borderRadius: 3 },
              handle: { 
                borderColor: '#228be6', 
                height: 24, 
                width: 24, 
                marginTop: -9, 
                backgroundColor: '#fff', 
                borderWidth: 2, 
                boxShadow: '0 4px 10px rgba(34, 139, 230, 0.4)',
                opacity: 1
              }
            }}
          />
        </div>
        <div style={styles.sliderLabels}>
          <span>{AGE_GROUPS[0]}</span>
          <span>{AGE_GROUPS[AGE_GROUPS.length - 1]}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column' },
  centerMsg: { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#adb5bd', fontSize: '0.9rem' },
  sliderWrapper: { marginTop: '15px', padding: '15px 20px', backgroundColor: '#f8f9fa', borderRadius: '16px', border: '1px solid #f1f3f5' },
  sliderHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontWeight: 'bold' },
  sliderLabels: { display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.75rem', color: '#ced4da', fontWeight: 500 }
};

export default DiseaseChart;