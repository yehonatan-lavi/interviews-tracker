export interface TeamMember {
  id: string;
  name: string;
}

export interface Interview {
  id: string;
  candidateName: string;
  interviewerId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface InterviewStats {
  interviewerId: string;
  count: number;
}

