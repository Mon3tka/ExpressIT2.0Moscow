import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { saveLead } from '../lib/leads';

const inputClass =
  'w-full rounded-xl border border-[var(--accent)]/30 bg-black/30 text-white placeholder-white/40 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:border-transparent';

const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const serviceFromUrl = searchParams.get('service');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    comment: serviceFromUrl ? decodeURIComponent(serviceFromUrl) : '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveLead(form);
    setForm({ name: '', phone: '', email: '', comment: '' });
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              Оставьте заявку — подберём формат IT-аутсорсинга под ваш бизнес
            </h2>
            <p className="text-sm sm:text-base text-white/80">
              Заполните короткую форму — в течение 15 минут с вами свяжется технический специалист,
              а не продажник. Обсудим текущие задачи, посчитаем экономию и предложим понятный план
              без «звёздочек» в договоре.
            </p>
            <div className="grid gap-3 text-xs sm:text-sm text-white/70">
              <div className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                <span>
                  Работаем по NDA: доступы, базы и конфиденциальная информация под защитой.
                </span>
              </div>
              <div className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                <span>
                  Пробный период 2–4 недели без штрафов за расторжение.
                </span>
              </div>
              <div className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                <span>
                  Фиксированный абонемент: все условия и SLA прописаны в договоре.
                </span>
              </div>
            </div>
            <div className="text-xs text-white/50">
              Нажимая «Отправить заявку», вы соглашаетесь на обработку персональных данных.
            </div>
          </div>

          <div className="info-block rounded-2xl border border-[var(--accent)]/30 bg-black/40 backdrop-blur-sm p-6 sm:p-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-white/90 mb-1.5">Имя</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Как к вам обращаться"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/90 mb-1.5">Телефон</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+7 (___) ___-__-__"
                    required
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/90 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Для отправки КП и аудита"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/90 mb-1.5">Комментарий</label>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Опишите бизнес, количество рабочих мест и IT-задачи"
                  className={inputClass + ' resize-none'}
                />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button
                  type="submit"
                  className="info-block inline-flex justify-center items-center px-7 py-3 rounded-lg bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition"
                >
                  Отправить заявку
                </button>
                <div className="text-xs text-white/60">
                  Ответим в течение 15 минут в рабочее время, до 30 минут — ночью и в выходные.
                </div>
              </div>
              {submitted && (
                <div className="text-sm text-emerald-300 bg-emerald-900/40 border border-emerald-500/50 rounded-xl px-3 py-2">
                  Заявка отправлена. Мы свяжемся с вами в ближайшее время.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
