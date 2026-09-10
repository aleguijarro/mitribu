/**
 * Tipos centrales de MiTribu.
 *
 * Estos tipos describen la forma de los datos tal y como los consume
 * la interfaz. Hoy los rellenan los ficheros de `src/data`, pero están
 * pensados para mapear 1:1 con lo que devolvería una API/BBDD real
 * más adelante (ver README → "Conectar un backend").
 */

export type Interest =
  | "alojamiento"
  | "comprar-vender"
  | "conocer-gente"
  | "vida-universitaria";

export interface University {
  id: string;
  name: string;
  city: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  coverUrl?: string;
  bio?: string;
  city: string;
  university?: string;
  degree?: string;
  year?: string;
  memberSince: string; // ISO date
  rating: number;
  reviewCount: number;
  verified: boolean;
  emailVerified: boolean;
  responseRate?: number;
  responseTime?: string;
  interests?: Interest[];
}

export type PropertyType =
  | "habitacion"
  | "piso-completo"
  | "estudio"
  | "residencia";

export interface Property {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  currency: "€";
  city: string;
  neighborhood: string;
  address?: string;
  lat: number;
  lng: number;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  size: number; // m2
  furnished: boolean;
  billsIncluded: boolean;
  availableFrom: string; // ISO date
  minStay: string; // e.g. "3 meses"
  distanceToUniversity: number; // minutos caminando/transporte
  nearestUniversity: string;
  petsAllowed: boolean;
  genderPreference?: "sin-preferencia" | "chicas" | "chicos";
  amenities: string[];
  hostId: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  featured?: boolean;
  createdAt: string;
}

export type ProductCondition =
  | "nuevo"
  | "como-nuevo"
  | "buen-estado"
  | "aceptable";

export type ProductCategory =
  | "libros"
  | "muebles"
  | "tecnologia"
  | "bicicletas"
  | "ropa"
  | "apuntes"
  | "electrodomesticos"
  | "decoracion"
  | "otros";

export interface Product {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  currency: "€";
  negotiable: boolean;
  condition: ProductCondition;
  category: ProductCategory;
  city: string;
  sellerId: string;
  createdAt: string;
  tags: string[];
  sold?: boolean;
}

export interface Comment {
  id: string;
  authorId: string;
  text: string;
  createdAt: string;
  likes: number;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  text: string;
  imageUrl?: string;
  tag?: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  sharesCount: number;
}

export type MessageAttachmentType = "property" | "product" | "image" | "offer";

export interface MessageAttachment {
  type: MessageAttachmentType;
  refId?: string; // id de propiedad/producto
  imageUrl?: string;
  offerAmount?: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text?: string;
  attachment?: MessageAttachment;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[]; // [currentUser, otherUser]
  messages: Message[];
  updatedAt: string;
  pinned?: boolean;
}

export type NotificationType =
  | "like"
  | "comment"
  | "message"
  | "match-property"
  | "offer"
  | "review"
  | "system";

export interface AppNotification {
  id: string;
  type: NotificationType;
  actorId?: string;
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
  href?: string;
  icon?: string;
}

export interface Review {
  id: string;
  authorId: string;
  targetId: string; // userId being reviewed
  rating: number;
  text: string;
  createdAt: string;
  context: "propiedad" | "producto" | "convivencia";
}

export type FavoriteKind = "property" | "product" | "post";

export interface FavoriteItem {
  id: string;
  kind: FavoriteKind;
}

export interface SupportCategory {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
