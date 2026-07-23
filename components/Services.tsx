import React from 'react';
import { SERVICES } from '../constants';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-dark-900">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Menu de Serviços</h2>
          <p className="text-gray-400">Estilo e precisão para o homem moderno.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              className="flex gap-5 items-start group"
            >
              {/* Image as Bullet Point */}
              <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden border border-dark-700 shadow-lg group-hover:border-gold-500/50 transition-all duration-300 relative">
                 <div className="absolute inset-0 bg-dark-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={service.imageUrl} 
                  alt={service.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
                <div className="flex justify-between items-baseline mb-2 border-b border-dark-800 border-dashed pb-2">
                  <h3 className="text-lg font-bold text-white truncate group-hover:text-gold-500 transition-colors">
                    {service.name}
                  </h3>
                  <span className="text-gold-500 font-bold whitespace-nowrap ml-4 text-lg">
                    R$ {service.price},00
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};