import { useState, useCallback, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import ManifestoSection from './sections/ManifestoSection';
import TransformationSection from './sections/TransformationSection';
import EcosystemSection from './sections/EcosystemSection';
import FounderSection from './sections/FounderSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  // Safety fallback: ensure loading state clears after 10s in case loader hangs
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 10000);
    return () => clearTimeout(id);
  }, []);

  return (
    <ThemeProvider>
      <I18nProvider>
        {loading && <LoadingScreen onComplete={handleLoadComplete} />}
        
        {!loading && (
          <div className="relative">
            <CustomCursor />
            <Navigation />
            <main>
              <HeroSection />
              <ManifestoSection />
              <TransformationSection />
              <EcosystemSection />
              <FounderSection />
              <ContactSection />
            </main>
            <Footer />
          </div>
        )}
      </I18nProvider>
    </ThemeProvider>
  );
}
