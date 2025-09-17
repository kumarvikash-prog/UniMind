import { motion } from "framer-motion";
import { FloatingCard } from "../FloatingCard";
import { 
  Brain, 
  Clock, 
  Users, 
  MessageSquare, 
  BarChart3, 
  CheckSquare,
  Network,
  Zap
} from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: "Authentication & Team Workspace",
      description: "Secure login and collaborative team environments with role-based access control and seamless integration.",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: Clock,
      title: "Knowledge Chain Timeline",
      description: "Track every contribution in chronological order with interactive timelines and version history.",
      gradient: "from-purple-500 to-pink-400"
    },
    {
      icon: BarChart3,
      title: "Dual Contribution Views",
      description: "Switch between column and timeline perspectives to visualize knowledge flow in multiple dimensions.",
      gradient: "from-green-500 to-emerald-400"
    },
    {
      icon: MessageSquare,
      title: "Context-Aware Discussions",
      description: "Smart conversations tied to specific content with AI-powered suggestions and intelligent threading.",
      gradient: "from-orange-500 to-red-400"
    },
    {
      icon: CheckSquare,
      title: "Tasks & To-Do Management",
      description: "Organized task management with progress tracking, deadlines, and seamless workflow integration.",
      gradient: "from-indigo-500 to-blue-400"
    },
    {
      icon: BarChart3,
      title: "Contribution Analytics",
      description: "Visualize team performance and engagement with detailed insights and interactive dashboards.",
      gradient: "from-yellow-500 to-orange-400"
    }
  ];

  return (
    <section className="relative py-32 cosmic-bg">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-holo-purple/10 morph-blob blur-3xl animate-morph" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-holo-yellow/10 morph-blob blur-3xl animate-morph" style={{ animationDelay: '3s' }} />
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
            <Network className="w-8 h-8 text-primary animate-energy-pulse" />
            <h2 className="text-stellar gradient-text">Levitating Feature Galaxy</h2>
            <Zap className="w-8 h-8 text-accent animate-energy-pulse" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover revolutionary features that transform how you create, share, and build upon knowledge.
            Each feature exists in its own dimension, working together to create the ultimate collaboration experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, rotateX: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                transition: { 
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300
                }
              }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="cursor-pointer"
            >
              <div className={`glass-card h-full group relative overflow-hidden feature-card-${
                feature.gradient.includes('blue') ? 'blue' :
                feature.gradient.includes('purple') ? 'purple' :
                feature.gradient.includes('green') ? 'green' :
                feature.gradient.includes('orange') ? 'orange' :
                feature.gradient.includes('indigo') ? 'indigo' : 'yellow'
              }`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                
                <div className="relative z-10 space-y-4">
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
                    whileHover={{
                      rotate: 5,
                      transition: { duration: 0.3 }
                    }}
                    className="w-16 h-16 mx-auto mb-4"
                  >
                    <div className={`w-full h-full bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Demo Teaser */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto p-12 relative overflow-hidden group rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 backdrop-blur-lg">
            <motion.div
              animate={{ 
                background: [
                  'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute inset-0"
            />
            
            <div className="relative z-10 space-y-6">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
                Experience the Magic
              </h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                These aren't just features – they're building blocks of a new dimension in collaborative knowledge creation.
                Watch how they work together to amplify your team's collective intelligence.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                <Brain className="w-6 h-6" />
                Explore Interactive Demo
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};