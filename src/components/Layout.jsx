import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { servicesMenu } from '../data/servicesMenu';

const navLeft = [
  { to: '/', label: 'Главная' },
  { to: '/services', label: 'Услуги', hasDropdown: true },
  { to: '/cases', label: 'Кейсы' },
];

const navRight = [
  { to: '/about', label: 'О компании' },
  { to: '/contacts', label: 'Контакты' },
];

const Layout = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(null);
  const isActive = (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  return (
    <div className="relative z-10 min-h-screen flex flex-col text-white">
      <header className="sticky top-0 z-50 bg-[var(--primary)]/95 backdrop-blur-sm text-white shadow-lg border-b border-[var(--accent)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-[0_1fr_auto] lg:grid-cols-[1fr_2fr_1fr] items-center gap-4 h-24">
          {/* Левая навигация */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm sm:text-base font-medium text-white/90">
            {navLeft.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => {
                    setServicesOpen(false);
                    setHoveredCategory(null);
                  }}
                >
                  <Link
                    to={item.to}
                    className={
                      isActive(item.to)
                        ? 'text-white border-b-2 border-[var(--accent)] pb-0.5 transition flex items-center gap-1 whitespace-nowrap'
                        : 'hover:text-[var(--accent)] transition-colors duration-200 flex items-center gap-1 whitespace-nowrap'
                    }
                  >
                    {item.label}
                    <svg className="w-4 h-4 shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: servicesOpen ? 'rotate(45deg)' : 'none' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16M4 12h16" />
                    </svg>
                  </Link>
                  {servicesOpen && (
                    <div className="absolute left-0 top-full pt-1 flex animate-dropdown">
                      <div className="info-block bg-black/95 backdrop-blur-md border border-[var(--accent)]/40 rounded-l-xl rounded-r-none shadow-2xl min-w-[200px] py-2">
                        {servicesMenu.map((group, idx) => (
                          <div
                            key={group.title}
                            onMouseEnter={() => setHoveredCategory(idx)}
                            onClick={() => setHoveredCategory(hoveredCategory === idx ? null : idx)}
                            className="px-4 py-2 cursor-pointer select-none"
                          >
                            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--accent)]/30 pb-1 flex items-center justify-between gap-2">
                              {group.title}
                              <span className="w-4 h-4 flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4 transition-transform duration-200" style={{ transform: hoveredCategory === idx ? 'rotate(45deg)' : 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16M4 12h16" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        ))}
                        <div className="mt-2 pt-2 border-t border-[var(--accent)]/20 px-4">
                          <Link
                            to="/services"
                            onClick={() => setServicesOpen(false)}
                            className="text-xs font-medium text-[var(--accent)] hover:underline"
                          >
                            Все услуги →
                          </Link>
                        </div>
                      </div>
                      {hoveredCategory !== null && (
                        <div className="info-block bg-black/95 backdrop-blur-md border border-l-0 border-[var(--accent)]/40 rounded-r-xl shadow-2xl min-w-[260px] py-3 px-4 animate-dropdown -ml-px">
                          <ul className="space-y-1">
                            {servicesMenu[hoveredCategory].items.map((sub) => (
                              <li key={sub.slug}>
                                <Link
                                  to={`/services/${sub.slug}`}
                                  onClick={() => setServicesOpen(false)}
                                  className="text-sm text-white/80 hover:text-[var(--accent)] transition block py-1"
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    isActive(item.to)
                      ? 'text-white border-b-2 border-[var(--accent)] pb-0.5 transition whitespace-nowrap'
                      : 'hover:text-[var(--accent)] transition-colors duration-200 whitespace-nowrap'
                  }
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Центральный логотип — растянут влево */}
          <Link to="/" className="flex items-center justify-start gap-4 sm:gap-5 group shrink-0 col-start-2">
            <img
              src="https://expressit.ru/wp-content/uploads/2025/12/logo20-blackphone.png"
              alt="IT-аутсорсинг"
              className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 object-contain"
            />
            <div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-[0.12em] text-white">
                IT-АУТСОРСИНГ В МОСКВЕ
              </div>
              <div className="text-sm sm:text-base text-white/70">Без простоев и скрытых расходов</div>
            </div>
          </Link>

          {/* Правая навигация + CTA / Мобильное меню */}
          <div className="flex items-center justify-end gap-4">
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navRight.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    isActive(item.to)
                      ? 'text-sm sm:text-base font-medium text-white border-b-2 border-[var(--accent)] pb-0.5 transition whitespace-nowrap py-1'
                      : 'text-sm sm:text-base font-medium text-white/90 hover:text-[var(--accent)] transition-colors duration-200 whitespace-nowrap py-1'
                  }
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contacts"
                className="text-sm sm:text-base font-medium px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[var(--accent)]/30 hover:-translate-y-0.5 whitespace-nowrap"
              >
                Оставить заявку
              </Link>
            </div>
            <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
            aria-label="Меню"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden absolute top-24 left-0 right-0 bg-[var(--primary)] border-t border-[var(--accent)]/20 shadow-xl animate-fade-in max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col p-4 gap-1">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className={`py-3 px-4 rounded-lg transition ${isActive('/') ? 'bg-[var(--accent)]/20 text-white' : 'text-white/90 hover:bg-white/10'}`}
              >
                Главная
              </Link>
              <div className="py-2">
                <div className="px-4 text-xs font-semibold text-white/60 uppercase tracking-wider">Услуги</div>
                <div className="mt-1 pl-4 space-y-0.5">
                  {servicesMenu.map((group, idx) => (
                    <div key={group.title} className="mt-2">
                      <button
                        type="button"
                        onClick={() => setMobileServicesExpanded(mobileServicesExpanded === idx ? null : idx)}
                        className="w-full text-left text-xs text-[var(--accent)] font-medium py-2 px-2 rounded-lg hover:bg-white/10 flex items-center justify-between"
                      >
                        {group.title}
                        <span className="w-4 h-4 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 transition-transform duration-200" style={{ transform: mobileServicesExpanded === idx ? 'rotate(45deg)' : 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16M4 12h16" />
                          </svg>
                        </span>
                      </button>
                      {mobileServicesExpanded === idx && group.items.map((sub) => (
                        <Link
                          key={sub.slug}
                          to={`/services/${sub.slug}`}
                          onClick={() => setMenuOpen(false)}
                          className="block py-2 px-4 text-sm text-white/90 hover:bg-white/10 rounded-lg"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                <Link to="/services" onClick={() => setMenuOpen(false)} className="mt-2 block py-2 px-4 text-sm text-[var(--accent)] font-medium">
                  Все услуги →
                </Link>
              </div>
              <Link to="/cases" onClick={() => setMenuOpen(false)} className={`py-3 px-4 rounded-lg transition ${isActive('/cases') ? 'bg-[var(--accent)]/20 text-white' : 'text-white/90 hover:bg-white/10'}`}>
                Кейсы
              </Link>
              <Link to="/about" onClick={() => setMenuOpen(false)} className={`py-3 px-4 rounded-lg transition ${isActive('/about') ? 'bg-[var(--accent)]/20 text-white' : 'text-white/90 hover:bg-white/10'}`}>
                О компании
              </Link>
              <Link to="/contacts" onClick={() => setMenuOpen(false)} className={`py-3 px-4 rounded-lg transition ${isActive('/contacts') ? 'bg-[var(--accent)]/20 text-white' : 'text-white/90 hover:bg-white/10'}`}>
                Контакты
              </Link>
              <Link
                to="/contacts"
                onClick={() => setMenuOpen(false)}
                className="mt-2 py-3 px-4 rounded-lg bg-[var(--accent)] text-white text-base font-medium text-center"
              >
                Оставить заявку
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-[var(--accent)]/20 bg-black/50 backdrop-blur-sm mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm text-white/80">
            <div>
              <div className="font-semibold text-white mb-2">Услуги</div>
              <ul className="space-y-1">
                <li><Link to="/services" className="hover:text-[var(--accent)]">Наши услуги</Link></li>
                <li><Link to="/contacts" className="hover:text-[var(--accent)]">Оставить заявку</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-2">О компании</div>
              <ul className="space-y-1">
                <li><Link to="/about" className="hover:text-[var(--accent)]">О нас</Link></li>
                <li><Link to="/cases" className="hover:text-[var(--accent)]">Кейсы</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-2">Центр поддержки</div>
              <ul className="space-y-1">
                <li><Link to="/contacts" className="hover:text-[var(--accent)]">Контакты</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-2">Контакты</div>
              <p className="text-white/80">© {new Date().getFullYear()} IT-аутсорсинг в Москве.</p>
              <p className="mt-1 text-xs text-white/60">Работаем по NDA · SLA до 15 мин 24/7</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 text-xs text-white/50">
            Все указанные на сайте цены носят информационный характер и не являются публичной офертой (ст. 437 ГК РФ).
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
