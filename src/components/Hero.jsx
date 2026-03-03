import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative z-10 overflow-hidden py-16 sm:py-24 lg:py-28 border-b border-[var(--accent)]/20"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[var(--accent)]/15 blur-3xl animate-pulse-soft" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="space-y-8 animate-slide-up flex flex-col">
            <div className="info-block inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-xs font-medium text-white/90 cursor-default">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              Реакция инженера до 15 минут 24/7 — без доплат
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white">
                Без простоев, без отказов, без стресса —
                <span className="block text-[var(--accent)]">
                  IT-поддержка бизнеса 24/7 в Москве
                </span>
              </h1>
              <p className="text-base sm:text-lg text-white/85 max-w-xl">
                Берём на себя всю IT-инфраструктуру: от рабочих мест и серверов
                до 1С и сетей. Гарантируем реакцию инженера до 15 минут 24/7,
                работу по NDA, прозрачный фиксированный абонемент без скрытых
                платежей и документированную инфраструктуру, которая всегда
                остаётся под вашим контролем.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
              <div className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                <span>Пробный период 2 недели без риска и штрафов за расторжение.</span>
              </div>
              <div className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                <span>Полная документация: все доступы и схемы — на стороне вашей компании.</span>
              </div>
              <div className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                <span>Защита данных: NDA по умолчанию, аудит действий и разграничение доступов.</span>
              </div>
              <div className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                <span>Ежемесячная отчётность: вы видите, за что платите и что предотвращено.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/contacts')}
                className="info-block inline-flex justify-center items-center px-7 py-3.5 rounded-xl bg-[var(--accent)] text-white text-sm sm:text-base font-semibold hover:bg-[var(--accent-hover)] transition-all duration-200 shadow-lg"
              >
                Оставить заявку
              </button>
              <button
                type="button"
                onClick={() => navigate('/contacts')}
                className="info-block inline-flex justify-center items-center px-6 py-3.5 rounded-xl border-2 border-[var(--accent)]/60 bg-black/40 backdrop-blur-sm text-sm text-white font-medium hover:bg-[var(--accent)]/20 transition-all duration-200"
              >
                Рассчитать экономию на IT
              </button>
              <div className="text-xs text-white/60 sm:ml-2">
                Первичная консультация и аудит инфраструктуры — бесплатно.
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-white/70">
              <div>
                <div className="font-semibold text-white">до 50% экономии</div>
                <div>по сравнению со своим IT-штатом и разовыми выездами</div>
              </div>
              <div>
                <div className="font-semibold text-white">24/7, включая выходные</div>
                <div>дежурный инженер и аварийный номер всегда доступны</div>
              </div>
              <div>
                <div className="font-semibold text-white">SLA в договоре</div>
                <div>цифры отклика и ответственности закреплены юридически</div>
              </div>
            </div>
          </div>

          <div className="animate-slide-up-delay flex flex-col min-h-0">
            <div
              role="button"
              tabIndex={0}
              onClick={() => navigate('/contacts')}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/contacts')}
              className="info-block rounded-2xl bg-black/40 backdrop-blur-sm p-6 sm:p-7 flex flex-col gap-6 cursor-pointer border border-[var(--accent)]/30 hover:border-[var(--accent)]/60 flex-1 min-h-0"
            >
              <div className="shrink-0">
                <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Прозрачный IT-аутсорсинг
                </div>
                <div className="mt-1 text-base font-semibold text-white">
                  Для компаний, которые не могут позволить себе простой
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm flex-1 min-h-0 content-start">
                <div className="info-block rounded-xl border border-[var(--accent)]/30 bg-black/30 p-4 cursor-pointer">
                  <div className="text-xs font-semibold text-[var(--accent)] uppercase">
                    Главный страх
                  </div>
                  <div className="mt-1 font-medium text-white">
                    «В критический момент никто не выйдет на связь»
                  </div>
                  <div className="mt-2 text-xs text-white/70">
                    Мы фиксируем в договоре SLA: реакция инженера до 15 минут
                    24/7, отдельный аварийный номер и резервные каналы связи.
                  </div>
                </div>

                <div className="info-block rounded-xl border border-[var(--accent)]/30 bg-black/30 p-4 cursor-pointer">
                  <div className="text-xs font-semibold text-[var(--accent)] uppercase leading-tight">
                    Что ещё закрываем
                  </div>
                  <ul className="mt-2 space-y-1.5 text-xs text-white/70">
                    <li>— NDA и защита данных как стандарт, а не доп.услуга.</li>
                    <li>— Документирование инфраструктуры и off-boarding без боли.</li>
                    <li>— Фиксированный тариф без скрытых платежей и допсчётов.</li>
                  </ul>
                </div>

                <div className="info-block rounded-xl border border-[var(--accent)]/30 bg-black/30 p-4 cursor-pointer">
                  <div className="text-xs font-semibold text-[var(--accent)] uppercase">
                    SLA и гарантии
                  </div>
                  <div className="mt-2 text-xs text-white/70">
                    Реакция до 15 минут 24/7, время устранения по критичности.
                    Цифры закреплены в договоре — не обещания, а обязательства.
                  </div>
                </div>

                <div className="info-block rounded-xl border border-[var(--accent)]/30 bg-black/30 p-4 cursor-pointer">
                  <div className="text-xs font-semibold text-[var(--accent)] uppercase">
                    Прозрачность цен
                  </div>
                  <div className="mt-2 text-xs text-white/70">
                    Фиксированный абонемент без доплат за выезды и консультации.
                    Ежемесячная отчётность: видите, за что платите и что сделано.
                  </div>
                </div>

                <div className="info-block rounded-xl border border-[var(--accent)]/30 bg-black/30 p-4 cursor-pointer">
                  <div className="text-xs font-semibold text-[var(--accent)] uppercase">
                    Документация и контроль
                  </div>
                  <div className="mt-2 text-xs text-white/70">
                    Все доступы, схемы и регламенты — на стороне вашей компании.
                    При смене подрядчика передача без потери данных и знаний.
                  </div>
                </div>

                <div className="info-block rounded-xl border border-[var(--accent)]/30 bg-black/30 p-4 cursor-pointer">
                  <div className="text-xs font-semibold text-[var(--accent)] uppercase">
                    Безопасность и NDA
                  </div>
                  <div className="mt-2 text-xs text-white/70">
                    Работа по NDA по умолчанию. Аудит действий, разграничение
                    доступов, соответствие требованиям 152-ФЗ.
                  </div>
                </div>

                <div className="info-block rounded-xl border border-[var(--accent)]/30 bg-black/30 p-4 cursor-pointer">
                  <div className="text-xs font-semibold text-[var(--accent)] uppercase">
                    Резервные каналы
                  </div>
                  <div className="mt-2 text-xs text-white/70">
                    Отдельный аварийный номер, Telegram, почта. Если один канал
                    недоступен — всегда есть запасной.
                  </div>
                </div>

                <div className="info-block rounded-xl border border-[var(--accent)]/30 bg-black/30 p-4 cursor-pointer">
                  <div className="text-xs font-semibold text-[var(--accent)] uppercase">
                    Профилактика 24/7
                  </div>
                  <div className="mt-2 text-xs text-white/70">
                    Мониторинг серверов и сетей круглосуточно. Проблемы выявляем
                    до того, как они станут простоями.
                  </div>
                </div>

                <div className="info-block rounded-xl border border-[var(--accent)]/30 bg-black/30 p-4 cursor-pointer">
                  <div className="text-xs font-semibold text-[var(--accent)] uppercase">
                    Экономия на IT
                  </div>
                  <div className="mt-2 text-xs text-white/70">
                    До 50% по сравнению со своим штатом. Без затрат на отпуска,
                    больничные и оборудование для инженеров.
                  </div>
                </div>

                <div className="info-block rounded-xl border border-[var(--accent)]/30 bg-black/30 p-4 cursor-pointer">
                  <div className="text-xs font-semibold text-[var(--accent)] uppercase">
                    Свой инженер
                  </div>
                  <div className="mt-2 text-xs text-white/70">
                    Закреплённый специалист знает вашу инфраструктуру. На
                    переговорах — те же люди, что будут работать с вами.
                  </div>
                </div>
              </div>

              <div className="border-t border-dashed border-white/20 pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shrink-0">
                <div className="text-xs text-white/70">
                  <div className="font-semibold text-white">
                    «Красиво продают, плохо делают» — не про нас.
                  </div>
                  <div>
                    На переговорах вы знакомитесь с теми же экспертами, которые
                    будут сопровождать вашу инфраструктуру.
                  </div>
                </div>
                <div className="text-xs text-white/60">
                  Пробный период 2–4 недели,
                  <br />
                  договор без штрафов за расторжение.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

