import React from 'react';

const testimonials = [
  {
    name: 'Антон Лебедев',
    position: 'Финансовый директор',
    company: 'сеть клиник «ГородДок»',
    quote:
      'За первый квартал совместной работы мы сократили простои ИТ-систем на 67% и полностью перестали отвлекать врачей на звонки в поддержку. Все аварийные заявки ночью закрываются за 30–40 минут, а не за полдня, как раньше.',
    result: 'Простои почти исчезли, IT-расходы стали предсказуемыми.',
  },
  {
    name: 'Сергей Волков',
    position: 'Управляющий партнёр',
    company: 'логистическая компания «ЕвроТрак»',
    quote:
      'Главный страх был в зависимости от подрядчика и потере контроля над инфраструктурой. В договор внесли пункт о передаче всей документации и доступов в течение трёх дней при расторжении. Это позволило спокойно перейти на аутсорсинг и сократить IT-бюджет примерно на 35%.',
    result: 'Чёткая документация и возможность безболезненно сменить подрядчика.',
  },
  {
    name: 'Екатерина Мельникова',
    position: 'Генеральный директор',
    company: 'ритейл-компания «СитиМаркет»',
    quote:
      'Раньше мы работали с фрилансерами: дёшево в счёте, но дорого по факту. Срывы смен из-за неработающих касс, «исчезающие» специалисты и бесконечные доплаты. Сейчас мы платим фиксированный абонемент, получаем ежемесячный отчёт и понимаем, за что платим. Аварий за год — всего две, обе закрыли за час.',
    result: 'Фиксированный платёж вместо хаотичных расходов и потерянной выручки.',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative z-10 py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            Что говорят наши B2B-клиенты
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/80">
            Кейсы важнее обещаний: клиенты приходят к нам после негативного опыта с фрилансерами
            и подрядчиками, которые «пропадали» в критический момент или раздували счета.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="info-block rounded-2xl bg-black/40 backdrop-blur-sm border border-[var(--accent)]/30 p-6 flex flex-col gap-4"
            >
              <div className="text-xs text-white/50 uppercase tracking-[0.2em]">
                Отзыв клиента
              </div>
              <p className="text-sm text-white/90 leading-relaxed">«{t.quote}»</p>
              <div className="mt-2 text-xs text-white/70">
                <div className="font-semibold text-white">{t.name}</div>
                <div>
                  {t.position}, {t.company}
                </div>
              </div>
              <div className="mt-auto pt-3 border-t border-dashed border-[var(--accent)]/20 text-xs text-white/60">
                <span className="font-semibold text-white/80">Результат: </span>
                {t.result}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

