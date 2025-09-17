import { motion } from "framer-motion";
import { HolographicButton } from "../HolographicButton";
import { 
  Rocket, 
  ArrowRight, 
  Sparkles, 
  Zap,
  Users,
  Brain,
  Heart
} from "lucide-react";

export const CTASection = () => {
  const handleGoogleAuth = () => {
    // Google OAuth integration will be implemented here
    console.log("Initiating Google OAuth...");
    // This would typically redirect to Google OAuth or open a popup
    // window.location.href = '/auth/google';
  };

  const benefits = [
    { icon: Brain, text: "Infinite Knowledge Capacity" },
    { icon: Users, text: "Seamless Team Collaboration" },
    { icon: Zap, text: "Lightning-Fast Search" },
    { icon: Heart, text: "Loved by 10K+ Teams" }
  ];

  return (
    <section className="relative py-32 cosmic-bg overflow-hidden">
      {/* Portal Background Effect */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        >
          <div className="w-full h-full border-4 border-glass-primary/20 rounded-full">
            <div className="w-3/4 h-3/4 border-2 border-glass-secondary/30 rounded-full m-auto mt-16">
              <div className="w-2/3 h-2/3 border border-glass-accent/40 rounded-full m-auto mt-12" />
            </div>
          </div>
        </motion.div>

        {/* Swirling Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [
                Math.cos(i * 30 * Math.PI / 180) * 200,
                Math.cos((i * 30 + 360) * Math.PI / 180) * 200,
              ],
              y: [
                Math.sin(i * 30 * Math.PI / 180) * 200,
                Math.sin((i * 30 + 360) * Math.PI / 180) * 200,
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
            className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-cosmic rounded-full blur-sm"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8 mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Rocket className="w-8 h-8 text-primary animate-energy-pulse" />
            <h2 className="text-stellar gradient-text">Ready to Expand Your Universe?</h2>
            <Sparkles className="w-8 h-8 text-accent animate-holo-shift" />
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Join thousands of teams who have transformed their knowledge-sharing experience.
            <br />
            <span className="gradient-text font-semibold">Your journey into the future of collaboration starts now.</span>
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.text}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card p-6 group cursor-default"
            >
              <benefit.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-sm font-medium text-foreground">{benefit.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-8"
        >
          <div className="glass-card p-12 relative overflow-hidden group max-w-2xl mx-auto">
            {/* Animated Background Glow */}
            <motion.div
              animate={{ 
                background: [
                  'radial-gradient(circle, hsl(var(--holo-pink) / 0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, hsl(var(--holo-blue) / 0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, hsl(var(--holo-purple) / 0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, hsl(var(--holo-cyan) / 0.1) 0%, transparent 70%)',
                  'radial-gradient(circle, hsl(var(--holo-pink) / 0.1) 0%, transparent 70%)',
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute inset-0"
            />

            <div className="relative z-10 space-y-6">
              <h3 className="text-3xl font-bold gradient-text">
                Start Your Knowledge Revolution
              </h3>
              <p className="text-lg text-muted-foreground">
                Sign up with Google and create your first knowledge universe in under 60 seconds.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <HolographicButton 
                  variant="hero" 
                  onClick={handleGoogleAuth}
                  className="text-xl px-10 py-5"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                  <ArrowRight className="w-6 h-6" />
                </HolographicButton>
              </div>

              <p className="text-sm text-muted-foreground">
                Free forever • No credit card required • Join 10,000+ teams
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-8 text-muted-foreground text-sm"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              <span>Enterprise Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-accent" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              <span>SOC2 Compliant</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};