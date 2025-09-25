import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { ReactNode } from "react";

interface GoogleSignInButtonProps {
  children?: ReactNode;
  className?: string;
}

export const GoogleSignInButton = ({ children, className }: GoogleSignInButtonProps) => {
  const handleClick = () => signIn("google");

  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className={cn("group relative inline-flex rounded-2xl p-[2px] overflow-hidden", className)}
    >
      {/* Subtle blue→purple border glow */}
      <span className="absolute inset-0 bg-gradient-to-br from-blue-500/70 via-indigo-500/60 to-purple-600/70 opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
      {/* Soft outer glow */}
      <span className="absolute -inset-2 bg-blue-500/0 group-hover:bg-blue-500/5 rounded-[22px] blur-xl transition-colors duration-300" />

      {/* Inner button */}
      <span className="relative z-10 inline-flex items-center gap-3 px-6 py-3 rounded-[14px] bg-slate-900/70 backdrop-blur-md text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.35)]">
        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.2-.9 2.3-1.9 3.1l3.1 2.4c1.8-1.7 2.9-4.1 2.9-7.1 0-.7-.1-1.3-.2-1.9H12z"/>
          <path fill="#34A853" d="M12 22c2.6 0 4.7-.9 6.3-2.4l-3.1-2.4c-.9.6-2 .9-3.2.9-2.5 0-4.6-1.7-5.4-3.9H3.4v2.5C5 19.9 8.2 22 12 22z"/>
          <path fill="#FBBC05" d="M6.6 14.2c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V7.9H3.4C2.7 9.3 2.3 10.9 2.3 12.3s.4 3 1.1 4.4l3.2-2.5z"/>
          <path fill="#4285F4" d="M12 5.5c1.4 0 2.6.5 3.6 1.4l2.7-2.7C16.8 2.6 14.6 1.8 12 1.8 8.2 1.8 5 3.9 3.4 7l3.2 2.5C7.4 7.4 9.5 5.5 12 5.5z"/>
        </svg>
        <span className="tracking-wide">{children ?? "Continue with Google"}</span>
        {/* Soft shine on hover */}
        <motion.span
          initial={{ x: "-120%", opacity: 0 }}
          whileHover={{ x: "120%", opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/15 -skew-x-12 rounded-[14px]"
        />
      </span>
    </motion.button>
  );
};


