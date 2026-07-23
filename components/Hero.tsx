import React from 'react';
import { Button } from './ui/Button';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop" 
          alt="Barbershop interior" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-900/80 to-dark-900"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-gold-500 font-medium tracking-widest text-sm uppercase mb-4 animate-fade-in">
          Estilo & Tradição
        </h2>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          Seu estilo <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            começa aqui.
          </span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Cortes precisos, barbas impecáveis e um ambiente pensado para o homem moderno. Agende seu horário e transforme seu visual.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#booking">
            <Button className="w-full sm:w-auto">Agendar Corte</Button>
          </a>
          <a href="#services">
            <Button variant="outline" className="w-full sm:w-auto">Ver Serviços</Button>
          </a>
        </div>
      </div>
    </section>
  );
};