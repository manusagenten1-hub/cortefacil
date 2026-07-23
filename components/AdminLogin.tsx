import React, { useState } from 'react';
import { ADMIN_PASSWORD_HASH } from '../constants';
import { Button } from './ui/Button';
import { Lock } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD_HASH) {
      onLoginSuccess();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm">
      <div className="w-full max-w-md p-8 bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-dark-800 rounded-full border border-dark-700">
            <Lock className="w-8 h-8 text-gold-500" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-white mb-8">Acesso Restrito</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input 
              type="password" 
              autoFocus
              placeholder="Digite a senha de acesso"
              className={`w-full bg-dark-800 border ${error ? 'border-red-500' : 'border-dark-700'} rounded-lg px-4 py-4 text-center text-xl text-white tracking-widest focus:border-gold-500 outline-none transition-colors`}
              value={password}
              onChange={(e) => {
                setError(false);
                setPassword(e.target.value);
              }}
            />
            {error && <p className="text-red-500 text-sm text-center mt-2">Acesso negado.</p>}
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="secondary" fullWidth onClick={onCancel}>
              Voltar
            </Button>
            <Button type="submit" fullWidth>
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};