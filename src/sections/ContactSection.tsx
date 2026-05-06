import { useState } from 'react';
import { useI18n } from '../context/I18nContext';

export default function ContactSection() {
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [method, setMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const whatsappNumber = '673127493';
  const emailAddress = 'samuelwandji41@gmail.com';

  const isValid = name.trim().length > 1 && purpose.trim().length > 5;

  const send = () => {
    if (!isValid) {
      setMessage('Please provide your name and a brief purpose (min 6 chars).');
      setTimeout(() => setMessage(null), 3500);
      return;
    }

    setSending(true);
    const text = `${t('contact.msg_label_name')} ${name}\n${t('contact.msg_label_purpose')} ${purpose}`;

    if (method === 'whatsapp') {
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      try {
        window.open(url, '_blank');
        setMessage(t('contact.success'));
      } catch (e) {
        navigator.clipboard?.writeText(text);
        setMessage(t('contact.error'));
      }
    } else {
      const subject = encodeURIComponent('Contact from website');
      const body = encodeURIComponent(text);
      const mailto = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
      try {
        window.location.href = mailto;
        setMessage(t('contact.success'));
      } catch (e) {
        navigator.clipboard?.writeText(text);
        setMessage(t('contact.error'));
      }
    }

    setTimeout(() => setSending(false), 800);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <section id="contact" className="w-full min-h-screen flex items-center py-16 bg-transparent">
      <div className="max-w-2xl mx-auto px-6 w-full">
        <div className="bg-gradient-to-br from-white/3 to-white/6 backdrop-blur-md border border-white/6 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-3xl font-display text-white font-bold mb-2">{t('contact.heading')}</h3>
          <p className="text-sm text-white/60 mb-6">{t('contact.note')}</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/80 mb-2 block">{t('contact.name')}</label>
                <input
                  aria-label="Name"
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder={t('contact.placeholder.name')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-white/80 mb-2 block">{t('contact.method')}</label>
                <div className="inline-flex rounded-xl p-1 bg-white/4 border border-white/6">
                  <button
                    type="button"
                    onClick={() => setMethod('whatsapp')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${method === 'whatsapp' ? 'bg-amber-400 text-black' : 'text-white/80'} focus:outline-none`}
                    aria-pressed={method === 'whatsapp'}
                  >
                    {t('contact.method.whatsapp')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod('email')}
                    className={`px-4 py-2 rounded-lg ml-2 text-sm font-medium ${method === 'email' ? 'bg-amber-400 text-black' : 'text-white/80'} focus:outline-none`}
                    aria-pressed={method === 'email'}
                  >
                    {t('contact.method.email')}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm text-white/80 mb-2 block">{t('contact.purpose')}</label>
              <textarea
                aria-label="Purpose"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/8 text-white placeholder-white/50 min-h-[140px] resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder={t('contact.placeholder.purpose')}
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-amber-400 text-black font-semibold shadow-lg hover:brightness-105 transition disabled:opacity-50"
                disabled={!isValid || sending}
              >
                {sending ? '...' : t('contact.send')}
              </button>
            </div>

            {message && (
              <div className="mt-4 p-3 rounded-md bg-white/6 text-white/90 ring-1 ring-amber-400">{message}</div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
