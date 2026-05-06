import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ArrowDown } from 'lucide-react';
import SparkField from '../components/3d/SparkField';
import Stars from '../components/3d/Stars';
import GodRays from '../components/3d/GodRays';
import { useI18n } from '../context/I18nContext';

function CameraRig() {
  const { camera } = useThree();
  const { scrollYProgress } = useScroll();
  const cameraZ = useTransform(scrollYProgress, [0, 0.3], [5, -2]);

  useEffect(() => {
    const unsubscribe = cameraZ.on('change', (v) => {
      camera.position.z = v;
    });
    return () => unsubscribe();
  }, [camera, cameraZ]);

  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.08) * 0.3;
  });

  return null;
}

export default function HeroSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen"
    >
      {/* 3D Canvas */}
      <div className="sticky top-0 w-full h-screen">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[0.7, 1.1]}
          gl={{ antialias: false, alpha: false }}
          style={{ background: '#0A0A0A' }}
        >
          <CameraRig />
          <Stars />
          <GodRays />
          <SparkField />
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 5, 0]} color="#FFD700" intensity={2} distance={20} />
        </Canvas>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {/* Top branding removed as requested */}

          {/* Main Hero Text */}
          <div className="text-center px-4" style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] as any }}
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-black tracking-tight mb-4">
                <span className="text-shimmer">{t('hero.highlight')}</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <p className="text-gold text-lg md:text-xl tracking-[0.2em] uppercase font-light mb-2">
                {t('hero.title')}
              </p>
              <p className="text-white/60 text-sm md:text-base tracking-wider max-w-md mx-auto">
                {t('hero.subtitle')}
              </p>
            </motion.div>

            {/* Hero fire-effect text removed per request */}

            {/* CTA Button */}
            <motion.div
              className="mt-12 pointer-events-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <button
                className="group relative px-8 py-4 rounded-full bg-transparent border-2 border-gold text-gold font-semibold tracking-wider uppercase text-sm hover:bg-gold hover:text-black transition-all duration-500 glow-gold-strong"
                data-hover
                onClick={() => {
                  document.getElementById('ecosystem')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('hero.cta')}
                <span className="absolute inset-0 rounded-full bg-gold/20 blur-xl group-hover:bg-gold/40 transition-all duration-500" />
              </button>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="text-gold/50" size={24} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
