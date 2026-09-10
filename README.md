# MiTribu 🎓🏠

> "Tu gente. Tu ciudad. Tu tribu."

MiTribu es una plataforma social para estudiantes que combina en un único producto:

- 🏠 Marketplace de propiedades/alojamiento (estilo Airbnb, orientado a estudiantes)
- 🛍️ Marketplace de productos entre estudiantes (libros, muebles, tecnología...)
- 👥 Comunidad / red social
- 💬 Mensajería tipo chat
- 🔔 Notificaciones
- 👤 Perfiles con reputación y valoraciones
- 🆘 Centro de ayuda / soporte

Este repositorio contiene el **frontend completo y navegable** de MiTribu: toda la interfaz,
la arquitectura de componentes y datos de ejemplo realistas, listo para conectar un backend
real más adelante (autenticación, base de datos, pagos...).

---

## 1. Stack técnico

| Capa            | Tecnología                                              |
| ---------------- | -------------------------------------------------------- |
| Framework         | [Next.js 15](https://nextjs.org) (App Router) + React 19 |
| Lenguaje          | TypeScript                                                |
| Estilos           | Tailwind CSS 3 + tokens de diseño en CSS variables        |
| Componentes UI    | Componentes propios estilo shadcn/ui sobre Radix UI       |
| Iconos            | [lucide-react](https://lucide.dev)                        |
| Animaciones       | [Framer Motion](https://www.framer.com/motion/)           |
| Dark mode         | [next-themes](https://github.com/pacocoursey/next-themes) |
| Estado            | React Context + `localStorage` (sin backend todavía)      |

No hay backend ni base de datos conectados: toda la app funciona con **datos de ejemplo
realistas** (`src/data`) y persiste la interacción del usuario (favoritos, mensajes nuevos,
publicaciones, perfil editado...) en `localStorage`, para que la experiencia se sienta
completa incluso sin servidor.

---

## 2. Instalación y ejecución

Requisitos: Node.js 18.18 o superior (recomendado 20+) y npm.

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar en modo desarrollo
npm run dev
# → http://localhost:3000

# 3. Compilar para producción
npm run build
npm run start

# 4. Comprobar tipos y estilo de código
npx tsc --noEmit
npm run lint
```

---

## 3. Estructura del proyecto

```
src/
  app/                     → Rutas (App Router de Next.js)
    page.tsx               → Landing page pública
    (auth)/                → Login, registro y onboarding (sin navegación de app)
    (app)/                 → Toda la aplicación autenticada (con Navbar/BottomNav)
      inicio/               → Dashboard / Home
      pisos/                → Explorar pisos + detalle ([id])
      marketplace/          → Marketplace + detalle ([id])
      comunidad/            → Feed social
      mensajes/             → Mensajería (lista + conversación)
      perfil/               → Perfil propio, edición y perfil de otros usuarios ([username])
      favoritos/            → Guardados
      notificaciones/       → Notificaciones
      publicar/             → Publicar propiedad o producto
      soporte/              → Centro de ayuda
      buscar/               → Búsqueda global (pisos + marketplace)
  components/
    ui/                     → Primitivas reutilizables (Button, Card, Dialog, Select...)
    layout/                 → Navbar, bottom nav, footer, menús
    properties/              → PropertyCard, filtros, galería, mapa...
    marketplace/              → ProductCard, filtros, oferta...
    community/                → PostCard, composer...
    chat/                      → Lista de conversaciones, burbujas, ventana de chat
    profile/                   → Cabecera y tabs de perfil
    publish/                   → Subida de fotos, animación de éxito
    landing/                   → Secciones de la landing page
    shared/                    → SearchBar, Rating, SaveButton, EmptyState...
  context/                  → Estado global (favoritos, auth, chat, comunidad, listings...)
  hooks/                    → Hooks reutilizables (localStorage, scroll infinito...)
  lib/                      → Utilidades, constantes centralizadas, formateadores
  data/                     → Datos de ejemplo (usuarios, propiedades, productos...)
  types/                    → Tipos TypeScript compartidos
```

---

## 4. Cómo modificar la identidad visual

### Colores

Todo el sistema de color vive en **`src/app/globals.css`**, como variables CSS en formato
HSL dentro de `:root` (modo claro) y `.dark` (modo oscuro):

```css
:root {
  --primary: 152 64% 36%;   /* verde "tribu": color principal de marca */
  --coral: 8 88% 61%;       /* coral cálido: likes, alertas suaves */
  --background: 32 38% 97%; /* fondo cálido, no blanco puro */
  ...
}
```

Cambia estos valores y toda la aplicación (botones, badges, enlaces, gradientes) se actualiza
sola, porque `tailwind.config.ts` mapea las clases de Tailwind (`bg-primary`, `text-coral`...)
a estas variables.

### Tipografía

La fuente (**Plus Jakarta Sans**) se define una sola vez en `src/app/layout.tsx` usando
`next/font/google`. Para cambiarla, sustituye el import y el nombre de la fuente ahí.

### Textos y microcopy

Los textos de marca (nombre, eslogan, descripción, redes sociales) están centralizados en
**`src/lib/constants.ts`**, en el objeto `siteConfig`. El resto de textos viven directamente
en cada componente/página para que sean fáciles de encontrar y editar con buscar-y-reemplazar.

---

## 5. Cómo añadir o editar datos de ejemplo

Todos los datos mock están en **`src/data/`**, tipados con TypeScript (`src/types/index.ts`),
así que el editor te avisará si falta algún campo.

### Añadir una propiedad

Edita `src/data/properties.ts` y añade un nuevo objeto al array `properties` siguiendo la
forma del tipo `Property`. Usa `hostId` con el `id` de un usuario existente en
`src/data/users.ts` (o añade uno nuevo).

### Añadir un producto

Edita `src/data/products.ts` y añade un objeto al array `products` (tipo `Product`). Puedes
reutilizar categorías existentes o añadir una nueva en `src/lib/constants.ts` →
`productCategories`.

### Añadir categorías, ciudades o universidades

Todo esto está centralizado en **`src/lib/constants.ts`**:

- `productCategories` → categorías del Marketplace
- `propertyTypes` → tipos de alojamiento
- `cities` / `universities` → listas usadas en filtros, onboarding y formularios
- `amenitiesList` → extras/servicios de una propiedad

### Imágenes

Las imágenes de ejemplo se sirven desde Unsplash a través de helpers en
`src/data/images.ts` (`interiorPhoto()`, `productPhoto()`, `avatarPhoto()`...). Añade nuevos
IDs de foto de Unsplash a los arrays correspondientes para variar el banco de imágenes.

---

## 6. Publicaciones, favoritos y mensajes del usuario

Como todavía no hay backend, las acciones del usuario (publicar un anuncio, dar like,
guardar en favoritos, enviar un mensaje, comentar...) se guardan en `localStorage` a través
de los contextos en `src/context/`:

- `FavoritesProvider` → favoritos (pisos, productos, publicaciones)
- `ListingsProvider` → propiedades/productos publicados por el usuario
- `ChatProvider` → conversaciones y mensajes nuevos
- `CommunityProvider` → likes, comentarios y publicaciones nuevas en Comunidad
- `NotificationsProvider` → estado de leído/no leído
- `AuthProvider` → sesión simulada y datos del onboarding

Cada contexto expone una API sencilla (`addProperty()`, `toggleFavorite()`, `sendMessage()`...)
pensada para sustituirse por llamadas `fetch`/`server actions` a una API real sin tener que
tocar los componentes que los consumen.

---

## 7. Conectar un backend real

El frontend está preparado para evolucionar hacia una aplicación con backend real. Pasos
recomendados:

1. **Base de datos**: define tablas/colecciones equivalentes a los tipos de `src/types/index.ts`
   (`User`, `Property`, `Product`, `CommunityPost`, `Conversation`, `Message`,
   `AppNotification`, `Review`).
2. **API**: sustituye los ficheros de `src/data/*.ts` por funciones que llamen a tu API
   (puedes mantener exactamente los mismos nombres de función —`getPropertyById`,
   `getUserById`...— para minimizar los cambios en el resto del código).
3. **Autenticación**: sustituye `AuthProvider` (`src/context/auth-context.tsx`) por tu
   proveedor real (NextAuth, Clerk, Supabase Auth...). La interfaz (`login`, `logout`,
   `isAuthenticated`) puede mantenerse igual.
4. **Contextos → Server State**: sustituye la lógica de `localStorage` dentro de cada
   contexto por mutaciones a tu API (idealmente con React Query o Server Actions de Next.js),
   manteniendo la misma forma de los hooks (`useFavorites`, `useChat`, `useCommunity`...) para
   no tener que reescribir la UI.
5. **Subida de imágenes**: `src/components/publish/photo-upload.tsx` ya genera
   previsualizaciones locales; solo falta conectar un endpoint de subida (S3, Cloudinary,
   Vercel Blob...) y sustituir las fotos de muestra por las URLs reales al publicar.
6. **Pagos**: si en el futuro se cobran comisiones o servicios premium, Stripe es la
   integración más directa con Next.js (Stripe Checkout + webhooks).
7. **Mapas reales**: `src/components/properties/map-placeholder.tsx` es un mapa estático de
   sustitución; cámbialo por Mapbox GL o el SDK de Google Maps cuando tengas las API keys.

---

## 8. Despliegue

La forma más sencilla es [Vercel](https://vercel.com) (creadores de Next.js):

1. Sube este proyecto a un repositorio de GitHub/GitLab.
2. Importa el repositorio en Vercel.
3. Vercel detecta Next.js automáticamente — no hace falta configuración adicional.
4. Cada `push` a `main` genera un despliegue en producción automáticamente.

También puedes desplegarlo en cualquier plataforma compatible con Node.js (Render, Railway,
un VPS con `npm run build && npm run start`, Docker...).

---

## 9. Calidad y accesibilidad

- HTML semántico, `aria-label` en botones de icono, estados de foco visibles y navegación
  por teclado en todos los componentes interactivos (basados en Radix UI).
- Modo oscuro completo (toggle ☀️/🌙 en la barra de navegación), con paleta ajustada para
  mantener buen contraste.
- Diseño mobile-first: navegación inferior tipo app en móvil, barra superior completa en
  escritorio, cuadrículas que se adaptan de 2 a 5 columnas según el ancho de pantalla.
- Estados de carga (`skeleton`), estados vacíos y confirmaciones visuales (toasts) en las
  acciones principales: guardar, publicar, enviar mensaje, hacer oferta...

---

## 10. Roadmap sugerido

- [ ] Autenticación real (NextAuth / Clerk / Supabase)
- [ ] Backend + base de datos (Postgres/Supabase, Prisma como ORM)
- [ ] Subida de imágenes real
- [ ] Mapa interactivo real (Mapbox/Google Maps)
- [ ] Notificaciones push / email
- [ ] Panel de moderación para reportes
- [ ] Pagos y verificación de identidad
