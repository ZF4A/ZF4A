import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '../context/I18nContext';

export default function ManifestoSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    function VisionImages({ inView }: { inView: boolean }) {

      const [active, setActive] = useState(0);

      useEffect(() => {
        if (!inView) return;
        const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return;
        const id = setInterval(() => {
          setActive((s) => (s + 1) % 3);
        }, 5000);
        return () => clearInterval(id);
      }, [inView]);

      const imageVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any } },
      };

      const captionVariant = {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
      };

      return (
        <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-md mx-auto lg:mx-0">
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden z-10"
            variants={imageVariants}
            initial="hidden"
            animate={active === 0 ? 'visible' : 'hidden'}
            aria-hidden={active !== 0}
          >
            <img src="/zeunetwork-hero.jpg" alt="Zeunetwork" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </motion.div>

          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden z-20"
            variants={imageVariants}
            initial="hidden"
            animate={active === 1 ? 'visible' : 'hidden'}
            aria-hidden={active !== 1}
          >
            <img src="/finilix-hero.jpg" alt="Finilix" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </motion.div>

          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden z-30"
            variants={imageVariants}
            initial="hidden"
            animate={active === 2 ? 'visible' : 'hidden'}
            aria-hidden={active !== 2}
          >
            <img src="/alaxix-hero.jpg" alt="Alaxix" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </motion.div>

          {/* Captions */}
          <div className="absolute left-4 bottom-6 z-40 flex flex-col gap-3">
            <motion.span variants={captionVariant} initial="hidden" animate={active === 0 ? 'visible' : 'hidden'} className="text-gold text-xs uppercase tracking-wider caption-drift drift-1">
              ZEUNETWORK — The Golden Network
            </motion.span>
            <motion.span variants={captionVariant} initial="hidden" animate={active === 1 ? 'visible' : 'hidden'} className="text-white/80 text-sm caption-drift drift-2">
              FINILIX — Financial intelligence for tomorrow
            </motion.span>
            <motion.span variants={captionVariant} initial="hidden" animate={active === 2 ? 'visible' : 'hidden'} className="text-white/70 text-sm italic caption-drift drift-3">
              ALAXIX — Autonomous creative intelligence
            </motion.span>
          </div>

          {/* Shimmer + frame */}
          <motion.div className="absolute inset-0 rounded-2xl pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.06, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{ background: 'linear-gradient(120deg, rgba(255,255,255,0.02), rgba(255,255,255,0.06), rgba(255,255,255,0.02))', border: '1px solid rgba(255,215,0,0.06)' }}
          />
        </div>
      );
  }

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative w-full min-h-screen py-32 gradient-radial-dark"
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Vision Images — three animated hero images to illustrate the future */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as any }}
            className="relative"
          >
            <VisionImages inView={isInView} />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] as any }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
                {t('manifesto.heading')}
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-8">
                {t('manifesto.title_prefix')}{' '}
                <span className="text-shimmer">{t('manifesto.sub1')}</span> {t('manifesto.sub2')}
              </h2>
            </motion.div>

            <motion.p
              className="text-white/70 text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {t('manifesto.body')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mb-8"
            >
              <p className="text-gold font-display text-xl italic">
                {t('manifesto.signature')}
              </p>
            </motion.div>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
              href="https://wa.me/237673127493"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact via WhatsApp"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-500"
              data-hover
            >
              <span className="text-sm font-semibold tracking-wider uppercase">
                {t('manifesto.cta')}
              </span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
