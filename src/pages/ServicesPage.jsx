import React from 'react';
import { Link } from 'react-router-dom';
import { servicesFull } from '../data/servicesFull';

const ServicesPage = () => {
  return (
    <div className="py-12 sm:py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold text-white">
            Наши услуги
          </h1>
          <p className="mt-3 text-white/80 max-w-2xl">
            Обслуживание компьютеров, настройка серверов, 1С, сети, ПО — комплексная поддержка IT-инфраструктуры вашего бизнеса в Москве. Цены ориентировочные по рынку Москвы.
          </p>
        </div>

        <div className="space-y-14 service-content">
          {servicesFull.map((group) => (
            <section key={group.category}>
              <h2 className="info-block text-xl font-semibold text-white mb-6 rounded-xl bg-black/40 backdrop-blur-sm border border-[var(--accent)]/30 px-5 py-4 w-fit">
                {group.category}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/services/${item.slug}`}
                    className="info-block group rounded-xl bg-black/40 backdrop-blur-sm p-5 flex flex-col transition-all duration-300 cursor-pointer"
                  >
                    <h3 className="text-base font-semibold text-white group-hover:text-[var(--accent)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/70 flex-1">{item.description}</p>
                    <ul className="mt-3 space-y-1 text-xs text-white/60">
                      {item.details.map((d) => (
                        <li key={d} className="flex gap-1.5">
                          <span className="text-[var(--accent)]">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    {item.price && (
                      <div className="mt-3 pt-3 border-t border-[var(--accent)]/20 text-sm font-medium text-[var(--accent)]">
                        {item.price}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/contacts"
            className="info-block inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition shadow-lg"
          >
            Заказать услугу
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
