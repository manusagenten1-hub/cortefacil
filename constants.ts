import { Service } from './types';

export const ADMIN_PASSWORD_HASH = "121314151617181910121314151617181910";

export const SERVICES: Service[] = [
  { 
    id: 'personalizado', 
    name: 'Corte Personalizado', 
    price: 30, 
    durationMinutes: 45,
    description: 'Consultoria de visagismo para encontrar o corte ideal para seu rosto.',
    imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=300&auto=format&fit=crop'
  },
  { 
    id: 'low-fade', 
    name: 'Low Fade', 
    price: 35, 
    durationMinutes: 45,
    description: 'Degradê baixo e sutil, iniciando próximo à orelha.',
    imageUrl: 'https://i.pinimg.com/originals/1c/5e/fc/1c5efcacfb194c250096a53133ab4d44.jpg'
  },
  { 
    id: 'mid-fade', 
    name: 'Mid Fade', 
    price: 35, 
    durationMinutes: 45,
    description: 'Degradê médio, o equilíbrio perfeito entre estilo e discrição.',
    imageUrl: 'https://blog.newoldman.com.br/wp-content/uploads/2025/02/Inspiracoes-Mid-Fade-8.jpg'
  },
  { 
    id: 'social', 
    name: 'Corte Social', 
    price: 30, 
    durationMinutes: 40,
    description: 'Todo na tesoura, clássico, alinhado e executivo.',
    imageUrl: 'https://i.pinimg.com/564x/52/d1/65/52d1655bdee95dd59cfb56201926318a.jpg'
  },
  { 
    id: 'militar', 
    name: 'Corte Militar', 
    price: 30, 
    durationMinutes: 30,
    description: 'Laterais zero ou muito baixas, topo curto. Praticidade total.',
    imageUrl: 'https://i.pinimg.com/736x/7c/7d/26/7c7d269a7f26983fea049b1a2e74298f.jpg'
  },
  { 
    id: 'buzzcut', 
    name: 'Buzz cut', 
    price: 25, 
    durationMinutes: 30,
    description: 'Corte raspado uniforme na máquina. Estilo moderno e radical.',
    imageUrl: 'https://salaovirtual.org/wp-content/uploads/2021/12/buzz-cut-masculino.jpg'
  },
  { 
    id: 'barba', 
    name: 'Barba Tradicional', 
    price: 30, 
    durationMinutes: 30,
    description: 'Toalha quente, navalha e pós-barba refrescante.',
    imageUrl: 'https://dralexgoldbach.com.br/blog/wp-content/uploads/2022/02/crescimento-de-barba-1024x536.jpg'
  },
  { 
    id: 'limpeza', 
    name: 'Limpeza Facial', 
    price: 50, 
    durationMinutes: 30,
    description: 'Remoção de impurezas e tratamento facial completo.',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=300&auto=format&fit=crop'
  },
  { 
    id: 'hidratacao', 
    name: 'Hidratação da Barba', 
    price: 30, 
    durationMinutes: 20,
    description: 'Tratamento com óleos para amaciar e alinhar os fios.',
    imageUrl: 'https://cdn.sistemawbuy.com.br/arquivos/2ff2a6ae590a5650a33f3f01cd925b45/blogitens/imagem-fronta-de-homem-usando-babosa-na-barba-656f83e1e446b1.png'
  },
  { 
    id: 'combo', 
    name: 'Combo (Cabelo + Barba)', 
    price: 60, 
    durationMinutes: 75,
    description: 'Serviço completo de cabelo e barba com desconto especial.',
    imageUrl: 'https://i.pinimg.com/474x/89/bc/14/89bc140dae5a33c211d9f336788898fb.jpg'
  },
];

export const OPENING_HOUR = 9; // 9:00
export const CLOSING_HOUR = 19; // 19:00
export const INTERVAL_MINUTES = 60; // 1 hour slots for simplicity