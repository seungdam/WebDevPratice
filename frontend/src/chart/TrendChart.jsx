import { useMemo } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 데이터 경로 (기존과 동일)
import rawData from '../../../public/chart_data_v3.json'

import {DEATH_CODE_MAP} from  '../constant/death_code_map.js';

const IsMatch = (code, rule) => 
{
    const cleanCode = code.trim();
    const cleanRule = rule.trim();
    if (cleanRule.includes('-')) {
      const [start, end] = cleanRule.split('-');
      if (cleanCode.charAt(0) !== start.charAt(0)) return false;
      const codeNum = parseFloat(cleanCode.substring(1));
      const startNum = parseFloat(start.substring(1));
      const endNum = parseFloat(end.substring(1));
      return codeNum >= startNum && codeNum <= endNum;
    }
    return cleanCode.startsWith(cleanRule);
};

const CheckCodeMatch = (dataCode, rules) => 
{
    if (!dataCode) return false;
    return rules.some(rule => 
    {
      if (rule.includes(',')) {
        return rule.split(',').some(subRule => IsMatch(dataCode, subRule.trim()));
      }
      return IsMatch(dataCode, rule);
    });
};

const TrendLineChart = ({ selectedObject }) => 
{
  
  // 1. 데이터 가공: 선택된 연도별 Top 3 질병/사고 추출
 const chartData = useMemo(() => 
{
    if (!selectedObject || !rawData) return [];
    
    const targetRules = DEATH_CODE_MAP[selectedObject] || [];
    
    const filtered = rawData.filter(item => 
    {
        const code = item.cause_code || item.cat || '';
        return CheckCodeMatch(code, targetRules);
    });

    // 연도별, 질병명별로 그룹화하여 합산
    const yearDiseaseMap = {};
    
    filtered.forEach(item => 
    {
        const year = item.stat_year;
        const name = item.cause_name || item.name;
        const count = typeof item.total_death_count === 'number' ? item.total_death_count : 0;
        
        if (!yearDiseaseMap[year]) yearDiseaseMap[year] = {};
        yearDiseaseMap[year][name] = (yearDiseaseMap[year][name] || 0) + count;
    });

    // 전체 기간에서 Top 3 질병 선정
    const totalCountByName = {};
    Object.values(yearDiseaseMap).forEach(yearData => 
    {
        Object.entries(yearData).forEach(([name, count]) => 
        {
            totalCountByName[name] = (totalCountByName[name] || 0) + count;
        });
    });

    const top3Diseases = Object.entries(totalCountByName)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(entry => entry[0]);

    // 차트 데이터 생성
    const years = Object.keys(yearDiseaseMap).sort();
    
    const result = years.map(year => 
    {
        const row = { year: parseInt(year) };
        
        top3Diseases.forEach(disease => 
        {
            row[disease] = yearDiseaseMap[year][disease] || 0;
        });
        
        return row;
    });

    return { data: result, lines: top3Diseases };
}, [selectedObject]);

  if (!chartData.data || chartData.data.length === 0) return null;

  const colors = ['#ff6b6b', '#339af0', '#51cf66']; // 빨강, 파랑, 초록

  return (
    <div style={{ width: '100%', height: '300px', marginTop: '30px', background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <h3 style={{ fontSize: '1rem', marginBottom: '20px', color: '#495057', textAlign: 'center' }}>
        최근 5년 추이 (Top 3)
      </h3>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={chartData.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          
          {/* Top 3 질병에 대해 각각 선 그리기 */}
          {chartData.lines.map((diseaseName, index) => (
            <Line 
              key={diseaseName}
              type="monotone" // 부드러운 곡선
              dataKey={diseaseName} 
              stroke={colors[index]} 
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendLineChart;