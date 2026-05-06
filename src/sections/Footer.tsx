import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { WhatsAppIcon, FacebookIcon, InstagramIcon, XIcon, TikTokIcon, MailIcon } from '../components/icons/SocialIcons';

const socialLinks = [
  { id: 'whatsapp', icon: WhatsAppIcon, url: 'https://wa.me/237673127493', color: '#25D366' },
  { id: 'facebook', icon: FacebookIcon, url: 'https://www.facebook.com/share/1CLYSksXDN/', color: '#1877F2' },
  { id: 'instagram', icon: InstagramIcon, url: 'https://www.instagram.com/zefutureforall?igsh=MTNzYmd0cmFmOHZleA==', color: '#E1306C' },
  { id: 'x', icon: XIcon, url: 'https://x.com/ZE_FUTURE_4_ALL', color: '#000000', useSolidBg: true },
  { id: 'tiktok', icon: TikTokIcon, url: 'https://www.tiktok.com/@ze_future_for_all?_r=1&_t=ZS-968X4yangqF', color: '#000000', useSolidBg: true },
  { id: 'email', icon: MailIcon, url: 'mailto:zefutureforall@gmail.com', color: '#F59E0B' },
];

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative w-full py-32 bg-[#0A0A0A] border-t border-white/5">
      <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto text-center">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-black mb-8">
            {t('footer.heading').split(' ').map((word, i) => (
              <span key={i} className={word.includes("FUTURE") || word.includes("WAIT") || word.includes(" doesn't") ? 'text-shimmer' : ''}>
                {word}{' '}
              </span>
            ))}
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.zeunetwork.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-black font-semibold text-sm tracking-wider uppercase hover:bg-white transition-colors duration-300"
              data-hover
            >
              {t('footer.cta1')}
              <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://www.alaxix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold text-sm tracking-wider uppercase hover:border-gold hover:text-gold transition-colors duration-300"
              data-hover
            >
              {t('footer.cta2')}
              <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://www.finilix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 rounded-full border border-success/40 text-success font-semibold text-sm tracking-wider uppercase hover:bg-success hover:text-black transition-colors duration-300"
              data-hover
            >
              {t('footer.cta3')}
              <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="socialRow mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="socialBtn"
              data-hover
              style={{ color: social.color }}
              aria-label={t(`footer.social.${social.id}`)}
              title={t(`footer.social.${social.id}`)}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src="/zf4a.jpg" alt="ZF4A" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
            <span className="text-white/50 text-sm">{t('footer.brand')}</span>
          </div>
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} ZF4A. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
