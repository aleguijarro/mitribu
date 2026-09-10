import { MapPin } from "lucide-react";

interface MapPlaceholderProps {
  lat: number;
  lng: number;
  neighborhood: string;
  city: string;
}

/**
 * Mapa estático simplificado (sin dependencias de terceros ni API keys).
 * El enlace abre la ubicación real en Google Maps. Sustituye este
 * componente por un mapa interactivo (Mapbox/Google Maps) cuando
 * conectes claves de API en el backend.
 */
export function MapPlaceholder({ lat, lng, neighborhood, city }: MapPlaceholderProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noreferrer"
      className="group relative flex h-56 w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-[radial-gradient(circle_at_1px_1px,hsl(var(--border))_1px,transparent_0)] [background-size:18px_18px] transition-colors hover:bg-surface-hover"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
      <div className="relative flex flex-col items-center gap-2 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-tribu-gradient text-primary-foreground shadow-glow transition-transform group-hover:scale-110">
          <MapPin className="h-5 w-5" />
        </span>
        <p className="text-sm font-semibold">{neighborhood}, {city}</p>
        <p className="text-xs text-muted-foreground">Ver ubicación aproximada en el mapa</p>
      </div>
    </a>
  );
}
