import { useState, useEffect } from 'react';
import type { Interview } from './types';
import { TEAM_MEMBERS } from './data';
import { TeamStats } from './components/TeamStats';
import { AddInterviewForm } from './components/AddInterviewForm';
import { EditInterviewForm } from './components/EditInterviewForm';
import { InterviewsList } from './components/InterviewsList';
import { db } from './firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  orderBy
} from 'firebase/firestore';
import './App.css';

function App() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'interviews'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const interviewData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Interview[];
      setInterviews(interviewData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching interviews: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddInterview = async (newInterview: Omit<Interview, 'id'>) => {
    try {
      await addDoc(collection(db, 'interviews'), newInterview);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding interview: ", error);
      alert("Failed to add interview. Check console for details.");
    }
  };

  const handleEditInterview = async (updatedInterview: Interview) => {
    try {
      const { id, ...data } = updatedInterview;
      const interviewDoc = doc(db, 'interviews', id);
      await updateDoc(interviewDoc, data as any);
      setEditingInterview(null);
    } catch (error) {
      console.error("Error updating interview: ", error);
      alert("Failed to update interview.");
    }
  };

  const handleDeleteInterview = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'interviews', id));
    } catch (error) {
      console.error("Error deleting interview: ", error);
      alert("Failed to delete interview.");
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Loading interviews...</p>
      </div>
    );
  }

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
