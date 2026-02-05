import { useMemo } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 데이터 경로 (기존과 동일)
import rawData from '../../../public/chart_data_v2.json'

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

const TrendLineChart = ({ selectedOrgan }) => 
{
  
  // 1. 데이터 가공: 선택된 장기의 연도별 Top 3 질병 추출
  const chartData = useMemo(() => 
  {
    if (!selectedOrgan || !rawData) return [];
    
    const targetRules = DEATH_CODE_MAP[selectedOrgan] || [];
    
    // 1-1. 해당 장기에 속하는 모든 데이터 필터링
    const filtered = rawData.filter(item => 
    {
        const code = item.cause_code || item.cat || '';
        return CheckCodeMatch(code, targetRules);
    });

    // 1-2. 질병 이름별로 전체(모든 연도, 모든 나이) 사망자 수 합산하여 Top 3 선정
    const totalCountByName = {};
    filtered.forEach(item => 
    {
        const name = item.cause_name || item.name;
        const val = typeof item.total_death_count === 'number' ? item.total_death_count : 0;
        totalCountByName[name] = (totalCountByName[name] || 0) + val;
    });

    const top3Diseases = Object.entries(totalCountByName)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(entry => entry[0]);

    // 1-3. 연도별로 데이터 재구성 (Pivot)
    // 목표 형태: [{ year: 2018, '뇌졸중': 100, '뇌출혈': 50 }, { year: 2019, ... }]
    const years = [...new Set(filtered.map(d => d.stat_year))].sort();
    
    const result = years.map(year => 
    {
        const row = { year };
        
        top3Diseases.forEach(disease => 
        {
            // 해당 연도, 해당 질병의 모든 나이대 사망자 합산
            const sum = filtered
                .filter(d => d.stat_year === year && (d.cause_name || d.name) === disease)
                .reduce((acc, curr) => acc + (curr.total_death_count || 0), 0);
            row[disease] = sum;
        });
        return row;
    });

    return { data: result, lines: top3Diseases };
  }, [selectedOrgan]);

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