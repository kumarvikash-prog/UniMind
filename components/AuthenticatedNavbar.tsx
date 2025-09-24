import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { 
  Home, 
  Users, 
  Clock, 
  BarChart3, 
  FolderOpen, 
  Menu, 
  X,
  LogOut,
  User,
  Settings
} from "lucide-react";

interface AuthenticatedNavbarProps {
  currentPage?: string;
}

export const AuthenticatedNavbar = ({ currentPage }: AuthenticatedNavbarProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Workspace", href: "/workspace", icon: Home },
    { name: "Contributions", href: "/contributions", icon: Users },
    { name: "Tasks", href: "/tasks", icon: Clock },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Hub", href: "/hub", icon: FolderOpen },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const NavLink = ({ item, isMobile = false }: { item: any; isMobile?: boolean }) => {
    const isActive = currentPage === item.name.toLowerCase() || 
                    (item.href === "/workspace" && router.pathname === "/workspace");
    
    return (
      <motion.button
        onClick={() => {
          router.push(item.href);
          if (isMobile) setIsMobileMenuOpen(false);
        }}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
          isActive 
            ? "bg-white/20 text-white" 
            : "text-gray-300 hover:text-white hover:bg-white/10"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <item.icon className="w-4 h-4" />
        <span className="font-medium">{item.name}</span>
      </motion.button>
    );
  };

  return (
    <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            onClick={() => router.push("/workspace")}
            className="flex items-center space-x-2 text-white font-bold text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span>UniMind</span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Desktop User Menu */}
            <div className="hidden md:block relative">
              <motion.button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <span className="text-white text-sm font-medium">{session?.user?.name}</span>
              </motion.button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 glass-card rounded-lg shadow-lg py-2"
                >
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      router.push("/profile");
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      router.push("/settings");
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <hr className="my-2 border-white/10" />
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 py-4"
          >
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <NavLink key={item.name} item={item} isMobile={true} />
              ))}
            </div>
            
            {/* Mobile User Info */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
                <div>
                  <p className="text-white font-medium">{session?.user?.name}</p>
                  <p className="text-gray-400 text-sm">{session?.user?.email}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("/profile");
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-left text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("/settings");
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-left text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </nav>
  );
};
