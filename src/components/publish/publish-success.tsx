"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PartyPopper } from "lucide-react";

export function PublishSuccess({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="flex flex-col items-center gap-3 rounded-3xl bg-card px-10 py-10 text-center shadow-elevated"
          >
            <motion.span
              animate={{ rotate: [0, -10, 10, -6, 6, 0] }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-coral shadow-glow"
            >
              <PartyPopper className="h-7 w-7 text-coral-foreground" />
            </motion.span>
            <h2 className="text-xl font-bold tracking-tight">🎉 ¡Publicado!</h2>
            <p className="max-w-xs text-sm text-muted-foreground">
              Tu publicación ya está disponible para MiTribu.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
