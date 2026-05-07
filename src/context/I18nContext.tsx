import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
] as const;

type LangCode = typeof languages[number]['code'];

const translations: Record<LangCode, Record<string, string>> = {
  en: {
    'hero.title': 'ZF4A – ZE FUTURE FOR ALL',
    'hero.subtitle': 'Building Opportunities Beyond Limits',
    'hero.cta': 'Ignite Your Potential',
    'manifesto.heading': 'A Vision Beyond Limits',
    'manifesto.body': 'I am building the bridge between ambition and reality. ZF4A is not just a platform; it is a movement to democratize access to AI, finance, and global networking.',
    'manifesto.signature': '- Samuel WANDJI',
    'manifesto.cta': 'Join the Movement',
    'transform.before': 'BEFORE',
    'transform.after': 'AFTER',
    'transform.problems': 'Chaos, Inefficiency, Lost Opportunities',
    'transform.solutions': 'Growth, Automation, Profit',
    'ecosystem.heading': 'ONE GOLDEN NETWORK',
    'ecosystem.subheading': 'Three pillars. One unstoppable force.',
    'zeunetwork.title': 'ZEUNETWORK',
    'zeunetwork.slogan': 'A GOLDEN NETWORK',
    'zeunetwork.desc': 'A global ecosystem combining a marketplace, an AI assistant, smart networking, and a powerful opportunity engine. It is the first global network that enables Students, Autodidacts, and Jobseekers to connect directly with Enterprises, Organizations, and Schools — not just to find a job but to discover opportunities, internships, scholarships, and a wide spectrum of learning and career pathways. Our marketplace also lets users earn money while they wait for opportunities through the transparent "NEED" system that matches demand to micro-tasks, paid contributions, and preparatory gigs.',
    'zeunetwork.tagline': 'IN AN ERA WHERE AI IS REPLACING HUMANS, ZEUNETWORK IS THE BEST CHOICE TO CHANGE YOUR FUTURE',
    'zeunetwork.cta': 'Continue with ZEUNETWORK',
    'alaxix.title': 'ALAXIX',
    'alaxix.slogan': 'FULL-SPECTRUM INTELLIGENCE PLATFORM',
    'alaxix.desc': 'A next-generation, open intelligence platform built to scale across domains and industries. ALAXIX unifies large-scale models, modular microservices, and ontology-aware reasoning to automate complex workflows, accelerate product development, and augment human teams. It ships with secure APIs, pluggable connectors, embedded memory, and sandboxed execution so enterprises can deploy adaptable agents that learn from outcomes and continuously improve.',
    'alaxix.features_intro': 'Core Capabilities',
    'alaxix.cta': 'Explore ALAXIX',
    'alaxix.feature.multi_task': 'Multi-Task Orchestration — run and coordinate concurrent tasks across systems and teams',
    'alaxix.feature.nlp': 'Advanced Natural Language Understanding — contextual dialogue, semantic search, and adaptive summarization',
    'alaxix.feature.workflow': 'Workflow Automation — reliable pipelines, approvals, and observability',
    'alaxix.feature.self_improving': 'Self-Improving Agents — continuous learning from feedback and outcomes',
    'alaxix.feature.tooling': 'Developer Tooling & SDKs — fast integrations, testing, and deployment',
    'alaxix.feature.security': 'Enterprise Security & Governance — role-based controls, audit trails, and data isolation',
    'alaxix.feature.interpretable': 'Interpretable Decisions — explainability features and traceable reasoning',
    'alaxix.feature.lowlatency': 'Low-Latency Edge & Cloud Deployments — flexible runtime topology for performance',
    'alaxix.feature.custom_models': 'Custom Model Hosting & Fine-Tuning — bring-your-own-model with safe fine-tuning',
    'alaxix.feature.cost_opt': 'Cost & Resource Optimization — autoscaling with budget-aware scheduling',
    'finilix.title': 'FINILIX',
    'finilix.slogan': 'ADVANCED FINANCIAL AI',
    'finilix.desc': 'High-level financial intelligence for enterprises and investors — combining real-time global market monitoring, multi-source alternative data, on-chain signals, and adaptive AI models. FINILIX delivers continuous trend detection, scenario simulation, portfolio optimization, algorithmic execution, ESG and sustainability scoring, regulatory & compliance alerts, and explainable risk analytics — all powered by low-latency infrastructure and enterprise-grade security to stay competitive for the next decade.',
    'finilix.cta': 'Explore FINILIX',
    'founder.heading': 'The Visionary',
    'founder.name': 'Samuel Wandji',
    'founder.role': 'Founder & CEO',
    'founder.statement': 'The future belongs to those who believe in the beauty of their dreams.',
    'footer.heading': 'THE FUTURE DOESN\'T WAIT.',
    'footer.cta1': 'Launch ZEUNETWORK',
    'footer.cta2': 'Explore ALAXIX',
    'footer.cta3': 'Invest with FINILIX',
    'footer.rights': 'All rights reserved.',
    'nav.home': 'Home',
    'nav.vision': 'Vision',
    'nav.transform': 'Transform',
    'nav.ecosystem': 'Ecosystem',
    'nav.founder': 'Founder',
    'nav.contact': 'Contact',
    'loading.title': 'Loading',
    'contact.heading': 'Contact',
    'contact.name': 'Your name',
    'contact.purpose': 'Purpose / Message',
    'contact.method': 'Contact via',
    'contact.method.whatsapp': 'WhatsApp',
    'contact.method.email': 'Email',
    'contact.send': 'Send',
    'contact.placeholder.name': 'Enter your full name',
    'contact.placeholder.purpose': 'Briefly describe your purpose',
    'contact.success': 'Opening chat…',
    'contact.error': 'Unable to open contact link',
    'contact.note': 'We will reply via your chosen method. Provide a clear purpose for faster help.',
    'founder.intro': 'Meet the Visionary',
    'founder.intro_prefix': 'Meet the ',
    'founder.intro_highlight': 'Visionary',
    'footer.brand': 'ZF4A – ZE FUTURE FOR ALL',
    'ecosystem.title_main': 'One Golden Ecosystem',
    'loading.subtitle': 'Igniting the future...',
    'hero.highlight': 'THE FUTURE',
    'manifesto.sub1': 'Ambition',
    'manifesto.sub2': 'and Reality',
    'manifesto.title_prefix': 'Building the Bridge Between',
    'feature.marketplace': 'Global Marketplace',
    'feature.ai_assistant': 'AI Assistant',
    'feature.smart_networking': 'Smart Networking',
    'feature.opportunity_engine': 'Opportunity Engine',
    'capability.multi_task': 'Multi-Task Execution',
    'capability.natural_language': 'Natural Language',
    'capability.workflow_automation': 'Workflow Automation',
    'capability.self_improving_ai': 'Self-Improving AI',
    'product.market_monitor': 'Real-Time Market Monitor',
    'product.trend_prediction': 'Trend Prediction',
    'product.risk_analysis': 'Risk Analysis',
    'product.profit_optimization': 'Profit Optimization',
    'product.adaptive_models': 'Adaptive AI Models',
    'product.portfolio_optimizer': 'Portfolio Optimization',
    'product.alternative_data': 'Alternative Data Insights',
    'product.onchain_signals': 'On-Chain Signals',
    'product.esg_scoring': 'ESG & Sustainability Scoring',
    'product.regulatory_alerts': 'Regulatory & Compliance Alerts',
    'product.scenario_simulator': 'Scenario Simulator',
    'product.explainable_ai': 'Explainable Risk Analytics',
    'product.enterprise_cfo': 'Personalized CFO Assistant',
    'contact.msg_label_name': 'Name:',
    'contact.msg_label_purpose': 'Purpose:',
    'transform.title_prefix': 'From Chaos to ',
    'transform.title_highlight': 'Order',
    'transform.metric_desc': 'Average client growth',
    'problem.chaos.title': 'Chaos & Inefficiency',
    'problem.chaos.desc': 'Scattered information, wasted time',
    'problem.lost.title': 'Lost Opportunities',
    'problem.lost.desc': 'Missing connections, no visibility',
    'problem.analytics.title': 'Poor Analytics',
    'problem.analytics.desc': 'No data-driven decisions',
    'problem.security.title': 'Security Risks',
    'problem.security.desc': 'Vulnerable systems, data breaches',

    'solution.ai.title': 'AI Automation',
    'solution.ai.desc': 'Smart workflows, maximum efficiency',
    'solution.profit.title': 'Profit Growth',
    'solution.profit.desc': 'Data-driven revenue optimization',
    'solution.network.title': 'Global Network',
    'solution.network.desc': 'Connect with opportunities worldwide',
    'solution.secure.title': 'Secure Platform',
    'solution.secure.desc': 'Enterprise-grade protection',
    'ui.more': 'More',
    'ui.prev_slide': 'Previous slide',
    'ui.next_slide': 'Next slide',
    'ui.previous': 'Previous',
    'ui.next': 'Next',
    'ui.more_pages': 'More pages',
    'ui.close': 'Close',
    'ui.sidebar_title': 'Sidebar',
    'ui.sidebar_desc': 'Displays the mobile sidebar.',
    'ui.toggle_sidebar': 'Toggle Sidebar',
  },
  fr: {
    'hero.title': 'ZF4A – ZE FUTURE FOR ALL',
    'hero.subtitle': 'Construire des Opportunités Sans Limites',
    'hero.cta': 'Libérez Votre Potentiel',
    'manifesto.heading': 'Une Vision Sans Limites',
    'manifesto.body': 'Je construis le pont entre l\'ambition et la réalité. ZF4A n\'est pas seulement une plateforme; c\'est un mouvement pour démocratiser l\'accès à l\'IA, la finance et le réseau mondial.',
    'manifesto.signature': '- Samuel WANDJI',
    'manifesto.cta': 'Rejoignez le Mouvement',
    'transform.before': 'AVANT',
    'transform.after': 'APRÈS',
    'transform.problems': 'Chaos, Inefficacité, Opportunités Perdues',
    'transform.solutions': 'Croissance, Automatisation, Profit',
    'ecosystem.heading': 'UN RÉSEAU EN OR',
    'ecosystem.subheading': 'Trois piliers. Une force irrésistible.',
    'zeunetwork.title': 'ZEUNETWORK',
    'zeunetwork.slogan': 'UN RÉSEAU EN OR',
    'zeunetwork.desc': 'Un écosystème mondial combinant un marketplace, un assistant IA, un réseautage intelligent et un puissant moteur d\'opportunités. C\'est le premier réseau mondial permettant aux étudiants, autodidactes et chercheurs d\'emploi de se connecter directement aux entreprises, organisations et écoles — pas seulement pour trouver un emploi, mais pour découvrir des opportunités, stages, bourses et de nombreuses voies d\'apprentissage et de carrière. Notre marketplace permet aussi aux utilisateurs de gagner de l\'argent en attendant les opportunités grâce au système transparent "NEED" qui met en relation la demande avec des micro-tâches, contributions rémunérées et missions préparatoires.',
    'zeunetwork.tagline': 'DANS UNE ÉPOQUE OÙ L\'IA REMPLACE LES HUMAINS, ZEUNETWORK EST LE MEILLEUR CHOIX POUR CHANGER VOTRE AVENIR',
    'zeunetwork.cta': 'Continuer avec ZEUNETWORK',
    'alaxix.title': 'ALAXIX',
    'alaxix.slogan': 'SYSTÈME AI COMPLET',
    'alaxix.desc': 'Plateforme d\'intelligence de nouvelle génération, ouverte et conçue pour s\'adapter à plusieurs domaines et industries. ALAXIX unifie modèles à grande échelle, microservices modulaires et raisonnement ontologique pour automatiser workflows complexes, accélérer le développement produit et augmenter les capacités des équipes humaines, avec API sécurisées, connecteurs plug-and-play, mémoire embarquée et exécution sandboxée.',
    'alaxix.features_intro': 'Capacités clés',
    'alaxix.feature.multi_task': 'Orchestration Multi-Tâches — exécute et coordonne des tâches concurrentes entre systèmes et équipes',
    'alaxix.feature.nlp': 'Compréhension avancée du langage — dialogue contextuel, recherche sémantique et résumés adaptatifs',
    'alaxix.feature.workflow': 'Automatisation des workflows — pipelines fiables, approbations et observabilité',
    'alaxix.feature.self_improving': 'Agents auto-améliorants — apprentissage continu depuis les retours et résultats',
    'alaxix.cta': 'Découvrir ALAXIX',
    'finilix.title': 'FINILIX',
    'finilix.slogan': 'IA FINANCIÈRE AVANCÉE',
    'finilix.desc': 'Intelligence financière de haut niveau pour entreprises et investisseurs — combinant surveillance des marchés en temps réel, données alternatives multi-sources, signaux on-chain et modèles IA adaptatifs. FINILIX propose détection continue des tendances, simulation de scénarios, optimisation de portefeuilles, exécution algorithmique, scoring ESG et durabilité, alertes réglementaires et analyses de risque explicables — le tout sur une infrastructure basse latence et une sécurité de niveau entreprise pour rester compétitif la prochaine décennie.',
    'finilix.cta': 'Découvrir FINILIX',
    'founder.heading': 'Le Visionnaire',
    'founder.name': 'Samuel Wandji',
    'founder.role': 'Fondateur & PDG',
    'founder.statement': 'L\'avenir appartient à ceux qui croient en la beauté de leurs rêves.',
    'footer.heading': 'L\'AVENIR N\'ATTEND PAS.',
    'footer.cta1': 'Lancer ZEUNETWORK',
    'footer.cta2': 'Découvrir ALAXIX',
    'footer.cta3': 'Investir avec FINILIX',
    'nav.home': 'Accueil',
    'nav.vision': 'Vision',
    'nav.transform': 'Transformer',
    'nav.ecosystem': 'Écosystème',
    'nav.founder': 'Fondateur',
    'loading.title': 'Chargement',
    'contact.heading': 'Contact',
    'contact.name': 'Votre nom',
    'contact.purpose': 'Objet / Message',
    'contact.method': 'Contact via',
    'contact.method.whatsapp': 'WhatsApp',
    'contact.method.email': 'E-mail',
    'contact.send': 'Envoyer',
    'contact.placeholder.name': 'Entrez votre nom complet',
    'contact.placeholder.purpose': 'Décrivez brièvement votre objectif',
    'contact.success': 'Ouverture du chat…',
    'contact.error': 'Impossible d\'ouvrir le lien de contact',
    'ui.close': 'Fermer',
    'ui.sidebar_title': 'Barre latérale',
    'ui.sidebar_desc': 'Affiche la barre latérale mobile.',
    'ui.toggle_sidebar': 'Basculer la barre latérale',
    'manifesto.title_prefix': 'Construire le pont entre',
    'transform.title_prefix': 'Du chaos à ',
    'transform.title_highlight': "l'ordre",
    'transform.metric_desc': 'Croissance moyenne des clients',
    'problem.chaos.title': 'Chaos & Inefficacité',
    'problem.chaos.desc': 'Informations dispersées, temps perdu',
    'problem.lost.title': 'Opportunités Perdues',
    'problem.lost.desc': 'Connexions manquantes, pas de visibilité',
    'problem.analytics.title': 'Analyses Insuffisantes',
    'problem.analytics.desc': 'Pas de décisions basées sur les données',
    'problem.security.title': 'Risques de Sécurité',
    'problem.security.desc': 'Systèmes vulnérables, fuites de données',

  },
};

interface I18nContextType {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('zf4a-lang') as LangCode | null;
        if (saved && languages.find(l => l.code === saved)) return saved;
        const browserLang = (navigator.language || 'en').split('-')[0] as LangCode;
        if (languages.find(l => l.code === browserLang)) return browserLang;
      }
    } catch (e) {
      // ignore
    }
    return 'en';
  });

  const setLang = useCallback((newLang: LangCode) => {
    setLangState(newLang);
    try {
      localStorage.setItem('zf4a-lang', newLang);
    } catch (e) {
      // ignore
    }
  }, []);

  const t = useCallback((key: string) => {
    const map = translations[lang] || {};
    return map[key] || translations.en[key] || key;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

