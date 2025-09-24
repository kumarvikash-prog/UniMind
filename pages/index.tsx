import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ParticleField } from "../components/ParticleField";
import { HeroSection } from "../components/sections/HeroSection";
import { FeaturesSection } from "../components/sections/FeaturesSection";
import { KnowledgeFlowSection } from "../components/sections/KnowledgeFlowSection";
import { CTASection } from "../components/sections/CTASection";
import { Footer } from "../components/sections/Footer";

const Index = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add cosmic body class for special effects
    document.body.classList.add('cosmic-experience');
    
    return () => {
      document.body.classList.remove('cosmic-experience');
    };
  }, []);

  // Redirect authenticated users to workspace
  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (session) {
      router.push("/workspace");
    }
  }, [session, status, router]);

  // Show loading spinner while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  // Don't render landing page if user is authenticated (will redirect)
  if (session) {
    return null;
  }

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
