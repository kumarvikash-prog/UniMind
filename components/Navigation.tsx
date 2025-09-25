import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { HolographicButton } from "./HolographicButton";
import { GoogleSignInButton } from "./GoogleSignInButton";

import { signIn } from "next-auth/react";

export const Navigation = () => {
  const handleGoogleAuth = () => {
    signIn("google");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-cosmic rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
            <div className="relative w-10 h-10 glass rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
          </div>
          <h1 className="text-xl font-bold gradient-text">UniMind</h1>
        </motion.div>

        {/* Google Auth Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GoogleSignInButton className="text-sm font-medium" />
        </motion.div>
      </div>
    </motion.nav>
  );
};