import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface FloatingCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  className?: string;
  children?: ReactNode;
}

export const FloatingCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0, 
  className,
  children 
}: FloatingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      whileHover={{ 
        y: -20, 
        rotateY: 15,
        rotateX: 15,
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className={cn(
        "glass-card levitate card-3d group cursor-pointer relative overflow-hidden",
        "border border-glass-primary/20 hover:border-glass-primary/40",
        className
      )}
    >
      {/* Holographic Glow */}
      <div className="absolute inset-0 bg-gradient-cosmic opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      
      {/* Floating Icon */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-16 h-16 mx-auto mb-6 relative"
      >
        <div className="absolute inset-0 bg-gradient-cosmic rounded-2xl blur-lg opacity-50" />
        <div className="relative z-10 w-full h-full bg-glass-background/50 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-glass-primary/30">
          <Icon className="w-8 h-8 text-primary" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="text-center space-y-4">
        <h3 className="text-xl font-bold gradient-text">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
        {children}
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </motion.div>
  );
};