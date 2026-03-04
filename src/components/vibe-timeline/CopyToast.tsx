"use client";

import { CopyToastProps } from "@/types/vibe";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export function CopyToast({ show, message = "Copied to clipboard ✓" }: CopyToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-pure-black text-pure-white px-4 py-2 text-sm font-medium"
        >
          <Check className="w-4 h-4" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
