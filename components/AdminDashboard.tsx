import React, { useState, useEffect } from 'react';
import { 
  getAppointments, 
  updateAppointmentStatus, 
  subscribeToChanges, 
  getAnnouncement, 
  saveAnnouncement, 
  getAnnouncementHistory 
} from '../services/storage';
import { Appointment, Announcement, AnnouncementHistoryItem } from '../types';
import { Button } from './ui/Button';
import { 
  CalendarCheck, Trash2, Check, RefreshCw, X, Megaphone, 
  AlertTriangle, Save, History, Clock, Loader2, 
  LayoutDashboard, TrendingUp, TrendingDown, DollarSign, BarChart3
} from 'lucide-react';
import { SERVICES } from '../constants';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'appointments' | 'announcements'>('appointments');
  const [filter, setFilter] = useState<'all' | 'today'>('all');
  
  // Announcement State
  const [announcement, setAnnouncement] = useState<Announcement>({ message: '', isActive: false, type: 'info' });
  const [history, setHistory] = useState<AnnouncementHistoryItem[]>([]);
  const [showNoticeSuccess, setShowNoticeSuccess] = useState(false);
  const [savingNotice, setSavingNotice] = useState(false);

  const loadData = async () => {
    if (appointments.length === 0) setLoading(true);
    
    const data = await getAppointments();
    data.sort((a, b) => {
      // Sort by Date desc, then Time asc
      if (a.date !== b.date) return b.date.localeCompare(a.date);
      return a.time.localeCompare(b.time);
    });
    setAppointments(data);
    
    const activeAnnouncement = await getAnnouncement();
    setAnnouncement(activeAnnouncement);
    
    const historyData = await getAnnouncementHistory();
    setHistory(historyData);
    
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeToChanges(loadData);
    return unsubscribe;
  }, []);

  const handleStatusChange = async (id: string, status: Appointment['status']) => {
    const prevAppointments = [...appointments];
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    
    try {
      await updateAppointmentStatus(id, status);
    } catch (e) {
      setAppointments(prevAppointments);
      console.error(e);
    }
  };

  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingNotice(true);
    await saveAnnouncement(announcement);
    setSavingNotice(false);
    setShowNoticeSuccess(true);
    setTimeout(() => setShowNoticeSuccess(false), 3000);
  };

  const handleReactivate = (item: AnnouncementHistoryItem) => {
    setAnnouncement({
      message: item.message,
      type: item.type,
      isActive: true
    });
  };

  const getServiceName = (id: string) => SERVICES.find(s => s.id === id)?.name || id;

  // --- REVENUE LOGIC ---
  const today = new Date().toISOString().split('T')[0];
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastMonthYear = lastMonthDate.getFullYear();

  const calculateRevenue = (month: number, year: number) => {
    return appointments
      .filter(a => {
        if (a.status !== 'confirmed') return false;
        const appDate = new Date(a.date + 'T00:00:00');
        return appDate.getMonth() === month && appDate.getFullYear() === year;
      })
      .reduce((acc, curr) => acc + (SERVICES.find(s => s.id === curr.serviceId)?.price || 0), 0);
  };

  const currentRevenue = calculateRevenue(currentMonth, currentYear);
  const lastRevenue = calculateRevenue(lastMonth, lastMonthYear);
  
  // Growth Calculation
  let growthPercent = 0;
  if (lastRevenue > 0) {
    growthPercent = ((currentRevenue - lastRevenue) / lastRevenue) * 100;
  } else if (currentRevenue > 0) {
    growthPercent = 100;
  }

  // Chart Scaling
  const maxRevenue = Math.max(currentRevenue, lastRevenue, 100); // Minimum 100 to avoid div by zero issues
  const currentHeight = Math.round((currentRevenue / maxRevenue) * 100);
  const lastHeight = Math.round((lastRevenue / maxRevenue) * 100);

  // Filter Logic for Table
  const filteredAppointments = appointments.filter(app => {
    if (filter === 'today') return app.date === today;
    return true;
  });

  return (
    <div className="fixed inset-0 z-[100] bg-dark-950 overflow-y-auto">
      <div className="min-h-screen">
        {/* Admin Header */}
        <header className="bg-dark-900 border-b border-dark-800 sticky top-0 z-20 px-6 py-4 flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-3">
            <div className="bg-gold-600/10 p-2 rounded-lg">
               <CalendarCheck className="w-6 h-6 text-gold-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Painel Administrativo</h1>
              <p className="text-xs text-gray-500">CorteFácil Management</p>
            </div>
          </div>
          <Button variant="secondary" onClick={onLogout} className="text-sm px-4 py-2">Sair</Button>
        </header>

        {/* Tab Navigation */}
        <div className="bg-dark-900/50 border-b border-dark-800 backdrop-blur-sm sticky top-[73px] z-10 px-6">
          <div className="max-w-7xl mx-auto flex gap-6">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`py-4 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'appointments' 
                ? 'border-gold-500 text-gold-500' 
                : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Agendamentos & Receita
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className={`py-4 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'announcements' 
                ? 'border-gold-500 text-gold-500' 
                : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Megaphone className="w-4 h-4" />
              Gestão de Avisos
            </button>
          </div>
        </div>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-6 py-8 animate-fade-in">
          
          {activeTab === 'appointments' && (
            <div className="space-y-8">
              
              {/* Revenue Section */}
              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Stats Card */}
                <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
                  <div className="bg-dark-900 rounded-xl border border-dark-800 p-6 shadow-lg flex flex-col justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium mb-1">Receita Atual ({now.toLocaleString('pt-BR', { month: 'long' })})</p>
                      <h3 className="text-3xl font-bold text-white flex items-center gap-1">
                        <span className="text-gold-500 text-xl">R$</span> {currentRevenue},00
                      </h3>
                    </div>
                    <div className={`flex items-center gap-2 mt-4 text-sm font-bold ${growthPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {growthPercent >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{Math.abs(growthPercent).toFixed(1)}%</span>
                      <span className="text-gray-500 font-normal">vs mês anterior</span>
                    </div>
                  </div>

                  <div className="bg-dark-900 rounded-xl border border-dark-800 p-6 shadow-lg flex flex-col justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium mb-1">Mês Anterior ({lastMonthDate.toLocaleString('pt-BR', { month: 'long' })})</p>
                      <h3 className="text-3xl font-bold text-gray-300 flex items-center gap-1">
                        <span className="text-gray-500 text-xl">R$</span> {lastRevenue},00
                      </h3>
                    </div>
                    <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                       <DollarSign className="w-4 h-4" />
                       Histórico consolidado
                    </div>
                  </div>
                </div>

                {/* Graph Card */}
                <div className="bg-dark-900 rounded-xl border border-dark-800 p-6 shadow-lg flex flex-col">
                  <div className="flex items-center gap-2 mb-6">
                    <BarChart3 className="w-5 h-5 text-gold-500" />
                    <h3 className="text-white font-bold text-sm">Comparativo Mensal</h3>
                  </div>
                  
                  <div className="flex-1 flex items-end justify-around gap-4 px-4 pb-2">
                    {/* Last Month Bar */}
                    <div className="w-full flex flex-col items-center gap-2 group">
                      <span className="text-xs text-gray-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">R${lastRevenue}</span>
                      <div 
                        className="w-full max-w-[60px] bg-dark-700 rounded-t-lg transition-all duration-1000 relative group-hover:bg-dark-600"
                        style={{ height: `${lastHeight}%`, minHeight: '4px' }}
                      ></div>
                      <span className="text-xs text-gray-500 uppercase">{lastMonthDate.toLocaleString('pt-BR', { month: 'short' })}</span>
                    </div>

                    {/* Current Month Bar */}
                    <div className="w-full flex flex-col items-center gap-2 group">
                      <span className="text-xs text-gold-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">R${currentRevenue}</span>
                      <div 
                        className="w-full max-w-[60px] bg-gradient-to-t from-gold-700 to-gold-500 rounded-t-lg transition-all duration-1000 relative shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                        style={{ height: `${currentHeight}%`, minHeight: '4px' }}
                      ></div>
                      <span className="text-xs text-white font-bold uppercase">{now.toLocaleString('pt-BR', { month: 'short' })}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Filters & Table */}
              <div className="space-y-4">
                 <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex gap-2 bg-dark-900 p-1 rounded-lg border border-dark-800">
                    <button 
                      onClick={() => setFilter('all')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'all' ? 'bg-gold-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                      Todos
                    </button>
                    <button 
                      onClick={() => setFilter('today')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'today' ? 'bg-gold-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                      Hoje
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                     {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                     Sincronizado
                  </div>
                </div>

                <div className="bg-dark-900 rounded-xl border border-dark-800 overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-dark-800 text-gray-400 border-b border-dark-700 text-sm uppercase tracking-wider">
                          <th className="p-4">Data</th>
                          <th className="p-4">Horário</th>
                          <th className="p-4">Cliente</th>
                          <th className="p-4">Serviço</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-dark-800">
                        {loading && appointments.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-12 text-center text-gray-500">
                              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                              Carregando dados...
                            </td>
                          </tr>
                        ) : filteredAppointments.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-12 text-center text-gray-500">
                              Nenhum agendamento encontrado para este filtro.
                            </td>
                          </tr>
                        ) : (
                          filteredAppointments.map((app) => (
                            <tr key={app.id} className="hover:bg-dark-800/50 transition-colors">
                              <td className="p-4 text-white font-medium">
                                {new Date(app.date).toLocaleDateString('pt-BR')}
                              </td>
                              <td className="p-4 text-gold-500 font-bold font-mono text-lg">
                                {app.time}
                              </td>
                              <td className="p-4">
                                <div className="text-white font-medium">{app.customerName}</div>
                                <div className="text-sm text-gray-500">{app.customerPhone}</div>
                              </td>
                              <td className="p-4 text-gray-300">
                                {getServiceName(app.serviceId)}
                              </td>
                              <td className="p-4">
                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                  app.status === 'confirmed' ? 'bg-green-900/30 text-green-400 border border-green-900' :
                                  app.status === 'cancelled' ? 'bg-red-900/30 text-red-400 border border-red-900' :
                                  'bg-yellow-900/30 text-yellow-400 border border-yellow-900'
                                }`}>
                                  {app.status === 'confirmed' ? 'Confirmado' : 
                                   app.status === 'cancelled' ? 'Cancelado' : 'Pendente'}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                  {app.status !== 'confirmed' && (
                                    <button 
                                      onClick={() => handleStatusChange(app.id, 'confirmed')}
                                      className="p-2 bg-green-900/20 text-green-500 hover:bg-green-900/40 rounded-lg transition-colors"
                                      title="Confirmar"
                                    >
                                      <Check className="w-5 h-5" />
                                    </button>
                                  )}
                                  {app.status !== 'cancelled' && (
                                    <button 
                                      onClick={() => handleStatusChange(app.id, 'cancelled')}
                                      className="p-2 bg-red-900/20 text-red-500 hover:bg-red-900/40 rounded-lg transition-colors"
                                      title="Cancelar"
                                    >
                                      <X className="w-5 h-5" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'announcements' && (
            <div className="max-w-3xl mx-auto space-y-8">
               <div className="text-center mb-8">
                 <h2 className="text-2xl font-bold text-white mb-2">Central de Avisos</h2>
                 <p className="text-gray-400">Gerencie banners de alerta, promoções ou avisos de feriados que aparecem no topo do site.</p>
               </div>

               {/* Announcement Manager */}
               <div className="bg-dark-900 rounded-xl border border-dark-800 p-8 shadow-xl">
                 <div className="flex items-center gap-3 mb-6 border-b border-dark-800 pb-4">
                   <div className="bg-gold-600/20 p-2 rounded-lg">
                     <Megaphone className="w-6 h-6 text-gold-500" />
                   </div>
                   <h3 className="text-xl font-bold text-white">Configurar Aviso</h3>
                 </div>

                 <form onSubmit={handleSaveAnnouncement} className="space-y-6">
                   <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">Mensagem do Banner</label>
                     <textarea 
                       className="w-full bg-dark-800 border border-dark-700 rounded-lg p-4 text-white focus:border-gold-500 outline-none transition-colors resize-none h-32 text-lg"
                       placeholder="Ex: Estaremos fechados no dia 25/12..."
                       value={announcement.message}
                       onChange={e => setAnnouncement({...announcement, message: e.target.value})}
                     />
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">Estilo do Alerta</label>
                     <div className="grid grid-cols-3 gap-4">
                        {(['info', 'alert', 'success'] as const).map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setAnnouncement({...announcement, type})}
                            className={`py-3 px-4 font-bold uppercase rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                              announcement.type === type 
                              ? type === 'info' ? 'bg-blue-900/20 border-blue-500 text-blue-400'
                                : type === 'alert' ? 'bg-red-900/20 border-red-500 text-red-400'
                                : 'bg-green-900/20 border-green-500 text-green-400'
                              : 'bg-dark-800 border-dark-700 text-gray-500 hover:border-dark-600 hover:text-gray-400'
                            }`}
                          >
                            {type === 'info' && <Clock className="w-4 h-4" />}
                            {type === 'alert' && <AlertTriangle className="w-4 h-4" />}
                            {type === 'success' && <Check className="w-4 h-4" />}
                            {type}
                          </button>
                        ))}
                     </div>
                   </div>

                   <div className="bg-dark-800/50 p-4 rounded-lg border border-dark-700/50 flex items-center justify-between">
                     <span className="text-gray-300 font-medium">Status do Aviso</span>
                     <label className="flex items-center gap-3 cursor-pointer">
                       <span className={`text-sm ${announcement.isActive ? 'text-green-500 font-bold' : 'text-gray-500'}`}>
                         {announcement.isActive ? 'ATIVADO' : 'DESATIVADO'}
                       </span>
                       <div className="relative">
                         <input 
                           type="checkbox" 
                           className="sr-only peer"
                           checked={announcement.isActive}
                           onChange={e => setAnnouncement({...announcement, isActive: e.target.checked})}
                         />
                         <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
                       </div>
                     </label>
                   </div>

                   <Button type="submit" fullWidth className="flex items-center justify-center gap-2 py-4 text-lg" disabled={savingNotice}>
                     {savingNotice ? <Loader2 className="w-5 h-5 animate-spin"/> : <Save className="w-5 h-5" />}
                     Salvar Alterações
                   </Button>

                   {showNoticeSuccess && (
                     <div className="bg-green-900/20 border border-green-900 text-green-400 p-3 rounded-lg flex items-center justify-center gap-2 animate-fade-in">
                       <Check className="w-4 h-4" />
                       Aviso atualizado com sucesso!
                     </div>
                   )}
                 </form>
               </div>

               {/* Announcement History */}
               {history.length > 0 && (
                 <div className="bg-dark-900 rounded-xl border border-dark-800 p-8 shadow-xl">
                    <div className="flex items-center gap-3 mb-6 border-b border-dark-800 pb-4">
                      <History className="w-6 h-6 text-gray-500" />
                      <h4 className="text-white font-bold text-lg">Histórico Recente (72h)</h4>
                    </div>
                    
                    <div className="space-y-4">
                      {history.map(item => (
                        <div key={item.id} className="bg-dark-800 rounded-lg p-4 border border-dark-700 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between group hover:border-dark-600 transition-colors">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                                  item.type === 'info' ? 'border-blue-900 text-blue-400'
                                  : item.type === 'alert' ? 'border-red-900 text-red-400'
                                  : 'border-green-900 text-green-400'
                              }`}>
                                {item.type}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(item.lastActiveAt).toLocaleString('pt-BR')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300">{item.message}</p>
                          </div>
                          <button 
                            onClick={() => handleReactivate(item)}
                            className="shrink-0 px-4 py-2 text-xs font-bold text-gold-500 border border-gold-600/30 rounded hover:bg-gold-600/10 transition-colors w-full md:w-auto"
                          >
                            Reativar
                          </button>
                        </div>
                      ))}
                    </div>
                 </div>
               )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};