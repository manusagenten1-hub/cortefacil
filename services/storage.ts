import { Appointment, ServiceType, Announcement, AnnouncementHistoryItem } from '../types';
import { OPENING_HOUR, CLOSING_HOUR } from '../constants';

const EVENT_KEY = 'cortefacil_db_update';
const APPOINTMENTS_KEY = 'cortefacil_appointments';
const ANNOUNCEMENTS_KEY = 'cortefacil_announcements';

// Helper to broadcast changes
const notifyListeners = () => {
  window.dispatchEvent(new Event(EVENT_KEY));
};

const getLocalAppointments = (): any[] => {
  try {
    const data = localStorage.getItem(APPOINTMENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const saveLocalAppointments = (data: any[]) => {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(data));
};

const getLocalAnnouncements = (): any[] => {
  try {
    const data = localStorage.getItem(ANNOUNCEMENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const saveLocalAnnouncements = (data: any[]) => {
  localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(data));
};

// --- APPOINTMENTS ---

export const getAppointments = async (): Promise<Appointment[]> => {
  const data = getLocalAppointments();
  return data.map((item: any) => ({
    id: item.id,
    customerName: item.customer_name,
    customerPhone: item.customer_phone,
    serviceId: item.service_id as ServiceType,
    date: item.date,
    time: item.time,
    status: item.status,
    createdAt: item.created_at
  }));
};

export const saveAppointment = async (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Promise<void> => {
  const data = getLocalAppointments();
  const newAppointment = {
    id: Math.random().toString(36).substring(2, 11),
    customer_name: appointment.customerName,
    customer_phone: appointment.customerPhone,
    service_id: appointment.serviceId,
    date: appointment.date,
    time: appointment.time,
    status: 'confirmed',
    created_at: Date.now()
  };
  
  data.push(newAppointment);
  saveLocalAppointments(data);
  notifyListeners();
};

export const updateAppointmentStatus = async (id: string, status: Appointment['status']): Promise<void> => {
  const data = getLocalAppointments();
  const index = data.findIndex((app: any) => app.id === id);
  if (index !== -1) {
    data[index].status = status;
    saveLocalAppointments(data);
    notifyListeners();
  }
};

export const getAvailableSlots = async (date: string): Promise<string[]> => {
  // 1. Validation: Check if it is Sunday
  const dateObj = new Date(date + 'T12:00:00');
  if (dateObj.getDay() === 0) {
    return []; // Closed on Sundays
  }

  const data = getLocalAppointments();
  const takenTimes = data
    .filter((app: any) => app.date === date && app.status !== 'cancelled')
    .map((app: any) => app.time);

  const slots: string[] = [];
  
  const now = new Date();
  const todayStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
  const isToday = date === todayStr;
  const currentHour = now.getHours();

  for (let hour = OPENING_HOUR; hour < CLOSING_HOUR; hour++) {
    if (isToday && hour <= currentHour) {
      continue;
    }

    const timeString = `${hour.toString().padStart(2, '0')}:00`;
    if (!takenTimes.includes(timeString)) {
      slots.push(timeString);
    }
  }

  return slots;
};

// --- ANNOUNCEMENTS ---

export const getAnnouncement = async (): Promise<Announcement> => {
  const data = getLocalAnnouncements();
  const activeAnnouncements = data.filter((a: any) => a.is_active);
  
  if (activeAnnouncements.length === 0) {
    return { message: '', isActive: false, type: 'info' };
  }

  // Get most recently activated
  activeAnnouncements.sort((a: any, b: any) => b.last_active_at - a.last_active_at);
  const active = activeAnnouncements[0];

  return {
    message: active.message,
    isActive: active.is_active,
    type: active.type as 'info' | 'alert' | 'success'
  };
};

export const getAnnouncementHistory = async (): Promise<AnnouncementHistoryItem[]> => {
  const EXPIRATION_HOURS = 72;
  const expirationMs = EXPIRATION_HOURS * 60 * 60 * 1000;
  const now = Date.now();

  const data = getLocalAnnouncements();
  const history = data
    .filter((a: any) => !a.is_active && (now - a.last_active_at) < expirationMs)
    .sort((a: any, b: any) => b.last_active_at - a.last_active_at);

  return history.map((item: any) => ({
    id: item.id,
    message: item.message,
    type: item.type as 'info' | 'alert' | 'success',
    lastActiveAt: item.last_active_at
  }));
};

export const saveAnnouncement = async (announcement: Announcement): Promise<void> => {
  const data = getLocalAnnouncements();
  
  if (announcement.isActive) {
    // Deactivate all
    data.forEach((a: any) => a.is_active = false);
    
    // Insert new
    data.push({
      id: Math.random().toString(36).substring(2, 11),
      message: announcement.message,
      type: announcement.type,
      is_active: true,
      last_active_at: Date.now()
    });
  } else {
    // Deactivate all
    data.forEach((a: any) => a.is_active = false);
  }

  saveLocalAnnouncements(data);
  notifyListeners();
};

export const subscribeToChanges = (callback: () => void) => {
  window.addEventListener(EVENT_KEY, callback);
  return () => window.removeEventListener(EVENT_KEY, callback);
};