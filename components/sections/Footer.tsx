import { motion } from "framer-motion";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  Sparkles,
  Brain,
  Zap,
  Heart
} from "lucide-react";

export const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  const navSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Security", href: "#security" },
        { name: "Integrations", href: "#integrations" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#about" },
        { name: "Blog", href: "#blog" },
        { name: "Careers", href: "#careers" },
        { name: "Contact", href: "#contact" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#docs" },
        { name: "API Reference", href: "#api" },
        { name: "Community", href: "#community" },
        { name: "Support", href: "#support" },
      ]
    }
  ];

  return (
    <footer className="relative py-20 cosmic-bg border-t border-glass-primary/20">
      {/* Constellation Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-1 h-1 bg-glass-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="space-y-6">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-cosmic rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                  <div className="relative w-12 h-12 glass rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold gradient-text">UniMind</h3>
              </motion.div>

              <p className="text-muted-foreground leading-relaxed">
                Transforming how teams create, share, and build upon knowledge.
                Welcome to the future of collaborative intelligence.
              </p>

              {/* Social Links as Floating Planets */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ 
                      scale: 1.2, 
                      y: -3,
                      rotate: [0, -10, 10, 0]
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-cosmic rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                    <div className="relative w-10 h-10 glass rounded-full flex items-center justify-center border border-glass-primary/30 group-hover:border-glass-primary/60 transition-colors duration-300">
                      <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Navigation Sections */}
          {navSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + sectionIndex * 0.1 }}
              className="space-y-6"
            >
              <h4 className="text-lg font-semibold gradient-text">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.2 + sectionIndex * 0.1 + linkIndex * 0.05 
                    }}
                  >
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5, color: "hsl(var(--primary))" }}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center gap-2 group"
                    >
                      <span>{link.name}</span>
                      <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-8 mb-12 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-cosmic opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
          
          <div className="relative z-10 text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Zap className="w-6 h-6 text-primary animate-energy-pulse" />
              <h3 className="text-xl font-bold gradient-text">Stay in the Loop</h3>
              <Sparkles className="w-6 h-6 text-accent animate-holo-shift" />
            </div>
            
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get the latest updates on features, insights on collaborative intelligence, 
              and exclusive access to new dimensions of knowledge sharing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 w-full sm:w-auto px-4 py-3 bg-glass-background/50 border border-glass-primary/30 rounded-lg focus:outline-none focus:border-glass-primary/60 text-foreground placeholder-muted-foreground backdrop-blur-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button px-6 py-3 font-medium whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-8 border-t border-glass-primary/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>© 2024 UniMind. Crafted with</span>
              <Heart className="w-4 h-4 text-accent animate-pulse" />
              <span>for the future of knowledge.</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <motion.a
                href="#privacy"
                whileHover={{ color: "hsl(var(--primary))" }}
                className="hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#terms"
                whileHover={{ color: "hsl(var(--primary))" }}
                className="hover:text-primary transition-colors duration-300"
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#cookies"
                whileHover={{ color: "hsl(var(--primary))" }}
                className="hover:text-primary transition-colors duration-300"
              >
                Cookie Policy
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};