import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { apiGetLeads, apiUpdateLeadStatus, apiDeleteLead } from '../../lib/api';

const STATUSES = [
  { value: 'new', label: 'Новая', color: 'bg-blue-100 text-blue-800' },
  { value: 'contacted', label: 'Связались', color: 'bg-amber-100 text-amber-800' },
  { value: 'done', label: 'Обработана', color: 'bg-emerald-100 text-emerald-800' },
  { value: 'archive', label: 'В архиве', color: 'bg-slate-100 text-slate-600' },
];

const formatDate = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  const today = new Date();
  const isToday = d.toDateString() === today.toDateString();
  if (isToday) return `Сегодня, ${d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
  return d.toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiGetLeads();
      setLeads(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.data?.error || e?.message || 'Не удалось загрузить заявки');
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const refresh = () => fetchLeads();

  const filtered = useMemo(() => {
    let list = leads;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (l) =>
          (l.name || '').toLowerCase().includes(q) ||
          (l.email || '').toLowerCase().includes(q) ||
          (l.phone || '').toLowerCase().includes(q) ||
          (l.comment || '').toLowerCase().includes(q)
      );
    }
    if (statusFilter) {
      list = list.filter((l) => (l.status || 'new') === statusFilter);
    }
    return list;
  }, [leads, search, statusFilter]);

  const stats = useMemo(() => {
    const total = leads.length;
    const today = new Date().toDateString();
    const todayCount = leads.filter((l) => l.createdAt && new Date(l.createdAt).toDateString() === today).length;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekCount = leads.filter((l) => l.createdAt && new Date(l.createdAt) >= weekAgo).length;
    const newCount = leads.filter((l) => (l.status || 'new') === 'new').length;
    return { total, todayCount, weekCount, newCount };
  }, [leads]);

  const handleStatusChange = async (id, status) => {
    try {
      await apiUpdateLeadStatus(id, status);
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    } catch (_) {}
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить заявку?')) return;
    setDeletingId(id);
    try {
      await apiDeleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (_) {}
    setDeletingId(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Заявки с сайта</h1>
          <p className="text-slate-600 text-sm mt-0.5">Управление заявками из формы контактов</p>
        </div>
        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition shadow-sm disabled:opacity-70"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Обновить
        </button>
      </div>

      {error && (
        <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md transition">
          <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
          <div className="text-sm text-slate-500 mt-0.5">Всего заявок</div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md transition">
          <div className="text-2xl font-bold text-[var(--accent)]">{stats.newCount}</div>
          <div className="text-sm text-slate-500 mt-0.5">Новых</div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md transition">
          <div className="text-2xl font-bold text-slate-900">{stats.todayCount}</div>
          <div className="text-sm text-slate-500 mt-0.5">Сегодня</div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md transition">
          <div className="text-2xl font-bold text-slate-900">{stats.weekCount}</div>
          <div className="text-sm text-slate-500 mt-0.5">За 7 дней</div>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Информационный блок</h2>
        <p className="text-sm text-slate-600">
          Заявки сохраняются в базе данных на сервере. API: <code className="bg-slate-100 px-1 rounded text-xs">/api/leads</code>
        </p>
        <Link to="/contacts" className="inline-block mt-3 text-sm font-medium text-[var(--accent)] hover:underline">
          Открыть форму на сайте →
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по имени, email, телефону, комментарию..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="sm:w-48 px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
        >
          <option value="">Все статусы</option>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center">
          <p className="text-slate-600 font-medium">Загрузка заявок…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center">
          <div className="text-slate-400 text-5xl mb-3">📋</div>
          <p className="text-slate-600 font-medium">
            {leads.length === 0 ? 'Пока нет заявок' : 'Нет заявок по выбранным фильтрам'}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            {leads.length === 0 ? 'Они появятся здесь после отправки формы на странице «Контакты»' : 'Измените поиск или фильтр'}
          </p>
          {leads.length === 0 && (
            <Link to="/contacts" className="inline-block mt-4 px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-hover)] transition">
              Перейти к форме
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((lead) => (
            <div
              key={lead.id}
              className={`rounded-2xl border bg-white p-5 shadow-sm transition ${deletingId === lead.id ? 'opacity-50' : 'hover:shadow-md border-slate-200 hover:border-slate-300'}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-900">{lead.name || 'Без имени'}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium ${STATUSES.find((s) => s.value === (lead.status || 'new'))?.color ?? 'bg-slate-100 text-slate-600'}`}>
                      {STATUSES.find((s) => s.value === (lead.status || 'new'))?.label ?? 'Новая'}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0 text-sm text-slate-600">
                    <a href={`tel:${lead.phone}`} className="hover:text-[var(--accent)]">
                      {lead.phone || '—'}
                    </a>
                    <a href={`mailto:${lead.email}`} className="hover:text-[var(--accent)]">
                      {lead.email || '—'}
                    </a>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{formatDate(lead.createdAt)}</div>
                  {lead.comment && (
                    <p className="mt-3 text-sm text-slate-600 border-t border-slate-100 pt-3">
                      {lead.comment}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={lead.status || 'new'}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    className="text-sm rounded-lg border border-slate-200 px-3 py-1.5 outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
                  >
                    {STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => handleDelete(lead.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                    title="Удалить"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-2xl bg-slate-700 text-white p-6">
        <h3 className="font-semibold">Подсказка</h3>
        <p className="text-sm text-white/90 mt-1">
          Клик по телефону или email открывает звонок или письмо. Меняйте статус заявки по мере обработки.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
