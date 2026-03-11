import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Advantages from '../components/Advantages';
import Services from '../components/Services';
import Process from '../components/Process';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';

const HomePage = () => {
  const sectionsRef = useRef(null);

  useEffect(() => {
    const el = sectionsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );
    el.querySelectorAll('.reveal-on-scroll').forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <div ref={sectionsRef}>
        <div className="reveal-on-scroll"><Advantages /></div>
        <div className="reveal-on-scroll"><Services /></div>
        <div className="reveal-on-scroll"><Process /></div>
        <div className="reveal-on-scroll"><Team /></div>
        <div className="reveal-on-scroll"><Testimonials /></div>
      <section className="reveal-on-scroll relative z-10 py-16 sm:py-20 border-t border-[var(--accent)]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="info-block rounded-2xl bg-black/40 backdrop-blur-sm border border-[var(--accent)]/30 p-8 sm:p-10 max-w-2xl mx-auto hover:scale-[1.01] transition-transform duration-300">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              Готовы обсудить ваш проект?
            </h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">
              Оставьте заявку — в течение 15 минут с вами свяжется технический специалист и подберём формат IT-аутсорсинга под ваш бизнес.
            </p>
            <Link
              to="/contacts"
              className="info-block inline-flex items-center justify-center px-7 py-3 mt-6 rounded-lg bg-[var(--accent)] text-white font-semibold shadow-lg hover:bg-[var(--accent-hover)] transition hover:scale-[1.02] active:scale-[0.98]"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default HomePage;
