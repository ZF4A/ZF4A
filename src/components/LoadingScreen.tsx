import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useI18n } from '../context/I18nContext';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let mounted = true;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15 + 5;
        if (next >= 100) {
          clearInterval(interval);
          if (mounted) setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });
    }, 200);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [onComplete]);

  const { t } = useI18n();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* Phoenix icon */}
          <div className="mb-8 relative">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 215, 0, 0.3)',
                  '0 0 60px rgba(255, 215, 0, 0.6)',
                  '0 0 20px rgba(255, 215, 0, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 rounded-full overflow-hidden mx-auto"
            >
              <img src="/zf4a.jpg" alt="ZF4A" className="w-full h-full object-cover" />
            </motion.div>
          </div>

          <h2 className="text-white text-lg tracking-widest uppercase mb-2">
            ZF4A
          </h2>
          <p className="text-white/50 text-sm mb-8">{t('loading.subtitle')}</p>

          {/* Progress bar */}
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold to-orange-400"
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <p className="text-gold text-xs mt-4 font-mono">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
