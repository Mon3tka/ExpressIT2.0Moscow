import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Вы оставляете заявку',
    description:
      'Коротко описываете бизнес, количество рабочих мест и текущие проблемы. Мы не мучаем длинными брифами — только то, что действительно важно.',
  },
  {
    number: '02',
    title: 'Специалист оценивает инфраструктуру',
    description:
      'Проводим аудит: инвентаризация оборудования, каналов связи, серверов, ПО и рисков. По итогам — понятное заключение и расчёт экономии по сравнению с текущей моделью.',
  },
  {
    number: '03',
    title: 'Подключение и обслуживание',
    description:
      'Настраиваем мониторинг, резервное копирование, регламенты и доступы. Назначаем личного менеджера и команду инженеров. Стартуем пробный период 2–4 недели.',
  },
  {
    number: '04',
    title: 'Отчёты и SLA',
    description:
      'Фиксируем SLA в договоре, ежемесячно отправляем отчёты и рекомендации по улучшению инфраструктуры. При необходимости вы в любой момент можете безопасно сменить подрядчика — всё документировано.',
  },
];

const Process = () => {
  return (
    <section id="process" className="relative z-10 py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            Как мы работаем
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/80">
            Прозрачный, понятный и управляемый процесс вместо «тёмного ящика». От первого звонка
            до регулярных отчётов — вы видите, какие задачи решаются и какие риски закрываются.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {steps.map((step) => (
            <div
              key={step.number}
              className="info-block relative rounded-2xl border border-[var(--accent)]/30 bg-black/40 backdrop-blur-sm p-6 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="text-xs font-semibold tracking-[0.3em] uppercase text-white/60">
                  Шаг {step.number}
                </div>
                <div className="text-2xl font-semibold text-[var(--accent)]">
                  {step.number}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-sm text-white/70">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

