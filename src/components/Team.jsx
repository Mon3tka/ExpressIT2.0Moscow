import React from 'react';

const team = [
  {
    name: 'Алексей Романов',
    role: 'Руководитель направления IT-аутсорсинга',
    experience:
      '12+ лет в построении и поддержке IT-инфраструктуры для ритейла, медицины и финансового сектора. Отвечает за стратегию, SLA и качество сервиса.',
    focus: 'Планирование развития IT в логике бизнеса, а не «ради технологий».',
    initials: 'АР',
  },
  {
    name: 'Мария Герасимова',
    role: 'Ведущий системный инженер',
    experience:
      '10+ лет в администрировании серверов, сетей и виртуализации. Опыт проектов уровня 24/7 с нулевой допустимой потерей данных.',
    focus: 'Надёжность, отказоустойчивость и безопасность инфраструктуры.',
    initials: 'МГ',
  },
  {
    name: 'Илья Кузнецов',
    role: 'Инженер по поддержке бизнеса 24/7',
    experience:
      'Линия поддержки для сотрудников ваших офисов: от рабочих мест до касс и терминалов. Закрывает типовые заявки за 30–40 минут.',
    focus: 'Понятная коммуникация с пользователями и быстрое решение задач.',
    initials: 'ИК',
  },
];

const Team = () => {
  return (
    <section id="team" className="relative z-10 py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              Команда, с которой вы работаете напрямую
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/80 max-w-xl">
              На переговорах вы знакомитесь с теми же людьми, которые будут отвечать за вашу
              инфраструктуру. Никакого разрыва между продажами и исполнением.
            </p>
          </div>
          <div className="text-xs sm:text-sm text-white/70">
            Работаем по NDA, ведём документацию по всем изменениям
            <br />
            и храним её в вашей зоне ответственности.
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {team.map((member) => (
            <article
              key={member.name}
              className="info-block rounded-2xl bg-black/40 backdrop-blur-sm border border-[var(--accent)]/30 p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--primary-light)] flex items-center justify-center text-white font-semibold text-sm">
                  {member.initials}
                </div>
                <div>
                  <div className="font-semibold text-white">{member.name}</div>
                  <div className="text-xs text-white/60">{member.role}</div>
                </div>
              </div>
              <p className="text-sm text-white/70">{member.experience}</p>
              <p className="text-xs text-white/60">
                <span className="font-semibold text-white/80">Фокус: </span>
                {member.focus}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

