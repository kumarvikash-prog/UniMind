import { motion } from "framer-motion";
import { Upload, MessageCircle, BarChart3, Users } from "lucide-react";

export const FeatureHighlights = () => {
  const highlights = [
    {
      icon: Upload,
      text: "Upload & Organize",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: MessageCircle,
      text: "Smart Discussions",
      gradient: "from-purple-500 to-pink-400"
    },
    {
      icon: BarChart3,
      text: "Track Contributions",
      gradient: "from-green-500 to-emerald-400"
    },
    {
      icon: Users,
      text: "Team Collaboration",
      gradient: "from-orange-500 to-red-400"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.4 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16"
    >
      {highlights.map((highlight, index) => (
        <motion.div
          key={highlight.text}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: 1.6 + index * 0.1,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.05, 
            y: -5,
            transition: { duration: 0.2 }
          }}
          className="glass-card text-center group cursor-default"
        >
          <motion.div
            animate={{ 
              rotateY: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: index * 2,
            }}
            className="w-12 h-12 mx-auto mb-3"
          >
            <div className={`w-full h-full bg-gradient-to-br ${highlight.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
              <highlight.icon className="w-6 h-6 text-white" />
            </div>
          </motion.div>
          <p className="text-sm font-medium text-foreground">{highlight.text}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};