import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Advantages from '../components/Advantages';
import Services from '../components/Services';
import Process from '../components/Process';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Advantages />
      <Services />
      <Process />
      <Team />
      <Testimonials />
      <section className="relative z-10 py-16 sm:py-20 border-t border-[var(--accent)]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="info-block rounded-2xl bg-black/40 backdrop-blur-sm border border-[var(--accent)]/30 p-8 sm:p-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              Готовы обсудить ваш проект?
            </h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">
              Оставьте заявку — в течение 15 минут с вами свяжется технический специалист и подберём формат IT-аутсорсинга под ваш бизнес.
            </p>
            <Link
              to="/contacts"
              className="info-block inline-flex items-center justify-center px-7 py-3 mt-6 rounded-lg bg-[var(--accent)] text-white font-semibold shadow-lg hover:bg-[var(--accent-hover)] transition"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
