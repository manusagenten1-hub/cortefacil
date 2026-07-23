import React, { useEffect, useState } from 'react';
import { getAnnouncement, subscribeToChanges } from '../services/storage';
import { Announcement } from '../types';
import { AlertCircle, Info, CheckCircle2 } from 'lucide-react';

export const NoticeBanner: React.FC = () => {
  const [announcement, setAnnouncement] = useState<Announcement>({ message: '', isActive: false, type: 'info' });

  const loadData = async () => {
    const data = await getAnnouncement();
    setAnnouncement(data);
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeToChanges(loadData);
    return unsubscribe;
  }, []);

  if (!announcement.isActive || !announcement.message) return null;

  const styles = {
    info: 'bg-blue-900/90 text-blue-100 border-blue-700',
    alert: 'bg-red-900/90 text-red-100 border-red-700',
    success: 'bg-green-900/90 text-green-100 border-green-700',
  };

  const Icon = {
    info: Info,
    alert: AlertCircle,
    success: CheckCircle2,
  }[announcement.type];

  return (
    <div className={`fixed top-20 left-0 right-0 z-40 px-4 py-3 border-b backdrop-blur-md shadow-lg animate-fade-in animate-gentle-pulse ${styles[announcement.type]}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-center text-center gap-3">
        <Icon className="w-5 h-5 shrink-0 animate-pulse" />
        <p className="font-medium text-sm md:text-base">{announcement.message}</p>
      </div>
    </div>
  );
};