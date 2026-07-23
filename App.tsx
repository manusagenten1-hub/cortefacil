import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LocationContact } from './components/LocationContact';
import { Services } from './components/Services';
import { BookingForm } from './components/BookingForm';
import { AboutUs } from './components/AboutUs';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { NoticeBanner } from './components/NoticeBanner';
import { MapPin, Phone, Clock } from 'lucide-react';

const Footer: React.FC = () => (
  <footer id="location" className="bg-dark-950 py-12 border-t border-dark-800">
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Corte<span className="text-gold-500">Fácil</span></h3>
        <p className="text-gray-500">
          A barbearia que define o seu estilo. Profissionalismo, ambiente premium e o melhor atendimento da cidade.
        </p>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Contato</h3>
        <ul className="space-y-3 text-gray-400">
          <li className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gold-600" />
            <span>Rua da Navalha, 123 - Centro</span>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-gold-600" />
            <span>(11) 99999-9999</span>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Horários</h3>
        <ul className="space-y-3 text-gray-400">
          <li className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold-600" />
            <span>Seg - Sex: 09:00 - 19:00</span>
          </li>
          <li className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold-600" />
            <span>Sáb: 09:00 - 15:00</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="mt-12 text-center text-gray-600 text-sm">
      © {new Date().getFullYear()} CorteFácil. Todos os direitos reservados.
    </div>
  </footer>
);

export default function App() {
  const [view, setView] = useState<'home' | 'admin-login' | 'admin-dashboard'>('home');

  // When admin triggers hidden entry
  const handleAdminTrigger = () => {
    setView('admin-login');
  };

  const handleLoginSuccess = () => {
    setView('admin-dashboard');
  };

  const handleLogout = () => {
    setView('home');
  };

  return (
    <div className="min-h-screen bg-dark-950 text-gray-100 font-sans selection:bg-gold-500 selection:text-white">
      {view === 'admin-dashboard' ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <>
          <Header onAdminTrigger={handleAdminTrigger} />
          <NoticeBanner />
          
          <main>
            <Hero />
            <LocationContact />
            <Services />
            <BookingForm />
            <AboutUs />
          </main>
          
          <Footer />

          {/* Login Overlay */}
          {view === 'admin-login' && (
            <AdminLogin 
              onLoginSuccess={handleLoginSuccess} 
              onCancel={() => setView('home')} 
            />
          )}
        </>
      )}
    </div>
  );
}