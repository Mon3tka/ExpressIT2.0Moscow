import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getServiceBySlug } from '../lib/services';

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const leadText = `Интересует услуга «${service.title}»: ${service.description}${service.price ? ` (${service.price})` : ''}`;
  const contactsUrl = `/contacts?service=${encodeURIComponent(leadText)}`;

  return (
    <div className="relative z-10 py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[var(--accent)] transition mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Все услуги
        </Link>

        <article className="service-content info-block rounded-2xl bg-black/40 backdrop-blur-sm border border-[var(--accent)]/30 p-8 sm:p-10">
          <div className="mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {service.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-semibold text-white mt-0.5">
                {service.title}
              </h1>
            </div>
          </div>

          <p className="text-white/90 text-base sm:text-lg leading-relaxed">
            {service.fullDescription || service.description}
          </p>

          {service.details && service.details.length > 0 && (
            <ul className="mt-6 space-y-2">
              {service.details.map((d) => (
                <li key={d} className="flex gap-2 text-white/80">
                  <span className="text-[var(--accent)] mt-1">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}

          {service.price && (
            <div className="mt-6 pt-6 border-t border-[var(--accent)]/20">
              <span className="text-sm text-white/60">Ориентировочная цена по рынку Москвы:</span>
              <div className="text-xl font-semibold text-[var(--accent)] mt-1">
                {service.price}
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to={contactsUrl}
              className="info-block inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-[var(--accent-hover)] transition shadow-lg text-center"
            >
              Оставить заявку на услугу
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-6 py-4 rounded-xl border border-[var(--accent)]/40 text-white/90 hover:text-white hover:border-[var(--accent)]/60 transition text-center"
            >
              Другие услуги
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
