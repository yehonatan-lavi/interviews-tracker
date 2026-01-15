import { useState } from 'react';
import type { Interview, TeamMember } from '../types';
import './InterviewsList.css';

interface InterviewsListProps {
  interviews: Interview[];
  teamMembers: TeamMember[];
  onDelete: (id: string) => void;
  onEdit: (interview: Interview) => void;
}

export function InterviewsList({ interviews, teamMembers, onDelete, onEdit }: InterviewsListProps) {
  const [filter, setFilter] = useState({
    status: 'all',
    interviewerId: 'all',
    searchTerm: '',
  });

  const [sortBy, setSortBy] = useState<'date' | 'name' | 'interviewer'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const getInterviewerName = (id: string) => {
    return teamMembers.find(m => m.id === id)?.name || 'Unknown';
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getStatusBadge = (status: Interview['status']) => {
    const badges = {
      scheduled: { text: 'Scheduled', class: 'status-scheduled' },
      completed: { text: 'Completed', class: 'status-completed' },
      cancelled: { text: 'Cancelled', class: 'status-cancelled' },
    };
    return badges[status] || { text: status, class: '' };
  };

  const safeInterviews = Array.isArray(interviews) ? interviews : [];

  let filteredInterviews = safeInterviews.filter(interview => {
    if (filter.status !== 'all' && interview.status !== filter.status) return false;
    if (filter.interviewerId !== 'all' && interview.interviewerId !== filter.interviewerId) return false;
    if (filter.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      return interview.candidateName.toLowerCase().includes(term) ||
             getInterviewerName(interview.interviewerId).toLowerCase().includes(term);
    }
    return true;
  });

  filteredInterviews.sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'date') {
      const dateA = new Date(`${a.date}T${a.time}`).getTime();
      const dateB = new Date(`${b.date}T${b.time}`).getTime();
      comparison = dateA - dateB;
    } else if (sortBy === 'name') {
      comparison = a.candidateName.localeCompare(b.candidateName, 'en');
    } else if (sortBy === 'interviewer') {
      comparison = getInterviewerName(a.interviewerId).localeCompare(
        getInterviewerName(b.interviewerId),
        'en'
      );
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="interviews-list">
      <div className="list-header">
        <h2>📋 Interview List</h2>
        <span className="count-badge">{filteredInterviews.length} Interviews</span>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search candidate or interviewer..."
          value={filter.searchTerm}
          onChange={(e) => setFilter({ ...filter, searchTerm: e.target.value })}
          className="search-input"
        />

        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="filter-select"
        >
          <option value="all">All Statuses</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={filter.interviewerId}
          onChange={(e) => setFilter({ ...filter, interviewerId: e.target.value })}
          className="filter-select"
        >
          <option value="all">All Interviewers</option>
          {teamMembers.map(member => (
            <option key={member.id} value={member.id}>{member.name}</option>
          ))}
        </select>
      </div>

      <div className="sort-controls">
        <span>Sort by:</span>
        <button 
          className={`sort-btn ${sortBy === 'date' ? 'active' : ''}`}
          onClick={() => toggleSort('date')}
        >
          Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
          onClick={() => toggleSort('name')}
        >
          Candidate Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          className={`sort-btn ${sortBy === 'interviewer' ? 'active' : ''}`}
          onClick={() => toggleSort('interviewer')}
        >
          Interviewer {sortBy === 'interviewer' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      {filteredInterviews.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No interviews found</p>
        </div>
      ) : (
        <div className="interviews-grid">
          {filteredInterviews.map(interview => {
            const statusBadge = getStatusBadge(interview.status);
            return (
              <div key={interview.id} className="interview-card">
                <div className="card-header">
                  <div>
                    <h3>{interview.candidateName}</h3>
                    <span className="interviewer-name">
                      👤 {getInterviewerName(interview.interviewerId)}
                    </span>
                  </div>
                  <span className={`status-badge ${statusBadge.class}`}>
                    {statusBadge.text}
                  </span>
                </div>

                <div className="card-body">
                  <div className="info-row">
                    <span className="info-label">📅 Date:</span>
                    <span className="info-value">{formatDate(interview.date)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">⏰ Time:</span>
                    <span className="info-value">{interview.time}</span>
                  </div>
                  {interview.notes && (
                    <div className="notes">
                      <span className="info-label">📝 Notes:</span>
                      <p>{interview.notes}</p>
                    </div>
                  )}
                </div>

                <div className="card-actions">
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => onEdit(interview)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete the interview with ${interview.candidateName}?`)) {
                        onDelete(interview.id);
                      }
                    }}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

