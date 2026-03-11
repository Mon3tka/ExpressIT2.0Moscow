import React from 'react';
import { Link } from 'react-router-dom';

const advantages = [
  {
    title: 'Экономия до 50% без потери качества',
    description:
      'Считаем полную стоимость владения IT: зарплаты, налоги, отпуска, больничные, оборудование, простой при увольнении. В абонентский платёж уже включено всё — без непредсказуемых расходов.',
    badge: 'TCO-подход',
  },
  {
    title: 'Нет налогов, отпусков и простоев',
    description:
      'Вы не держите штатного сисадмина и не зависите от одного человека. Команда инженеров дежурит посменно, а мы отвечаем за доступность 24/7 по SLA.',
    badge: 'Команда вместо 1 человека',
  },
  {
    title: 'Оперативная реакция на запросы',
    description:
      'Оговариваем в договоре конкретные цифры: реакция аварийного инженера до 15 минут, стандартных заявок — до 1 часа. Контроль через тикет-систему и личного менеджера.',
    badge: 'SLA в минутах',
  },
  {
    title: 'SLA-поддержка и прозрачная отчётность',
    description:
      'Ежемесячно вы получаете отчёт: какие инциденты закрыты, какие сбои предотвращены, какие риски выявлены. Никакого «тёмного ящика» — только понятные цифры и действия.',
    badge: 'Полная прозрачность',
  },
];

const Advantages = () => {
  return (
    <section id="advantages" className="relative z-10 py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            Почему компании передают нам IT в Москве
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/80">
            Мы строим IT-аутсорсинг вокруг главных страхов бизнеса: недоступности в критический
            момент, утечки данных, зависимости от подрядчика и скрытых расходов. В оффере,
            договоре и работе нет противоречий.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {advantages.map((item) => (
            <Link
              key={item.title}
              to="/services"
              className="info-block relative rounded-2xl bg-black/40 backdrop-blur-sm border border-[var(--accent)]/30 p-6 flex flex-col gap-3 block hover:scale-[1.01] transition-transform duration-200"
            >
              <div className="inline-flex items-center gap-2 text-xs font-medium text-[var(--accent)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                {item.badge}
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/70">{item.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3 text-xs sm:text-sm text-white/80">
          <Link to="/about" className="info-block rounded-2xl border border-[var(--accent)]/30 bg-black/30 px-4 py-3 transition-all duration-200 block hover:scale-[1.01]">
            <div className="font-semibold text-white">Без vendor lock-in</div>
            <div className="mt-1 text-white/70">
              Вся документация, схемы и доступы принадлежат вам. При расторжении договора мы
              обязуемся передать полный пакет в течение 3 рабочих дней.
            </div>
          </Link>
          <Link to="/services" className="info-block rounded-2xl border border-[var(--accent)]/30 bg-black/30 px-4 py-3 transition-all duration-200 block hover:scale-[1.01]">
            <div className="font-semibold text-white">Фиксированный абонемент</div>
            <div className="mt-1 text-white/70">
              Никаких «это вне договора» и допсчётов за каждую мелочь. Чётко зафиксированный объём
              и стоимость, понятная до подписания.
            </div>
          </Link>
          <Link to="/contacts" className="info-block rounded-2xl border border-[var(--accent)]/30 bg-black/30 px-4 py-3 transition-all duration-200 block hover:scale-[1.01]">
            <div className="font-semibold text-white">Личный технический менеджер</div>
            <div className="mt-1 text-white/70">
              Вы не объясняете одну и ту же проблему каждый раз заново — за вашим проектом
              закреплён ответственный инженер и команда.
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Advantages;

