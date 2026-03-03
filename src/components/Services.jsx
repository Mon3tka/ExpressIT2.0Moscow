import React from 'react';
import { Link } from 'react-router-dom';
import { servicesFull } from '../data/servicesFull';

const popularSlugs = [
  'administrirovanie-serverov',
  'obsluzhivanie-rabochih-mest',
  'administrirovanie-1s',
  'nastroyka-lokalnoy-seti',
  'udalyonnaya-podderzhka',
  'audit-it-sistem',
];

const Services = () => {
  const popular = servicesFull.flatMap((g) => g.items).filter((item) => popularSlugs.includes(item.slug));

  return (
    <section id="services" className="service-content relative z-10 py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              Популярные услуги
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/80 max-w-xl">
              Выбираем модель сотрудничества под ваш бизнес: от поддержки небольшого офиса до
              распределённой сети филиалов. Цены — по рынку Москвы. Нажмите на услугу для заявки.
            </p>
          </div>
          <Link
            to="/services"
            className="info-block text-sm font-medium text-[var(--accent)] hover:underline shrink-0 px-3 py-1.5 rounded-lg"
          >
            Все услуги →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="info-block group rounded-xl bg-black/40 backdrop-blur-sm p-6 flex flex-col justify-between block"
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white group-hover:text-[var(--accent)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-white/70">{service.description}</p>
              </div>
              <ul className="mt-4 space-y-1.5 text-xs text-white/60">
                {service.details.slice(0, 3).map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="mt-1 h-1 w-1 rounded-full bg-[var(--accent)] shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              {service.price && (
                <div className="mt-3 pt-3 border-t border-[var(--accent)]/20 text-sm font-medium text-[var(--accent)]">
                  {service.price}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
