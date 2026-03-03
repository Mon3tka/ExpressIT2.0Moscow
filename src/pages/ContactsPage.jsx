import React from 'react';
import ContactForm from '../components/ContactForm';

const ContactsPage = () => {
  return (
    <div className="relative z-10 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold text-white">
            Контакты
          </h1>
          <p className="mt-3 text-white/80 max-w-2xl">
            Оставьте заявку — мы перезвоним в течение 15 минут и подберём формат IT-аутсорсинга под ваш бизнес.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactsPage;
