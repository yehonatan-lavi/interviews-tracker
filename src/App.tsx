import { useState } from 'react';
import type { Interview } from './types';
import { TEAM_MEMBERS } from './data';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TeamStats } from './components/TeamStats';
import { AddInterviewForm } from './components/AddInterviewForm';
import { EditInterviewForm } from './components/EditInterviewForm';
import { InterviewsList } from './components/InterviewsList';
import './App.css';

function App() {
  const [interviews, setInterviews] = useLocalStorage<Interview[]>('interviews', []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);

  const handleAddInterview = (newInterview: Omit<Interview, 'id'>) => {
    const interview: Interview = {
      ...newInterview,
      id: Date.now().toString(),
    };
    setInterviews([...interviews, interview]);
    setShowAddForm(false);
  };

  const handleEditInterview = (updatedInterview: Interview) => {
    setInterviews(interviews.map(i => 
      i.id === updatedInterview.id ? updatedInterview : i
    ));
    setEditingInterview(null);
  };

  const handleDeleteInterview = (id: string) => {
    setInterviews(interviews.filter(i => i.id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>🎯 SDK Interview Tracker</h1>
            <p className="subtitle">Balanced interview management for the team</p>
          </div>
          <button 
            className="add-interview-btn"
            onClick={() => setShowAddForm(true)}
          >
            ➕ Add New Interview
          </button>
        </div>
      </header>

      <main className="app-main">
        <TeamStats teamMembers={TEAM_MEMBERS} interviews={interviews} />
        <InterviewsList 
          interviews={interviews}
          teamMembers={TEAM_MEMBERS}
          onDelete={handleDeleteInterview}
          onEdit={setEditingInterview}
        />
      </main>

      {showAddForm && (
        <AddInterviewForm
          teamMembers={TEAM_MEMBERS}
          interviews={interviews}
          onAdd={handleAddInterview}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {editingInterview && (
        <EditInterviewForm
          interview={editingInterview}
          teamMembers={TEAM_MEMBERS}
          onSave={handleEditInterview}
          onClose={() => setEditingInterview(null)}
        />
      )}

      <footer className="app-footer">
        <p>Built for BioCatch SDK Team 💚</p>
      </footer>
    </div>
  );
}

export default App;
