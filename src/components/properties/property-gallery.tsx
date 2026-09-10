"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  function next() {
    setIndex((i) => (i + 1) % images.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl sm:h-[420px]">
        <button
          type="button"
          onClick={() => { setIndex(0); setLightbox(true); }}
          className="relative col-span-4 row-span-2 h-64 overflow-hidden sm:col-span-2 sm:row-span-2 sm:h-full"
        >
          <Image src={images[0]} alt={title} fill sizes="(max-width: 640px) 100vw, 50vw" priority className="object-cover transition-transform duration-500 hover:scale-105" />
        </button>
        {images.slice(1, 5).map((img, i) => (
          <button
            key={img + i}
            type="button"
            onClick={() => { setIndex(i + 1); setLightbox(true); }}
            className="relative hidden h-full overflow-hidden sm:block"
          >
            <Image src={img} alt="" fill sizes="25vw" className="object-cover transition-transform duration-500 hover:scale-105" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
          >
            <button
              onClick={() => setLightbox(false)}
              aria-label="Cerrar galería"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={prev}
              aria-label="Imagen anterior"
              className="absolute left-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="relative h-[70vh] w-full max-w-3xl">
              <Image src={images[index]} alt={title} fill sizes="90vw" className="object-contain" />
            </div>
            <button
              onClick={next}
              aria-label="Siguiente imagen"
              className="absolute right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-6 flex gap-1.5">
              {images.map((_, i) => (
                <span key={i} className={cn("h-1.5 w-1.5 rounded-full", i === index ? "bg-white" : "bg-white/30")} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
