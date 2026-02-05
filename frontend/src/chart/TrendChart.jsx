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
  const chartData = useMemo(() => 
  {
    if (!selectedObject || !rawData) return [];
    
    const targetRules = DEATH_CODE_MAP[selectedObject] || [];
    
    const filtered = rawData.filter(item => 
    {
        const code = item.cause_code || item.cat || '';
        return CheckCodeMatch(code, targetRules);
    });

    const yearDiseaseMap = {};
    
    filtered.forEach(item => 
    {
        const year = item.stat_year;
        const name = item.cause_name || item.name;
        const count = typeof item.total_death_count === 'number' ? item.total_death_count : 0;
        
        if (!yearDiseaseMap[year]) yearDiseaseMap[year] = {};
        yearDiseaseMap[year][name] = (yearDiseaseMap[year][name] || 0) + count;
    });

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

    // 통계 계산 추가
    const totalDeaths = Object.values(totalCountByName).reduce((a, b) => a + b, 0);
    const mainCause = top3Diseases[0] || '알 수 없음';

    return { 
      data: result, 
      lines: top3Diseases,
      stats: {
        totalDeaths: totalDeaths.toLocaleString() + '명',
        mainCause: mainCause
      }
    };
  }, [selectedObject]);

  if (!chartData.data || chartData.data.length === 0) return null;

  const colors = ['#ff6b6b', '#339af0', '#51cf66'];

  return (
    <div style={styles.wrapper}>
      
      {/* 차트 타이틀 */}
      <h4 style={styles.chartTitle}>최근 5년 추이 (Top 3)</h4>
      
      {/* 차트 영역 */}
      <div style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart  data={chartData.data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)' 
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            
            {chartData.lines.map((diseaseName, index) => (
              <Line 
                key={diseaseName}
                type="monotone"
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

      {/* 통계 박스 */}
      <div style={styles.statBox}>
        <div style={styles.statRow}>
          <span>5년간 총 사망자 수</span>
          <strong style={{color: '#e17055'}}>{chartData.stats.totalDeaths}</strong>
        </div>
        <div style={styles.statRow}>
          <span>주요 원인 (1위)</span>
          <strong>{chartData.stats.mainCause}</strong>
        </div>
      </div>

    </div>
  );
};

const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    background: '#fff',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    border: '1px solid #f1f3f5',
  },
  
  chartTitle: {
    fontSize: '1rem',
    color: '#495057',
    fontWeight: 600,
    margin: 0,
    textAlign: 'center',
  },
  
  chartContainer: 
  {
    width: '100%',
    height: '500px', // 차트만의 고정 높이
    position: 'relative',
  },
  
  statBox: { 
    backgroundColor: '#F8F9FA', 
    padding: '30px', 
    borderRadius: '16px', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '10px' 
  },
  
  statRow: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    fontSize: '1.1rem', 
    borderBottom: '1px dashed #dfe6e9', 
    paddingBottom: '10px',
    // 마지막 row는 border 제거
    '&:lastChild': {
      borderBottom: 'none',
    }
  },
};

export default TrendLineChart;