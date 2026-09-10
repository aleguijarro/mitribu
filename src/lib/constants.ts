import type { LucideIcon } from "lucide-react";
import {
  Home,
  Search,
  ShoppingBag,
  Users,
  MessageCircle,
  LifeBuoy,
  PlusCircle,
  User,
  BookOpen,
  Laptop,
  Bike,
  Shirt,
  Sofa,
  Refrigerator,
  Palette,
  Package,
  Building2,
  BedDouble,
  GraduationCap,
} from "lucide-react";

/**
 * Configuración global del sitio. Cambia aquí el nombre, el eslogan
 * o los enlaces sociales y se propagará por toda la aplicación
 * (navbar, footer, metadatos SEO, onboarding...).
 */
export const siteConfig = {
  name: "MiTribu",
  tagline: "Tu gente. Tu ciudad. Tu tribu.",
  description:
    "MiTribu conecta a estudiantes para encontrar piso, comprar y vender cosas y descubrir gente cerca de ti.",
  url: "https://mitribu.app",
  social: {
    instagram: "https://instagram.com/mitribu",
    tiktok: "https://tiktok.com/@mitribu",
    x: "https://x.com/mitribu",
  },
};

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/** Navegación principal de escritorio. */
export const mainNav: NavItem[] = [
  { label: "Explorar", href: "/inicio", icon: Search },
  { label: "Pisos", href: "/pisos", icon: Home },
  { label: "Marketplace", href: "/marketplace", icon: ShoppingBag },
  { label: "Comunidad", href: "/comunidad", icon: Users },
  { label: "Mensajes", href: "/mensajes", icon: MessageCircle },
  { label: "Soporte", href: "/soporte", icon: LifeBuoy },
];

/** Navegación inferior de móvil (estilo app nativa). */
export const bottomNav: NavItem[] = [
  { label: "Inicio", href: "/inicio", icon: Home },
  { label: "Explorar", href: "/pisos", icon: Search },
  { label: "Publicar", href: "/publicar", icon: PlusCircle },
  { label: "Mensajes", href: "/mensajes", icon: MessageCircle },
  { label: "Perfil", href: "/perfil", icon: User },
];

export interface QuickFilter {
  id: string;
  label: string;
  emoji: string;
  href: string;
}

/** Filtros rápidos que aparecen bajo el buscador del Home. */
export const quickFilters: QuickFilter[] = [
  { id: "pisos", label: "Pisos", emoji: "🏠", href: "/pisos" },
  { id: "habitaciones", label: "Habitaciones", emoji: "🛏️", href: "/pisos?tipo=habitacion" },
  { id: "muebles", label: "Muebles", emoji: "🛋️", href: "/marketplace?categoria=muebles" },
  { id: "libros", label: "Libros", emoji: "📚", href: "/marketplace?categoria=libros" },
  { id: "tecnologia", label: "Tecnología", emoji: "💻", href: "/marketplace?categoria=tecnologia" },
  { id: "otros", label: "Otros", emoji: "🎒", href: "/marketplace?categoria=otros" },
];

export interface CategoryDef {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const productCategories: CategoryDef[] = [
  { id: "libros", label: "Libros y apuntes", icon: BookOpen },
  { id: "tecnologia", label: "Tecnología", icon: Laptop },
  { id: "muebles", label: "Muebles", icon: Sofa },
  { id: "bicicletas", label: "Bicicletas", icon: Bike },
  { id: "ropa", label: "Ropa", icon: Shirt },
  { id: "apuntes", label: "Apuntes", icon: BookOpen },
  { id: "electrodomesticos", label: "Electrodomésticos", icon: Refrigerator },
  { id: "decoracion", label: "Decoración", icon: Palette },
  { id: "otros", label: "Otros", icon: Package },
];

export const propertyTypes: CategoryDef[] = [
  { id: "habitacion", label: "Habitación privada", icon: BedDouble },
  { id: "piso-completo", label: "Piso completo", icon: Home },
  { id: "estudio", label: "Estudio", icon: Building2 },
  { id: "residencia", label: "Residencia de estudiantes", icon: GraduationCap },
];

export const conditionLabels: Record<string, string> = {
  nuevo: "Nuevo",
  "como-nuevo": "Como nuevo",
  "buen-estado": "Buen estado",
  aceptable: "Aceptable",
};

export const cities = [
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Granada",
  "Salamanca",
  "Bilbao",
  "Málaga",
  "Zaragoza",
  "Valladolid",
];

export const universities = [
  "Universidad Complutense de Madrid",
  "Universidad Politécnica de Madrid",
  "Universidad Autónoma de Madrid",
  "Universidad de Barcelona",
  "Universitat Pompeu Fabra",
  "Universidad de Valencia",
  "Universidad de Sevilla",
  "Universidad de Granada",
  "Universidad de Salamanca",
  "Universidad del País Vasco",
];

export const amenitiesList = [
  "Wifi de alta velocidad",
  "Calefacción",
  "Aire acondicionado",
  "Lavadora",
  "Cocina equipada",
  "Ascensor",
  "Terraza",
  "Balcón",
  "Escritorio",
  "Armario",
  "Cerradura en la habitación",
  "Zona de estudio común",
  "Portero automático",
  "Se admiten mascotas",
];

export const interestOptions: { id: string; label: string; emoji: string }[] = [
  { id: "alojamiento", label: "Encontrar alojamiento", emoji: "🏠" },
  { id: "comprar-vender", label: "Comprar/vender", emoji: "🛍️" },
  { id: "conocer-gente", label: "Conocer estudiantes", emoji: "👥" },
  { id: "vida-universitaria", label: "Vida universitaria", emoji: "📚" },
];

export const scamSafetyTips = [
  "Nunca pagues una reserva o señal antes de ver el piso en persona o por videollamada.",
  "Desconfía de propietarios que solo se comunican por WhatsApp y evitan las llamadas.",
  "Usa siempre la mensajería de MiTribu hasta estar seguro: queda constancia de la conversación.",
  "Si un precio parece demasiado bueno para ser verdad, probablemente lo sea.",
  "Comprueba las valoraciones y la antigüedad del perfil antes de cerrar un trato.",
];
