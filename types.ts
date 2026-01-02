
export enum UserRole {
  STUDENT = 'STUDENT',
  ADVISOR = 'ADVISOR',
  ADMIN = 'ADMIN'
}

export enum SessionType {
  CHAT = 'CHAT',
  VOICE = 'VOICE',
  VIDEO = 'VIDEO'
}

export interface Advisor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  imageUrl: string;
  bio: string;
  volunteerHours: number;
}

export interface Appointment {
  id: string;
  studentName: string;
  advisorId: string;
  type: SessionType;
  date: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  quizResults?: any;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
