import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, Check, TrendingUp, Users, Zap, Shield, AlertTriangle, BarChart3 } from 'lucide-react';
import { useI18n } from '../context/I18nContext';

const problems = [
  { icon: AlertTriangle, titleKey: 'problem.chaos.title', descKey: 'problem.chaos.desc' },
  { icon: X, titleKey: 'problem.lost.title', descKey: 'problem.lost.desc' },
  { icon: BarChart3, titleKey: 'problem.analytics.title', descKey: 'problem.analytics.desc' },
  { icon: Shield, titleKey: 'problem.security.title', descKey: 'problem.security.desc' },
];

const solutions = [
  { icon: Zap, titleKey: 'solution.ai.title', descKey: 'solution.ai.desc' },
  { icon: TrendingUp, titleKey: 'solution.profit.title', descKey: 'solution.profit.desc' },
  { icon: Users, titleKey: 'solution.network.title', descKey: 'solution.network.desc' },
  { icon: Check, titleKey: 'solution.secure.title', descKey: 'solution.secure.desc' },
];

export default function TransformationSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeSide, setActiveSide] = useState<'before' | 'after'>('before');
  // Handler to switch active side when toggle buttons are clicked
  const handleUserClick = (side: 'before' | 'after') => {
    setActiveSide(side);
    // small visual hint: focus the section for keyboard users
    if (sectionRef.current) sectionRef.current.focus?.();
  };

  return (
    <section
      id="transform"
      ref={sectionRef}
      className="relative w-full min-h-screen py-32 bg-[#0A0A0A]"
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
            Transformation
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-4">
            {t('transform.title_prefix')}<span className="text-shimmer">{t('transform.title_highlight')}</span>
          </h2>
        </motion.div>

        {/* Toggle */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex bg-white/5 rounded-full p-1">
            <button
              onClick={() => handleUserClick('before')}
              className={`px-6 py-2 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeSide === 'before'
                  ? 'bg-alert text-white'
                  : 'text-white/50 hover:text-white'
              }`}
              data-hover
            >
              {t('transform.before')}
            </button>
            <button
              onClick={() => handleUserClick('after')}
              className={`px-6 py-2 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeSide === 'after'
                  ? 'bg-success text-white'
                  : 'text-white/50 hover:text-white'
              }`}
              data-hover
            >
              {t('transform.after')}
            </button>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Before Side */}
          <motion.div
            className={`relative rounded-2xl p-8 transition-all duration-500 ${
              activeSide === 'before'
                ? 'bg-alert/10 border border-alert/30'
                : 'bg-white/5 border border-white/10 opacity-50'
            }`}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: activeSide === 'before' ? 1 : 0.5, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-alert/20 flex items-center justify-center">
                <AlertTriangle className="text-alert" size={24} />
              </div>
              <div>
                <h3 className="text-alert text-xl font-bold">{t('transform.before')}</h3>
                <p className="text-white/50 text-sm">{t('transform.problems')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {problems.map((problem, index) => (
                  <motion.div
                    key={problem.titleKey}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-black/30"
                  >
                    <div className="w-8 h-8 rounded-full bg-alert/20 flex items-center justify-center flex-shrink-0">
                      <problem.icon className="text-alert" size={16} />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t(problem.titleKey)}</p>
                      <p className="text-white/50 text-sm">{t(problem.descKey)}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* After Side */}
          <motion.div
            className={`relative rounded-2xl p-8 transition-all duration-500 ${
              activeSide === 'after'
                ? 'bg-success/10 border border-success/30'
                : 'bg-white/5 border border-white/10 opacity-50'
            }`}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: activeSide === 'after' ? 1 : 0.5, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                <Check className="text-success" size={24} />
              </div>
              <div>
                <h3 className="text-success text-xl font-bold">{t('transform.after')}</h3>
                <p className="text-white/50 text-sm">{t('transform.solutions')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={solution.titleKey}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-black/30"
                  >
                    <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                      <solution.icon className="text-success" size={16} />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t(solution.titleKey)}</p>
                      <p className="text-white/50 text-sm">{t(solution.descKey)}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Animated Graph */}
        <motion.div
          className="mt-16 relative h-64 rounded-2xl overflow-hidden bg-gradient-to-t from-success/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
            <motion.path
              d="M0,180 Q100,170 200,160 T400,120 T600,80 T800,20"
              fill="none"
              stroke="#00C853"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 6, delay: 0.8, ease: 'easeInOut' }}
            />
            <motion.path
              d="M0,180 Q100,170 200,160 T400,120 T600,80 T800,20 L800,200 L0,200 Z"
              fill="url(#successGradient)"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.18 } : {}}
              transition={{ duration: 3, delay: 3.5, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00C853" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00C853" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          
            <div className="absolute bottom-4 left-4">
            <p className="text-success font-mono text-2xl font-bold">+847%</p>
            <p className="text-white/50 text-xs">{t('transform.metric_desc')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
