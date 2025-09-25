import { motion } from "framer-motion";
import { HolographicButton } from "../HolographicButton";
import { GoogleSignInButton } from "../GoogleSignInButton";
import { ArrowRight, Zap } from "lucide-react";
import { Navigation } from "../Navigation";
import { FeatureHighlights } from "../FeatureHighlights";
import { AnimatedBackground } from "../AnimatedBackground";
import { signIn } from "next-auth/react";

export const HeroSection = () => {
  const handleGetStarted = () => {
    signIn("google");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Navigation */}
      <Navigation />
      
      {/* Animated Background */}
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-12 pt-20">

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white">
            Smarter Knowledge Sharing
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              for Teams, Students
            </span>
            <br />
            & Researchers
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed tracking-wide"
          >
            Collaborate, upload, discuss, and track contributions in one unified workspace.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <GoogleSignInButton>
            Continue with Google
          </GoogleSignInButton>
        </motion.div>

        {/* Feature Highlights */}
        <FeatureHighlights />
      </div>
    </section>
  );
};