import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

const ADMIN_PASSWORD = 'admin123';
const SESSION_KEY = 'it_admin_session';

export function setAdminSession() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch (e) {
    console.warn('sessionStorage not available', e);
  }
}

export function isAdminLoggedIn() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function logoutAdmin() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (_) {}
}

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? '/admin';

  if (isAdminLoggedIn()) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (password.trim() === ADMIN_PASSWORD) {
      setAdminSession();
      navigate(from, { replace: true });
      return;
    }
    setError('Неверный пароль. Для демо используйте admin123');
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 text-white px-8 py-6 text-center">
          <div className="w-14 h-14 rounded-xl bg-[#ff6b00] flex items-center justify-center text-2xl font-bold mx-auto mb-3 text-white">
            A
          </div>
          <h1 className="text-xl font-semibold text-white">Вход в админ-панель</h1>
          <p className="text-slate-300 text-sm mt-1">IT-аутсорсинг — заявки и управление</p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Введите пароль"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-transparent transition"
              autoFocus
              autoComplete="current-password"
              disabled={loading}
            />
          </div>
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-2.5 text-sm text-red-700">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? 'Вход…' : 'Войти'}
          </button>
        </form>
        <div className="px-8 pb-6">
          <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-xs text-amber-800">
            <strong>Демо-доступ:</strong> пароль <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono text-amber-900">admin123</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
