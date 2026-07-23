import React, { useState, useEffect } from 'react';
 import { SERVICES } from '../constants';
import { getAvailableSlots, saveAppointment, subscribeToChanges } from '../services/storage';
import { ServiceType } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Calendar, Clock, User, Phone, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';

export const BookingForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceId: 'personalizado' as ServiceType,
    date: '',
    time: ''
  });
  const [phoneError, setPhoneError] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Helper to check if it's Sunday
  const isSunday = (dateString: string) => {
    if (!dateString) return false;
    const date = new Date(dateString + 'T12:00:00');
    return date.getDay() === 0;
  };

  // Update slots when date changes or db changes
  useEffect(() => {
    const fetchSlots = async () => {
      if (formData.date) {
        setIsLoadingSlots(true);
        const slots = await getAvailableSlots(formData.date);
        setAvailableSlots(slots);
        setIsLoadingSlots(false);
      }
    };

    fetchSlots();

    const handleUpdate = () => {
      fetchSlots();
    };
    
    const unsubscribe = subscribeToChanges(handleUpdate);
    return unsubscribe;
  }, [formData.date]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, "");
    
    // Limit to 11 digits
    if (v.length > 11) v = v.slice(0, 11);
    
    // Apply Mask: (XX) XXXXX-XXXX
    if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    }
    if (v.length > 7) {
      v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    }
    
    setFormData({...formData, phone: v});
    
    // Clear error while typing if valid length
    if (phoneError) setPhoneError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate Phone
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setPhoneError('Por favor, insira um número de telefone válido (com DDD).');
      return;
    }

    if (!formData.name || !formData.date || !formData.time) return;

    setIsSubmitting(true);
    await saveAppointment({
      customerName: formData.name,
      customerPhone: formData.phone,
      serviceId: formData.serviceId,
      date: formData.date,
      time: formData.time
    });
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const today = new Date().toISOString().split('T')[0];
  const isSelectedDateSunday = isSunday(formData.date);

  if (isSuccess) {
    return (
      <section id="booking" className="py-24 bg-dark-800">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-dark-900 border border-gold-600/30 p-12 rounded-3xl animate-fade-in">
            <CheckCircle className="w-20 h-20 text-gold-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Agendamento Confirmado!</h2>
            <p className="text-gray-400 mb-8">
              Obrigado, {formData.name}. Seu horário está reservado para {formData.date} às {formData.time}.
            </p>
            <Button onClick={() => {
              setIsSuccess(false);
              setStep(1);
              setFormData({ name: '', phone: '', serviceId: 'personalizado', date: '', time: '' });
              setPhoneError('');
            }}>
              Novo Agendamento
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Agendar Horário</h2>
          <p className="text-gray-400">Rápido, fácil e sem burocracia.</p>
        </div>

        <div className="bg-dark-900 p-8 md:p-12 rounded-3xl border border-dark-700 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Service Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-4">Selecione o Serviço</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SERVICES.map(service => (
                  <div 
                    key={service.id}
                    onClick={() => setFormData({...formData, serviceId: service.id})}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
                      formData.serviceId === service.id 
                      ? 'border-gold-600 bg-gold-600/10' 
                      : 'border-dark-700 bg-dark-800 hover:border-dark-600'
                    }`}
                  >
                    <div className="font-bold text-white">{service.name}</div>
                    <div className="flex justify-between items-end mt-2">
                      <span className="text-sm text-gray-400">{service.durationMinutes} min</span>
                      <span className="text-gold-500 font-semibold">R$ {service.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Escolha a Data
                </label>
                <input 
                  type="date"
                  min={today}
                  required
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                  value={formData.date}
                  onChange={(e) => {
                    setFormData({...formData, date: e.target.value, time: ''});
                  }}
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Horários Disponíveis
                </label>
                {!formData.date ? (
                  <div className="text-gray-600 italic p-3 border border-dashed border-dark-700 rounded-lg">
                    Selecione uma data primeiro
                  </div>
                ) : isLoadingSlots ? (
                   <div className="flex items-center gap-2 text-gold-500 p-3">
                     <Loader2 className="w-5 h-5 animate-spin" /> Buscando horários...
                   </div>
                ) : isSelectedDateSunday ? (
                   <div className="text-red-400 p-3 bg-red-900/10 rounded-lg border border-red-900/50 flex items-center gap-2">
                     <AlertTriangle className="w-4 h-4" />
                     Fechado aos domingos. Selecione outra data.
                   </div>
                ) : availableSlots.length === 0 ? (
                  <div className="text-yellow-400 p-3 bg-yellow-900/10 rounded-lg border border-yellow-900/50">
                    Agenda cheia ou horário encerrado para hoje.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto custom-scrollbar">
                    {availableSlots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({...formData, time: slot})}
                        className={`py-2 px-1 text-sm rounded transition-colors ${
                          formData.time === slot
                          ? 'bg-gold-600 text-white'
                          : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Personal Info */}
            <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-dark-700">
              <Input 
                label="Seu Nome Completo" 
                placeholder="Ex: João Silva" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
              <Input 
                label="Seu WhatsApp/Telefone" 
                placeholder="Ex: (11) 99999-9999" 
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                error={phoneError}
                maxLength={15} // (11) 99999-9999
                required
              />
            </div>

            <Button 
              type="submit" 
              fullWidth 
              disabled={!formData.time || !formData.name || !formData.phone || isSubmitting}
              className="flex items-center justify-center gap-2"
            >
              {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin"/> Agendando...</> : 'Confirmar Agendamento'}
            </Button>

          </form>
        </div>
      </div>
    </section>
  );
};
