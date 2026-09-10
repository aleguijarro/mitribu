"use client";

import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoUploadProps {
  onChange?: (count: number) => void;
  max?: number;
}

/**
 * Selector de fotos. Genera previsualizaciones reales en el navegador
 * (URL.createObjectURL) para que la experiencia de "subir fotos" se
 * sienta completa. Como todavía no hay backend de almacenamiento, la
 * publicación final usa fotos de muestra acordes a la categoría elegida
 * (ver README → "Conectar un backend").
 */
export function PhotoUpload({ onChange, max = 6 }: PhotoUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const next = Array.from(files)
      .slice(0, max - previews.length)
      .map((f) => URL.createObjectURL(f));
    const updated = [...previews, ...next].slice(0, max);
    setPreviews(updated);
    onChange?.(updated.length);
  }

  function removeAt(i: number) {
    const updated = previews.filter((_, idx) => idx !== i);
    setPreviews(updated);
    onChange?.(updated.length);
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {previews.map((src, i) => (
          <div key={src} className="relative aspect-square overflow-hidden rounded-xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element -- previsualización local vía blob URL, next/image no puede optimizarla */}
            <img src={src} alt={`Foto ${i + 1}`} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeAt(i)}
              aria-label="Eliminar foto"
              className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 text-white transition-colors hover:bg-black/80"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            {i === 0 && (
              <span className="absolute bottom-1.5 left-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-foreground">
                Portada
              </span>
            )}
          </div>
        ))}
        {previews.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            )}
          >
            <ImagePlus className="h-5 w-5" />
            <span className="text-[11px] font-medium">Añadir foto</span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <p className="mt-2 text-xs text-muted-foreground">{previews.length}/{max} fotos · La primera será la portada.</p>
    </div>
  );
}
