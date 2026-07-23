export type ServiceType = 
  | 'personalizado' 
  | 'low-fade' 
  | 'mid-fade' 
  | 'social' 
  | 'militar' 
  | 'buzzcut' 
  | 'barba' 
  | 'limpeza' 
  | 'hidratacao' 
  | 'combo';

export interface Service {
  id: ServiceType;
  name: string;
  price: number;
  durationMinutes: number;
  description: string;
  imageUrl: string;
}

export type AppointmentStatus = 'confirmed' | 'cancelled' | 'pending';

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceId: ServiceType;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  status: AppointmentStatus;
  createdAt: number;
}

export interface AdminSession {
  isAuthenticated: boolean;
}

export interface Announcement {
  message: string;
  isActive: boolean;
  type: 'info' | 'alert' | 'success';
}

export interface AnnouncementHistoryItem extends Omit<Announcement, 'isActive'> {
  id: string;
  lastActiveAt: number;
}