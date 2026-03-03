import React from 'react';
import { Outlet, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { isAdminLoggedIn, logoutAdmin } from './AdminLogin';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = isAdminLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="bg-white fixed inset-0 overflow-y-auto">
      <header className="sticky top-0 z-40 bg-slate-800 text-white shadow-lg border-b border-slate-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="font-semibold flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center text-sm font-bold">A</span>
              Админ-панель
            </Link>
            <Link to="/admin" className="text-white/80 hover:text-white text-sm transition">
              Заявки
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-sm text-white/80 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-white/10"
            >
              На сайт
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm text-white/80 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-white/10"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-50 min-h-[calc(100vh-3.5rem)]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
