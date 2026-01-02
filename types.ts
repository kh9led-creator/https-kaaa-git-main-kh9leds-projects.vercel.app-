
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
  // Added: Localized name property for Arabic support
  nameAr?: string;
  specialty: string;
  // Added: Localized specialty property for Arabic support
  specialtyAr?: string;
  rating: number;
  imageUrl: string;
  bio: string;
  // Added: Localized bio property for Arabic support
  bioAr?: string;
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
