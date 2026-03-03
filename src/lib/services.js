import { servicesFull } from '../data/servicesFull';

/** Получить полные данные услуги по slug */
export function getServiceBySlug(slug) {
  for (const cat of servicesFull) {
    const item = cat.items.find((i) => i.slug === slug);
    if (item) return { ...item, category: cat.category };
  }
  return null;
}

/** Уникальный текст для заявки по услуге (для передачи в форму и сохранения в лид) */
export function getServiceLeadText(slug) {
  const s = getServiceBySlug(slug);
  if (!s) return null;
  return `Интересует услуга «${s.title}»: ${s.description} ${s.price ? `(${s.price})` : ''}`.trim();
}
