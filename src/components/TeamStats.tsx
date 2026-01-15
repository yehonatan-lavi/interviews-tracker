import type { TeamMember, Interview } from '../types';
import './TeamStats.css';

interface TeamStatsProps {
  teamMembers: TeamMember[];
  interviews: Interview[];
}

export function TeamStats({ teamMembers, interviews }: TeamStatsProps) {
  const safeInterviews = Array.isArray(interviews) ? interviews : [];

  const stats = teamMembers.map(member => {
    const count = safeInterviews.filter(
      interview => interview.interviewerId === member.id && interview.status !== 'cancelled'
    ).length;
    return { ...member, count };
  });

  const maxCount = Math.max(...stats.map(s => s.count), 1);
  const totalInterviews = stats.reduce((sum, s) => sum + s.count, 0);
  const avgInterviews = totalInterviews / teamMembers.length;

  return (
    <div className="team-stats">
      <div className="stats-header">
        <h2>📊 Team Statistics</h2>
        <div className="summary">
          <div className="summary-item">
            <span className="label">Total Interviews:</span>
            <span className="value">{totalInterviews}</span>
          </div>
          <div className="summary-item">
            <span className="label">Average per Person:</span>
            <span className="value">{avgInterviews.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <div className="stats-grid">
        {stats.map(member => {
          const percentage = maxCount > 0 ? (member.count / maxCount) * 100 : 0;
          const isAboveAvg = member.count > avgInterviews;
          const isBelowAvg = member.count < avgInterviews;
          
          return (
            <div key={member.id} className="stat-card">
              <div className="stat-header">
                <span className="member-name">{member.name}</span>
                <span className={`member-count ${isAboveAvg ? 'above-avg' : isBelowAvg ? 'below-avg' : ''}`}>
                  {member.count}
                </span>
              </div>
              <div className="stat-bar-container">
                <div 
                  className={`stat-bar ${isAboveAvg ? 'above-avg' : isBelowAvg ? 'below-avg' : ''}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

