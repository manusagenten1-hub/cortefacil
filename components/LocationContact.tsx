import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

export const LocationContact: React.FC = () => {
  return (
    <section id="location-info" className="py-20 bg-dark-800 border-b border-dark-700 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <div>
              <h2 className="text-gold-500 font-medium tracking-widest text-sm uppercase mb-2">
                Localização
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Venha conhecer nosso espaço
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Um ambiente clássico e sofisticado, pensado para o seu conforto. 
                Estacionamento próprio e aquela cerveja gelada de cortesia.
              </p>
            </div>

            <div className="space-y-6">
              {/* Endereço */}
              <div className="flex items-start gap-4">
                <div className="bg-dark-700 p-3 rounded-lg border border-dark-600">
                  <MapPin className="w-6 h-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Endereço</h3>
                  <p className="text-gray-400">Rua da Navalha, 123 - Centro</p>
                  <p className="text-sm text-gray-500">Ao lado do Banco Central</p>
                </div>
              </div>

              {/* Horários */}
              <div className="flex items-start gap-4">
                <div className="bg-dark-700 p-3 rounded-lg border border-dark-600">
                  <Clock className="w-6 h-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Horário de Atendimento</h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 mt-1">
                    <span className="text-gray-400">Segunda - Sexta</span>
                    <span className="text-white font-mono text-right">09:00 - 19:00</span>
                    <span className="text-gray-400">Sábado</span>
                    <span className="text-white font-mono text-right">09:00 - 15:00</span>
                    <span className="text-gray-500">Domingo</span>
                    <span className="text-gray-500 font-mono text-right">Fechado</span>
                  </div>
                </div>
              </div>

              {/* Contato */}
              <div className="flex items-start gap-4">
                <div className="bg-dark-700 p-3 rounded-lg border border-dark-600">
                  <Phone className="w-6 h-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Contato</h3>
                  <p className="text-gray-400">(11) 99999-9999</p>
                  <p className="text-sm text-green-500 mt-1">Whatsapp Disponível</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-dark-700 group">
             <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent z-10"></div>
             <img 
               src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop" 
               alt="Fachada Barbearia" 
               className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute bottom-6 left-6 z-20">
               <span className="bg-gold-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                 Estacionamento Grátis
               </span>
               <p className="text-white font-medium text-sm max-w-xs mt-2">
                 Rua da Navalha, 123 - Centro<br/>
                 São Paulo - SP
               </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};