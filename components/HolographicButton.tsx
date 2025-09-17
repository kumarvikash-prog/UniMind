import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HolographicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "hero";
  className?: string;
  disabled?: boolean;
}

export const HolographicButton = ({ 
  children, 
  onClick, 
  variant = "primary", 
  className,
  disabled = false 
}: HolographicButtonProps) => {
  const variants = {
    primary: "glass-button hover:scale-105",
    secondary: "brutal-button",
    hero: "relative px-8 py-4 font-bold text-lg bg-gradient-cosmic text-background rounded-xl overflow-hidden group"
  };

  if (variant === "hero") {
    return (
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          variants[variant],
          "transition-all duration-300 energy-pulse",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-cosmic opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <div className="relative z-10 flex items-center gap-2">
          {children}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        variants[variant],
        "transition-all duration-300",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </motion.button>
  );
};