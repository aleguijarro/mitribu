"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { properties as mockProperties } from "@/data/properties";
import { products as mockProducts } from "@/data/products";
import { currentUserId } from "@/data/current-user";
import type { Product, Property } from "@/types";

type NewPropertyInput = Omit<
  Property,
  "id" | "hostId" | "rating" | "reviewCount" | "verified" | "createdAt" | "currency" | "lat" | "lng"
>;

type NewProductInput = Omit<Product, "id" | "sellerId" | "createdAt" | "currency">;

interface ListingsContextValue {
  properties: Property[];
  products: Product[];
  addProperty: (input: NewPropertyInput) => Property;
  addProduct: (input: NewProductInput) => Product;
}

interface ListingsState {
  extraProperties: Property[];
  extraProducts: Product[];
}

const initialState: ListingsState = { extraProperties: [], extraProducts: [] };

const ListingsContext = createContext<ListingsContextValue | null>(null);

/**
 * Publicaciones creadas por el usuario desde "+ Publicar". Se guardan en
 * localStorage y se anteponen a los datos mock, para que un anuncio
 * recién publicado aparezca de inmediato en Pisos/Marketplace.
 */
export function ListingsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<ListingsState>("mitribu:listings", initialState);

  const value = useMemo<ListingsContextValue>(() => {
    const properties = [...state.extraProperties, ...mockProperties];
    const products = [...state.extraProducts, ...mockProducts];

    const addProperty = (input: NewPropertyInput): Property => {
      const property: Property = {
        ...input,
        id: `local-p-${Date.now()}`,
        currency: "€",
        hostId: currentUserId,
        lat: 40.4168,
        lng: -3.7038,
        rating: 0,
        reviewCount: 0,
        verified: false,
        createdAt: new Date().toISOString(),
      };
      setState((prev) => ({ ...prev, extraProperties: [property, ...prev.extraProperties] }));
      return property;
    };

    const addProduct = (input: NewProductInput): Product => {
      const product: Product = {
        ...input,
        id: `local-m-${Date.now()}`,
        currency: "€",
        sellerId: currentUserId,
        createdAt: new Date().toISOString(),
      };
      setState((prev) => ({ ...prev, extraProducts: [product, ...prev.extraProducts] }));
      return product;
    };

    return { properties, products, addProperty, addProduct };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return <ListingsContext.Provider value={value}>{children}</ListingsContext.Provider>;
}

export function useListings() {
  const ctx = useContext(ListingsContext);
  if (!ctx) throw new Error("useListings debe usarse dentro de <ListingsProvider>");
  return ctx;
}
