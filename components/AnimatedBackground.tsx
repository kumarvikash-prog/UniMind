import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/* Animated gradient waves */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 60% 30%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0"
      />
      
      {/* Secondary wave layer */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 70% 60%, rgba(99, 102, 241, 0.2) 0%, transparent 60%)',
            'radial-gradient(circle at 30% 40%, rgba(99, 102, 241, 0.2) 0%, transparent 60%)',
            'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 60%)',
            'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 60%)',
            'radial-gradient(circle at 70% 60%, rgba(99, 102, 241, 0.2) 0%, transparent 60%)',
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute inset-0"
      />
      
      {/* Tertiary wave layer */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            'radial-gradient(circle at 30% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            'radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            'radial-gradient(circle at 40% 60%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute inset-0"
      />

      {/* Subtle floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};