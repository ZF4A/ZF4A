import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '../context/I18nContext';
import { WhatsAppIcon, FacebookIcon, InstagramIcon, XIcon, TikTokIcon, MailIcon } from '../components/icons/SocialIcons';

const socialLinks = [
  { icon: WhatsAppIcon, label: 'WhatsApp', url: 'https://wa.me/237673127493', color: '#25D366' },
  { icon: FacebookIcon, label: 'Facebook', url: 'https://www.facebook.com/share/1GfLioFqxQ/', color: '#1877F2' },
  { icon: InstagramIcon, label: 'Instagram', url: 'https://www.instagram.com/sam1ted?igsh=Z2p6ejhkcnNyZ2Ri', color: '#E1306C' },
  // X / Twitter official icon is black — render on white circular background so it's visible on dark pages
  { icon: XIcon, label: 'X', url: 'https://x.com/1TEDSAM', color: '#000000', useSolidBg: true },
  // TikTok uses dark primary — show on white circular background with subtle gold ring
  { icon: TikTokIcon, label: 'TikTok', url: 'https://www.tiktok.com/@sam1ted?_r=1&_t=ZS-968VYm4OVGi', color: '#000000', useSolidBg: true },
  { icon: MailIcon, label: 'Email', url: 'mailto:samuelwandji41@gmail.com', color: '#F59E0B' },
];

export default function FounderSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="founder"
      ref={sectionRef}
      className="relative w-full min-h-screen py-16 md:py-32 bg-[#0A0A0A]"
    >
      <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
            {t('founder.heading')}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white font-bold">
            {t('founder.intro_prefix')}<span className="text-shimmer">{t('founder.intro_highlight')}</span>
          </h2>
        </motion.div>

        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255,215,0,0.05) 0%, rgba(0,0,0,0.8) 100%)',
            border: '1px solid rgba(255,215,0,0.15)',
          }}
        >
          {/* Golden glow border */}
          <div className="absolute inset-0 rounded-3xl opacity-50 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 60px rgba(255,215,0,0.1), 0 0 40px rgba(255,215,0,0.05)',
            }}
          />

          {/* Mobile: flex column centered | Desktop: 2-col grid */}
          <div className="relative p-6 sm:p-8 md:p-12 flex flex-col items-center gap-8 md:grid md:grid-cols-2 md:items-center md:gap-12">

            {/* ── Photo ── */}
            <motion.div
              className="w-full flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative w-64 sm:w-72 md:w-full md:max-w-sm aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/SAM.jpg"
                  alt="Samuel Wandji"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 border-2 border-gold/20 rounded-2xl pointer-events-none" />
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold rounded-br-lg" />
              </div>
            </motion.div>

            {/* ── Text content ── */}
            <div className="w-full flex flex-col items-center text-center md:items-start md:text-left">

              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <h3 className="text-3xl md:text-4xl text-white font-bold mb-2">
                  {t('founder.name')}
                </h3>
                <p className="text-gold text-sm tracking-wider uppercase mb-6">
                  {t('founder.role')}
                </p>
              </motion.div>

              <motion.blockquote
                className="w-full mb-8 px-4 md:px-0 border-l-2 border-gold/30 md:border-none"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <p className="text-white/80 text-base sm:text-lg italic leading-relaxed">
                  {t('founder.statement')}
                </p>
              </motion.blockquote>

              {/* Social Links */}
              <motion.div
                className="flex flex-wrap gap-3 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="socialBtn"
                    data-hover
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 + index * 0.08, duration: 0.45 }}
                    whileHover={{ scale: 1.03 }}
                    style={{ color: social.color }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
