import { useState } from 'react';
import type { FormEvent } from 'react';
import type { TeamMember, Interview } from '../types';
import './AddInterviewForm.css';

interface EditInterviewFormProps {
  interview: Interview;
  teamMembers: TeamMember[];
  onSave: (interview: Interview) => void;
  onClose: () => void;
}

export function EditInterviewForm({ interview, teamMembers, onSave, onClose }: EditInterviewFormProps) {
  const [formData, setFormData] = useState(interview);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.candidateName || !formData.interviewerId || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>✏️ Edit Interview</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="interview-form">
          <div className="form-group">
            <label htmlFor="candidateName">Candidate Name *</label>
            <input
              id="candidateName"
              type="text"
              value={formData.candidateName}
              onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
              placeholder="Enter candidate name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="interviewerId">Interviewer *</label>
            <select
              id="interviewerId"
              value={formData.interviewerId}
              onChange={(e) => setFormData({ ...formData, interviewerId: e.target.value })}
              required
            >
              <option value="">Select interviewer</option>
              {teamMembers.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time *</label>
              <input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            >
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes..."
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

