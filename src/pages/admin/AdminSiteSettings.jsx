import React, { useState, useEffect } from 'react';
import { getSiteConfig, hydrateConfigFromApi, saveSiteConfig } from '../../lib/siteConfig';

const AdminSiteSettings = () => {
  const [config, setConfig] = useState(getSiteConfig());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    hydrateConfigFromApi().then((c) => {
      setConfig(c);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const ok = await saveSiteConfig(config);
    setSaving(false);
    alert(ok ? 'Настройки сохранены' : 'Ошибка сохранения');
  };

  const updateDesign = (key, value) => {
    setConfig((c) => ({
      ...c,
      design: { ...(c.design || {}), [key]: value },
    }));
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <p className="text-slate-600">Загрузка…</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Настройки дизайна</h1>
        <p className="text-slate-600 text-sm mt-0.5">Цвета, стили — изменения видны на всём сайте</p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold text-slate-800">Цвета</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Акцентный цвет</label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={config.design?.accentColor || '#ff6b00'}
                onChange={(e) => updateDesign('accentColor', e.target.value)}
                className="w-14 h-10 rounded-lg border border-slate-200 cursor-pointer"
              />
              <input
                type="text"
                value={config.design?.accentColor || '#ff6b00'}
                onChange={(e) => updateDesign('accentColor', e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Акцент при наведении</label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={config.design?.accentHover || '#e55a00'}
                onChange={(e) => updateDesign('accentHover', e.target.value)}
                className="w-14 h-10 rounded-lg border border-slate-200 cursor-pointer"
              />
              <input
                type="text"
                value={config.design?.accentHover || '#e55a00'}
                onChange={(e) => updateDesign('accentHover', e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition disabled:opacity-70"
      >
        {saving ? 'Сохранение…' : 'Сохранить настройки'}
      </button>
    </div>
  );
};

export default AdminSiteSettings;
