import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ExternalLink, Globe, Brain, TrendingUp, Sparkles } from 'lucide-react';
import NeuralSphere from '../components/3d/NeuralSphere';
import DataStream from '../components/3d/DataStream';
import { useI18n } from '../context/I18nContext';

const products = [
  {
    id: 'zeunetwork',
    title: 'ZEUNETWORK',
    slogan: 'A GOLDEN NETWORK',
    icon: Globe,
    image: '/ZE.jpg',
    color: '#FFD700',
    cta: 'Continue with ZEUNETWORK',
    url: 'https://www.zeunetwork.com',
    features: [
      'feature.marketplace',
      'feature.ai_assistant',
      'feature.smart_networking',
      'feature.opportunity_engine',
    ],
  },
  {
    id: 'alaxix',
    title: 'ALAXIX',
    slogan: 'FULLY POSITIONED AI SYSTEM',
    icon: Brain,
    image: '/A.jpg',
    color: '#FFFFFF',
    cta: 'Explore ALAXIX',
    url: 'https://www.alaxix.com',
    features: [
      'capability.multi_task',
      'capability.natural_language',
      'capability.workflow_automation',
      'capability.self_improving_ai',
    ],
  },
  {
    id: 'finilix',
    title: 'FINILIX',
    slogan: 'ADVANCED FINANCIAL AI',
    icon: TrendingUp,
    image: '/FI.jpg',
    color: '#00C853',
    cta: 'Explore FINILIX',
    url: 'https://www.finilix.com',
    features: [
      'product.market_monitor',
      'product.trend_prediction',
      'product.risk_analysis',
      'product.profit_optimization',
    ],
  },
];

export default function EcosystemSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  return (
    <section
      id="ecosystem"
      ref={sectionRef}
      className="relative w-full min-h-screen py-32 bg-[#0A0A0A]"
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="text-gold" size={20} />
            <p className="text-gold text-sm tracking-[0.3em] uppercase">
              {t('ecosystem.heading')}
            </p>
            <Sparkles className="text-gold" size={20} />
          </motion.div>
          <h2 className="font-display text-4xl md:text-6xl text-white font-bold mb-4">
            {t('ecosystem.title_main')}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            {t('ecosystem.subheading')}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
              onMouseEnter={() => setActiveProduct(product.id)}
              onMouseLeave={() => setActiveProduct(null)}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
                activeProduct === product.id
                  ? 'scale-105 z-10'
                  : activeProduct
                  ? 'scale-95 opacity-70'
                  : ''
              }`}
            >
              {/* 3D Preview for ALAXIX and FINILIX */}
              {(product.id === 'alaxix' || product.id === 'finilix') && (
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                  <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    {product.id === 'alaxix' && <NeuralSphere />}
                    {product.id === 'finilix' && <DataStream />}
                  </Canvas>
                </div>
              )}

              {/* Card Content */}
              <div
                className="relative p-8 h-full min-h-[480px] flex flex-col"
                style={{
                  background: `linear-gradient(135deg, ${product.color}08 0%, transparent 50%, ${product.color}05 100%)`,
                  border: `1px solid ${product.color}30`,
                }}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${product.color}20, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="w-28 h-28 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${product.color}10` }}
                  animate={
                    activeProduct === product.id
                      ? { rotateY: 360 }
                      : { rotateY: 0 }
                  }
                  transition={{ duration: 0.8 }}
                >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                </motion.div>

                {/* Title */}
                <h3
                  className="text-3xl font-black tracking-tight mb-2"
                  style={{ color: product.color }}
                >
                  {product.title}
                </h3>
                <p className="text-white/40 text-sm tracking-wider uppercase mb-6">
                  {t(`${product.id}.slogan`)}
                </p>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed mb-6 flex-grow">
                  {t(`${product.id}.desc`)}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-8">
                  {product.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: product.color }}
                      />
                      <span className="text-white/60 text-xs">{t(feature)}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all duration-300"
                  style={{
                    backgroundColor: `${product.color}20`,
                    color: product.color,
                    border: `1px solid ${product.color}40`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = product.color;
                    e.currentTarget.style.color = '#000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${product.color}20`;
                    e.currentTarget.style.color = product.color;
                  }}
                  data-hover
                >
                  <span>{t(`${product.id}.cta`)}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
