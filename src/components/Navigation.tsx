import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X, ChevronDown } from 'lucide-react';
import { useI18n, languages } from '../context/I18nContext';

export default function Navigation() {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close desktop lang dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!langMenuOpen) return;
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [langMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
      setMobileLangOpen(false);
    }
  };

  const currentLang = languages.find(l => l.code === lang)!;

  const navItems = [
    { id: 'hero', label: t('nav.home') },
    { id: 'manifesto', label: t('nav.vision') },
    { id: 'transform', label: t('nav.transform') },
    { id: 'ecosystem', label: t('nav.ecosystem') },
    { id: 'founder', label: t('nav.founder') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass py-3' : 'bg-transparent py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollTo('hero')}
            whileHover={{ scale: 1.05 }}
            data-hover
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
              <img src="/zf4a.jpg" alt="ZF4A" className="w-full h-full object-cover" />
            </div>
            <span className="text-white font-bold tracking-[0.35em] text-base md:text-xl">ZF4A</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-white/70 hover:text-gold text-xs tracking-widest uppercase transition-colors duration-300"
                data-hover
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Language Picker */}
            <div className="relative hidden md:block" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-gold/40 text-white/70 hover:text-gold transition-all duration-200"
                data-hover
              >
                <Globe size={15} />
                <span className="text-xs uppercase font-medium">{currentLang.flag} {lang}</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 glass rounded-xl overflow-hidden w-52 shadow-2xl shadow-black/50"
                    style={{ border: '1px solid rgba(255,215,0,0.12)' }}
                  >
                    <div className="max-h-72 overflow-y-auto scrollbar-thin">
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code); setLangMenuOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-white/10 transition-colors ${
                            lang === l.code ? 'text-gold bg-gold/5' : 'text-white/70'
                          }`}
                        >
                          <span className="text-lg leading-none">{l.flag}</span>
                          <span className="flex-1">{l.name}</span>
                          {lang === l.code && <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile: Globe button (shows current flag) */}
            <button
              className="md:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/10 text-white/70 hover:border-gold/40 hover:text-gold transition-all"
              onClick={() => { setMobileMenuOpen(true); setMobileLangOpen(true); }}
              aria-label="Change language"
            >
              <span className="text-base leading-none">{currentLang.flag}</span>
              <Globe size={14} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 text-white/70 hover:border-gold/40 hover:text-gold transition-all"
              onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setMobileLangOpen(false); }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Full-Screen Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/97 backdrop-blur-xl md:hidden flex flex-col"
          >
            {/* Close button top-right */}
            <div className="flex justify-end px-4 pt-5 pb-2">
              <button
                className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 text-white/60 hover:text-gold hover:border-gold/40 transition-all"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto px-6 pb-10">
              {/* Nav links */}
              <AnimatePresence mode="wait">
                {!mobileLangOpen && (
                  <motion.div
                    key="nav-links"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center gap-1 pt-8"
                  >
                    {navItems.map((item, i) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.3 }}
                        onClick={() => scrollTo(item.id)}
                        className="w-full text-center py-4 text-xl font-medium tracking-widest uppercase text-white/80 hover:text-gold active:text-gold transition-colors border-b border-white/5 last:border-0"
                      >
                        {item.label}
                      </motion.button>
                    ))}

                    {/* Language button at bottom of nav */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: navItems.length * 0.06 + 0.1, duration: 0.3 }}
                      onClick={() => setMobileLangOpen(true)}
                      className="w-full mt-6 py-4 flex items-center justify-center gap-3 rounded-xl border border-white/10 text-white/70 hover:border-gold/30 hover:text-gold transition-all"
                    >
                      <Globe size={18} />
                      <span className="text-lg leading-none">{currentLang.flag}</span>
                      <span className="text-sm tracking-widest uppercase">{currentLang.name}</span>
                      <ChevronDown size={16} className="-rotate-90" />
                    </motion.button>
                  </motion.div>
                )}

                {/* Language grid panel */}
                {mobileLangOpen && (
                  <motion.div
                    key="lang-panel"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="pt-4"
                  >
                    {/* Back button */}
                    <button
                      onClick={() => setMobileLangOpen(false)}
                      className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors mb-6 py-2"
                    >
                      <ChevronDown size={16} className="rotate-90" />
                      <span className="text-sm tracking-wider uppercase">{t('nav.home') ? 'Back' : 'Back'}</span>
                    </button>

                    <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 text-center">
                      <Globe size={12} className="inline mr-2" />
                      Language
                    </p>

                    {/* 4-column flag grid */}
                    <div className="grid grid-cols-4 gap-2">
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code); setMobileMenuOpen(false); setMobileLangOpen(false); }}
                          className={`flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl border transition-all active:scale-95 ${
                            lang === l.code
                              ? 'border-gold/60 bg-gold/10 text-gold'
                              : 'border-white/8 bg-white/3 text-white/60 hover:border-white/20 hover:bg-white/8'
                          }`}
                        >
                          <span className="text-2xl leading-none">{l.flag}</span>
                          <span className="text-[10px] uppercase tracking-wider font-medium leading-none">{l.code}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
