import React, { useState, useEffect } from 'react';
import { getSiteConfig, hydrateConfigFromApi, saveSiteConfig } from '../../lib/siteConfig';

const AdminHeroEdit = () => {
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
    alert(ok ? 'Блок Hero сохранён' : 'Ошибка сохранения');
  };

  const updateHero = (key, value) => {
    setConfig((c) => ({
      ...c,
      hero: { ...(c.hero || {}), [key]: value },
    }));
  };

  const updateBullet = (index, value) => {
    const bullets = [...(config.hero?.bullets || [])];
    bullets[index] = value;
    updateHero('bullets', bullets);
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
        <h1 className="text-2xl font-bold text-slate-900">Редактирование Hero</h1>
        <p className="text-slate-600 text-sm mt-0.5">Главный блок на главной странице</p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Бейдж (маленький текст)</label>
          <input
            type="text"
            value={config.hero?.badge || ''}
            onChange={(e) => updateHero('badge', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Заголовок (первая строка)</label>
          <input
            type="text"
            value={config.hero?.title1 || ''}
            onChange={(e) => updateHero('title1', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Заголовок (оранжевая строка)</label>
          <input
            type="text"
            value={config.hero?.title2 || ''}
            onChange={(e) => updateHero('title2', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Описание</label>
          <textarea
            value={config.hero?.intro || ''}
            onChange={(e) => updateHero('intro', e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-slate-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Пункты списка</label>
          {(config.hero?.bullets || []).map((bullet, i) => (
            <input
              key={i}
              type="text"
              value={bullet}
              onChange={(e) => updateBullet(i, e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 mb-2"
              placeholder={`Пункт ${i + 1}`}
            />
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Текст кнопки 1</label>
            <input
              type="text"
              value={config.hero?.ctaPrimary || ''}
              onChange={(e) => updateHero('ctaPrimary', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Текст кнопки 2</label>
            <input
              type="text"
              value={config.hero?.ctaSecondary || ''}
              onChange={(e) => updateHero('ctaSecondary', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Подсказка под кнопками</label>
          <input
            type="text"
            value={config.hero?.ctaHint || ''}
            onChange={(e) => updateHero('ctaHint', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-200"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition disabled:opacity-70"
      >
        {saving ? 'Сохранение…' : 'Сохранить Hero'}
      </button>
    </div>
  );
};

export default AdminHeroEdit;
