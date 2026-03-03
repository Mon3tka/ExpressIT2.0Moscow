import React from 'react';
import { Link } from 'react-router-dom';
import Team from '../components/Team';

const AboutPage = () => {
  return (
    <div className="relative z-10 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-white">
            О компании
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            Мы обеспечиваем комплексную поддержку IT-инфраструктуры в Москве: сервера, сети, 1С, CRM, облака и информационная безопасность.
          </p>
        </div>

        <section className="grid gap-8 sm:grid-cols-2 mb-16">
          <Link to="/contacts" className="info-block rounded-2xl bg-black/40 backdrop-blur-sm border border-[var(--accent)]/30 text-white p-8 block">
            <div className="text-4xl font-semibold">10+</div>
            <div className="mt-1 text-white/80">лет успешной работы в IT</div>
          </Link>
          <Link to="/contacts" className="info-block rounded-2xl bg-black/40 backdrop-blur-sm border border-[var(--accent)]/30 text-white p-8 block">
            <div className="text-4xl font-semibold">500+</div>
            <div className="mt-1 text-white/80">реализованных проектов</div>
          </Link>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Наш подход
          </h2>
          <p className="text-white/80 max-w-2xl">
            Мы берём на себя IT-поддержку вашей компании без затрат на штат: бесперебойная работа серверов, компьютеров и сети. Вам не нужно платить зарплату, налоги, отпускные и обеспечивать рабочее место — вы платите только за реальные услуги по прозрачному SLA.
          </p>
        </section>

        <Team />

        <div className="mt-12 text-center">
          <Link
            to="/contacts"
            className="info-block inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition"
          >
            Связаться с нами
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
