import React from 'react';
import { Award, Coffee, ShieldCheck, Star } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-dark-800 border-t border-dark-700 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-dark-900/50 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Composition */}
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-dark-600">
              <img 
                src="https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=1000&auto=format&fit=crop" 
                alt="Interior da Barbearia Premium" 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-dark-900/90 backdrop-blur-sm p-6 rounded-xl border-l-4 border-gold-500 shadow-lg">
                  <p className="text-gold-500 font-bold text-lg mb-1">"Excelência é hábito."</p>
                  <p className="text-gray-400 text-sm italic">Desde 2015 redefinindo o padrão masculino.</p>
                </div>
              </div>
            </div>
            
            {/* Decorative Offset Border */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold-600/20 rounded-2xl -z-10 hidden md:block"></div>
          </div>

          {/* Persuasive Copy */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-gold-500"></span>
                <span className="text-gold-500 font-bold uppercase tracking-widest text-sm">Nossa Essência</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Mais que um corte. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                  O seu refúgio.
                </span>
              </h2>
              
              <p className="text-gray-400 text-lg leading-relaxed">
                Na CorteFácil, não vendemos apenas cortes de cabelo; entregamos confiança. 
                Entendemos que o homem moderno busca um momento de pausa na rotina agitada.
              </p>
              
              <p className="text-gray-400 text-lg leading-relaxed mt-4">
                Nosso espaço foi arquitetado para ser um clube de cavalheiros. Aqui, a tradição da 
                barbearia clássica encontra técnicas avançadas de visagismo. O resultado? 
                Um visual que não apenas segue tendências, mas respeita a sua anatomia e personalidade.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-dark-700/50">
              <div className="space-y-2">
                <div className="bg-dark-700 w-10 h-10 flex items-center justify-center rounded-lg text-gold-500 mb-2">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold">Mestres Barbeiros</h4>
                <p className="text-sm text-gray-500">Profissionais com certificação internacional.</p>
              </div>
              
              <div className="space-y-2">
                <div className="bg-dark-700 w-10 h-10 flex items-center justify-center rounded-lg text-gold-500 mb-2">
                  <Coffee className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold">Open Bar</h4>
                <p className="text-sm text-gray-500">Café espresso e a primeira cerveja por nossa conta.</p>
              </div>

              <div className="space-y-2">
                <div className="bg-dark-700 w-10 h-10 flex items-center justify-center rounded-lg text-gold-500 mb-2">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold">Higiene Premium</h4>
                <p className="text-sm text-gray-500">Toalhas quentes esterilizadas e materiais descartáveis.</p>
              </div>

              <div className="space-y-2">
                <div className="bg-dark-700 w-10 h-10 flex items-center justify-center rounded-lg text-gold-500 mb-2">
                  <Star className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold">Ambiente VIP</h4>
                <p className="text-sm text-gray-500">Wi-fi de alta velocidade, TV e climatização ideal.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};