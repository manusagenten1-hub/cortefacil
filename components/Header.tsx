import React, { useState, useEffect } from 'react';
import { Scissors } from 'lucide-react';

interface HeaderProps {
  onAdminTrigger: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAdminTrigger }) => {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (clickCount >= 10) {
      onAdminTrigger();
      setClickCount(0); // Reset after triggering
    }
  }, [clickCount, onAdminTrigger]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setClickCount(prev => prev + 1);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/90 backdrop-blur-md border-b border-dark-800">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={handleLogoClick}
        >
          <div className="bg-gold-600 p-2 rounded-lg">
            <Scissors className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">
            Corte<span className="text-gold-500">Fácil</span>
          </span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <a href="#hero" className="hover:text-gold-500 transition-colors">Início</a>
          <a href="#services" className="hover:text-gold-500 transition-colors">Serviços</a>
          <a href="#booking" className="hover:text-gold-500 transition-colors">Agendar</a>
          <a href="#about" className="hover:text-gold-500 transition-colors">Sobre</a>
          <a href="#location" className="hover:text-gold-500 transition-colors">Contato</a>
        </nav>
      </div>
    </header>
  );
};