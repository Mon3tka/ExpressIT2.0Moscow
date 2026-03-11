/** Настройки сайта: API в продакшене, localStorage как кэш/fallback */

import { apiGetConfig, apiSaveConfig } from './api';

const STORAGE_KEY = 'expressit_site_config';

const defaultConfig = {
  hero: {
    badge: 'Реакция инженера до 15 минут 24/7 — без доплат',
    title1: 'Без простоев, без отказов, без стресса —',
    title2: 'IT-поддержка бизнеса 24/7 в Москве',
    intro: 'Берём на себя всю IT-инфраструктуру: от рабочих мест и серверов до 1С и сетей. Гарантируем реакцию инженера до 15 минут 24/7, работу по NDA, прозрачный фиксированный абонемент без скрытых платежей и документированную инфраструктуру, которая всегда остаётся под вашим контролем.',
    bullets: [
      'Пробный период 2 недели без риска и штрафов за расторжение.',
      'Полная документация: все доступы и схемы — на стороне вашей компании.',
      'Защита данных: NDA по умолчанию, аудит действий и разграничение доступов.',
      'Ежемесячная отчётность: вы видите, за что платите и что предотвращено.',
    ],
    ctaPrimary: 'Оставить заявку',
    ctaSecondary: 'Рассчитать экономию на IT',
    ctaHint: 'Первичная консультация и аудит инфраструктуры — бесплатно.',
  },
  design: {
    accentColor: '#ff6b00',
    accentHover: '#e55a00',
  },
};

function applyDesignVars(config) {
  const c = config?.design ?? defaultConfig.design;
  document.documentElement.style.setProperty('--accent', c.accentColor ?? defaultConfig.design.accentColor);
  document.documentElement.style.setProperty('--accent-hover', c.accentHover ?? defaultConfig.design.accentHover);
}

/** Синхронное чтение из localStorage (для первого рендера) */
export function getSiteConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultConfig, ...parsed };
    }
  } catch (_) {}
  return defaultConfig;
}

/** Сохранить в localStorage (для UI) */
function setLocalConfig(config) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    applyDesignVars(config);
  } catch (_) {}
}

/** Гидрировать конфиг с API (вызвать при загрузке приложения) */
export async function hydrateConfigFromApi() {
  try {
    const data = await apiGetConfig();
    const merged = { ...defaultConfig, ...data };
    setLocalConfig(merged);
    return merged;
  } catch (_) {
    return getSiteConfig();
  }
}

/** Сохранить конфиг в API (админка) — асинхронно */
export async function saveSiteConfig(config) {
  try {
    await apiSaveConfig(config);
    setLocalConfig(config);
    return true;
  } catch (e) {
    console.error('saveSiteConfig failed', e);
    return false;
  }
}

/** Только локальное сохранение (fallback без API) */
export function saveSiteConfigLocal(config) {
  setLocalConfig(config);
  return true;
}

export function resetSiteConfig() {
  localStorage.removeItem(STORAGE_KEY);
}
