import { useEffect } from "react";
import { motion } from "framer-motion";
import { ParticleField } from "../components/ParticleField";
import { HeroSection } from "../components/sections/HeroSection";
import { FeaturesSection } from "../components/sections/FeaturesSection";
import { KnowledgeFlowSection } from "../components/sections/KnowledgeFlowSection";
import { CTASection } from "../components/sections/CTASection";
import { Footer } from "../components/sections/Footer";

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add cosmic body class for special effects
    document.body.classList.add('cosmic-experience');
    
    return () => {
      document.body.classList.remove('cosmic-experience');
    };
  }, []);

  return (
    <div className="relative">
      {/* Interactive Background Elements */}
      <ParticleField />
      {/* Removed <CursorTrail /> */}
      
      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <HeroSection />
        <FeaturesSection />
        <KnowledgeFlowSection />
        <CTASection />
        <Footer />
      </motion.main>
    </div>
  );
};

export default Index;
