import { MEDICAL_ANALYSIS_DATA } from '../constant/script.js'

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

export const MedicalAnalysis = ({ data }) => 
{
  if (!data || !Array.isArray(data) || data.length === 0) return null;

  return (
    <div style={styles.wrapper}>
      {data.map((item, index) => (
        <div key={item.id || index} style={styles.container}>
          
          {/* Header */}
          <div style={styles.header}>
            <span style={styles.categoryBadge}>Medical Insight</span>
            <h3 style={styles.title}>{item.category}</h3>
          </div>

          <div style={{
            ...styles.contentWrapper,
            flexDirection: item.image ? 'row' : 'column',
          }}>
            
            {/* Text Column */}
            <div style={styles.textColumn}>
              <span style={styles.quoteIcon} aria-hidden="true">"</span>
              <p style={styles.contextText}>
                {item.context}
              </p>
              
              {/* Link Card */}
              {item.link && (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={styles.linkCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = '#FFCDD2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
                    e.currentTarget.style.borderColor = '#f1f3f5';
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = '2px solid #D32F2F';
                    e.currentTarget.style.outlineOffset = '2px';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  <div style={styles.linkIconWrapper}>
                    <LinkIcon />
                  </div>
                  <div style={styles.linkInfo}>
                    <span style={styles.linkLabel}>Related Article</span>
                    <span style={styles.linkTitle}>{item.linkTitle || "자세히 보기"}</span>
                  </div>
                  <div style={styles.arrowIcon}>→</div>
                </a>
              )}
            </div>

            {/* Image Column */}
            {item.image && (
              <div style={styles.imageColumn}>
                <div style={styles.imageFrame}>
                  <img 
                    src={item.image} 
                    alt={item.category || "Medical analysis illustration"} 
                    style={styles.image}
                    loading="lazy"
                  />
                  <div style={styles.imageFilter}></div>
                </div>
              </div>
            )}

          </div>
          
          {/* 마지막 아이템이 아니면 구분선 추가 */}
          {index < data.length - 1 && <div style={styles.divider} />}
        </div>
      ))}
    </div>
  );
};

const styles = 
{
  wrapper: 
  {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(3rem, 6vw, 4rem)', // 각 분석 항목 간 간격
  },

  container: 
  {
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(1rem, 3vw, 1.25rem)',
  },
  
  header: 
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '0.625rem',
  },
  
  categoryBadge: 
  {
    fontSize: 'clamp(0.7rem, 1.5vw, 0.75rem)',
    fontWeight: '800',
    color: '#E57373',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  
  title: 
  {
    fontSize: 'clamp(1.3rem, 3vw, 1.6rem)',
    fontWeight: '700',
    color: '#2d3436',
    margin: 0,
    lineHeight: 1.3,
  },
  
  contentWrapper: 
  {
    display: 'flex',
    gap: 'clamp(1.5rem, 5vw, 2.5rem)',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },

  textColumn: 
  {
    flex: '1 1 300px',
    minWidth: 0,
    position: 'relative',
    paddingTop: '1rem',
  },
  
  quoteIcon: 
  {
    position: 'absolute',
    top: '-0.5rem',
    left: '0',
    fontSize: 'clamp(3rem, 8vw, 4rem)',
    color: 'rgba(244, 67, 54, 0.08)',
    fontFamily: 'Georgia, serif',
    lineHeight: 1,
    pointerEvents: 'none',
    userSelect: 'none',
  },
  
  contextText: 
  {
    fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
    lineHeight: '1.9',
    color: '#495057',
    whiteSpace: 'pre-line',
    fontFamily: '"Pretendard", sans-serif',
    marginBottom: 'clamp(1.5rem, 4vw, 1.875rem)',
    position: 'relative',
    zIndex: 1,
  },

  linkCard: 
  {
    display: 'flex',
    alignItems: 'center',
    padding: 'clamp(0.75rem, 2vw, 1rem)',
    backgroundColor: '#fff',
    border: '1px solid #f1f3f5',
    borderRadius: '0.75rem',
    textDecoration: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    maxWidth: '100%',
  },
  
  linkIconWrapper: 
  {
    width: 'clamp(28px, 5vw, 32px)',
    height: 'clamp(28px, 5vw, 32px)',
    borderRadius: '50%',
    backgroundColor: '#FFEBEE',
    color: '#D32F2F',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginRight: 'clamp(0.75rem, 2vw, 1rem)',
  },
  
  linkInfo: 
  {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
  },
  
  linkLabel: 
  {
    fontSize: 'clamp(0.65rem, 1.5vw, 0.7rem)',
    color: '#868e96',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  
  linkTitle: 
  {
    fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
    color: '#212529',
    fontWeight: '600',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  
  arrowIcon: 
  {
    color: '#adb5bd',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    flexShrink: 0,
    marginLeft: '0.5rem',
  },

  imageColumn: 
  {
    flex: '0 1 clamp(200px, 30vw, 280px)',
    minWidth: '200px',
    maxWidth: '100%',
  },
  
  imageFrame: 
  {
    width: '100%',
    aspectRatio: '7 / 8',
    borderRadius: 'clamp(100px, 30vw, 200px) clamp(100px, 30vw, 200px) 1.25rem 1.25rem',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 0.625rem 1.875rem rgba(0,0,0,0.1)',
  },
  
  image: 
  {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  imageFilter: 
  {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, transparent 60%, rgba(244, 67, 54, 0.15))',
    pointerEvents: 'none',
  },

  divider: 
  {
    width: '100%',
    height: '1px',
    background: 'linear-gradient(to right, transparent, #dfe6e9 20%, #dfe6e9 80%, transparent)',
    marginTop: 'clamp(2rem, 5vw, 3rem)',
  },
};

export default MedicalAnalysis;