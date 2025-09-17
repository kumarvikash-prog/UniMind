import { motion } from "framer-motion";
import { 
  FileText, 
  MessageCircle, 
  Users, 
  ArrowRight, 
  Sparkles,
  GitBranch,
  Clock,
  Star
} from "lucide-react";

export const KnowledgeFlowSection = () => {
  const flowSteps = [
    {
      icon: FileText,
      title: "Upload PDF",
      description: "Upload documents, research papers, notes, and media from any source with intelligent parsing",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: Users,
      title: "Share Insights",
      description: "Team members collaborate and share knowledge in real-time with contextual discussions",
      gradient: "from-purple-500 to-pink-400"
    },
    {
      icon: GitBranch,
      title: "Build Together",
      description: "AI discovers connections and helps teams build comprehensive knowledge networks",
      gradient: "from-green-500 to-emerald-400"
    }
  ];

  return (
    <section className="relative py-32 cosmic-bg">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
            backgroundSize: ["100% 100%", "120% 120%", "100% 100%"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, hsl(var(--holo-pink) / 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, hsl(var(--holo-blue) / 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, hsl(var(--holo-cyan) / 0.1) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <GitBranch className="w-8 h-8 text-primary animate-energy-pulse" />
            <h2 className="text-stellar gradient-text">Knowledge Flow Visualization</h2>
            <Sparkles className="w-8 h-8 text-accent animate-holo-shift" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Collect, Share, and Build Knowledge Together. Watch how your team's knowledge flows seamlessly 
            through collaborative networks and intelligent connections.
          </p>
        </motion.div>

        {/* Flow Visualization */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute inset-0">
            {flowSteps.slice(0, -1).map((_, index) => (
              <motion.div
                key={index}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.3 }}
                className="absolute"
                style={{
                  left: `${20 + (index * 20)}%`,
                  top: '50%',
                  width: '20%',
                  height: '2px',
                  background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
                  transformOrigin: 'left center',
                }}
              >
                <motion.div
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.4,
                  }}
                  className="absolute inset-0 w-8 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
                />
              </motion.div>
            ))}
          </div>

          {/* Flow Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {flowSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                <div className="p-8 h-full relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br text-center">
                  {/* Dynamic Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-10 group-hover:opacity-20 transition-all duration-500`} />
                  
                  {/* Connection Lines for Desktop */}
                  {index < flowSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent" />
                  )}
                  
                  {/* Icon Container */}
                  <motion.div
                    animate={{ 
                      rotateY: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 1.6,
                    }}
                    className="relative mx-auto mb-6 w-20 h-20"
                  >
                    <div className={`w-full h-full bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 space-y-3">
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Floating Number */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.4 
                    }}
                    className={`absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg`}
                  >
                    {index + 1}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Timeline Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <div className="max-w-4xl mx-auto p-8 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-lg">
            <motion.div
              animate={{ 
                background: [
                  'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute inset-0"
            />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 justify-center">
                <Clock className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                  Live Knowledge Timeline
                </h3>
              </div>
              
              <p className="text-center text-gray-300 max-w-2xl mx-auto">
                See how your team's knowledge evolves in real-time. Every upload, share, and collaboration 
                creates a timestamp in your collective journey.
              </p>

              {/* Mini Timeline Visualization */}
              <div className="flex items-center justify-center gap-4 py-6">
                {[
                  'from-blue-500 to-cyan-400',
                  'from-purple-500 to-pink-400', 
                  'from-green-500 to-emerald-400',
                  'from-orange-500 to-red-400',
                  'from-indigo-500 to-blue-400'
                ].map((gradient, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                    className={`w-4 h-4 bg-gradient-to-br ${gradient} rounded-full shadow-lg`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};