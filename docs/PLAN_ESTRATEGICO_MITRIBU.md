# MiTribu — Product & Go-To-Market Strategy

**Fecha:** septiembre de 2026
**Autor:** Auditoría y estrategia elaborada por Claude Code sobre el repositorio real `aleguijarro/mitribu` (commit `f61fc52`, "Initial commit: MiTribu web app", 11 sept. 2026).
**Método:** el repositorio se clonó, se instaló (`npm install`), se ejecutó en local (`npm run dev`) y se navegaron/capturaron las 22 rutas de la aplicación en escritorio y móvil. El código de cada área (contextos, componentes, datos mock) se leyó línea a línea para las afirmaciones técnicas. La investigación de mercado usa fuentes públicas de 2024-2026, citadas en cada sección y recopiladas en el Apéndice.

Leyenda usada en todo el documento:
- 🟦 **FACT** — verificado en el código del repositorio o en una fuente citada.
- 🟨 **INFERENCE** — conclusión razonable a partir de varios datos, no verificada directamente.
- 🟩 **RECOMMENDATION** — lo que yo recomiendo hacer, no un hecho.

---

## Executive Summary

MiTribu es, hoy, **un prototipo de frontend extremadamente pulido y sin producto detrás**. 🟦 No existe backend, base de datos, autenticación real ni una sola API route (`find src/app -iname api` no devuelve nada); todo el estado —sesión, publicaciones, favoritos, mensajes— vive en `localStorage` del navegador, contexto por contexto (`src/context/*.tsx`). Esto significa que, tal y como está, **dos personas distintas usando MiTribu en dos dispositivos distintos no pueden verse, mensajearse ni transaccionar entre sí**. No es un MVP recortado: es una maqueta interactiva de un producto completo, construida en un solo commit.

Al mismo tiempo, el trabajo de diseño es real y de buen nivel: sistema de tokens de color coherente, modo oscuro completo, 22 pantallas navegables, componentes accesibles basados en Radix UI, y un modelo de datos (`src/types/index.ts`) suficientemente maduro como para mapear 1:1 con un backend real el día que exista. El README del propio repositorio ya lo reconoce: es "el frontend completo y navegable", pensado para conectar un backend "más adelante".

El problema estratégico no es de calidad de ejecución, es de **disciplina de alcance**. El producto actual intenta ser, simultáneamente desde el día uno: un Airbnb para estudiantes, un Wallapop para estudiantes, un Instagram/Reddit para estudiantes y un Tinder de compañeros de piso — con datos de ejemplo repartidos en 8 ciudades españolas a la vez. Además, la landing page muestra cifras de tracción inventadas ("18.000 estudiantes", "1.200 pisos activos", "4.500 artículos") y tres testimonios ficticios presentados como "historias reales" 🟦 (`src/components/landing/hero.tsx`, `src/components/landing/testimonials.tsx`) — algo que hay que eliminar antes de enseñar esto a un solo usuario real, no solo antes de un lanzamiento público.

La recomendación central de este documento es: **congelar la ambición del producto, elegir un nicho geográfico y temporal muy concreto (estudiantes de intercambio/Erasmus que llegan a Madrid — zona Ciudad Universitaria — buscando habitación para el cuatrimestre), sustituir gran parte del "software" por procesos manuales del fundador durante las primeras 8-10 semanas, y usar el problema de vivienda estudiantil en España —hoy objetivamente agudo y bien documentado— como cuña de entrada**, dejando el marketplace de segunda mano y la comunidad social como capas secundarias que se activan después, no como pilares day-one.

---

## 1. Estado actual del producto

🟦 **FACT** — Stack: Next.js 15 (App Router) + React 19 + TypeScript, Tailwind CSS 3, componentes propios estilo shadcn/ui sobre Radix UI, Framer Motion, next-themes, lucide-react. Sin base de datos, sin ORM, sin proveedor de autenticación, sin SDK de pagos, sin SDK de mapas (confirmado en `package.json`: ninguna dependencia de Prisma, Supabase, NextAuth, Clerk, Stripe, Mapbox o Google Maps).

🟦 **FACT** — 9.740 líneas de TypeScript/TSX en ~120 archivos. 22 rutas de aplicación bajo `src/app/(app)/` y `src/app/(auth)/`, más landing, blog, "sobre nosotros" y tres páginas legales estáticas (cookies, privacidad, términos).

🟦 **FACT** — Todo el estado de usuario (sesión, onboarding, favoritos, publicaciones nuevas, mensajes, likes/comentarios de comunidad, notificaciones leídas) se gestiona con seis React Context distintos que persisten en `localStorage` (`src/context/auth-context.tsx`, `chat-context.tsx`, `community-context.tsx`, `favorites-context.tsx`, `listings-context.tsx`, `notifications-context.tsx`). No hay servidor que reciba o reconcile esos datos entre usuarios distintos.

🟦 **FACT** — El login (`AuthProvider.login()`) no valida nada: es una función que pone `isAuthenticated = true` en el estado local sin comprobar credenciales. El registro tiene campos de nombre/email/contraseña y botones "Continuar con Google" / "Continuar con Apple", pero no hay ningún flujo OAuth ni backend detrás.

🟦 **FACT** — Datos de ejemplo: 13 usuarios, 18 propiedades, 23 productos, 27 publicaciones de comunidad, 27 conversaciones, 11 notificaciones, 6 reseñas (`src/data/*.ts`), repartidos entre 8 ciudades (Madrid, Barcelona, Valencia, Sevilla, Granada, Salamanca, Bilbao, Zaragoza) y con 10 universidades configuradas en `src/lib/constants.ts`.

🟦 **FACT** — Un único commit de git en todo el repositorio, del 11 de septiembre de 2026. El producto es, literalmente, de ayer: no hay historial de iteración, ni tests, ni CI.

🟨 **INFERENCE** — Dado que el README describe con precisión y detalle cómo sustituir cada pieza mock por un backend real función por función (`getPropertyById`, `getUserById`, etc.), es razonable pensar que el proyecto se generó con la intención explícita de servir de base de diseño/arquitectura antes de invertir en backend — lo cual es exactamente el punto en el que estás ahora mismo, y encaja con lo que pides en este documento.

---

## 2. Auditoría técnica

### Bugs confirmados

| # | Bug | Evidencia | Archivo |
|---|---|---|---|
| 1 | Claves React duplicadas en producción (`m5`, `m6`) en la sección "Popular entre estudiantes" de `/inicio`. React advierte en consola: *"Encountered two children with the same key"*. Causa: `products.sort(precio desc).slice(0,3).concat(products.slice(3,10))` — si un producto entre los 3 más caros también cae en las posiciones 3-10 del array original, aparece duplicado. | Verificado ejecutando la app y leyendo la consola del navegador (Playwright headless) | `src/app/(app)/inicio/page.tsx:38` |
| 2 | Reutilización de la misma foto de Unsplash en anuncios distintos y no relacionados (dos habitaciones en barrios y precios distintos muestran literalmente la misma imagen de interior). No rompe nada, pero mina la credibilidad visual del catálogo. | Verificado visualmente en `/pisos` y `/inicio` | `src/data/images.ts` (pool de fotos limitado) |
| 3 | `npm install` reporta 2 vulnerabilidades de dependencias (1 moderada, 1 alta) sin resolver. | Salida de `npm install` | `package-lock.json` |
| 4 | Cero archivos de test en todo el repositorio (`*.test.ts`, `*.spec.ts` — ninguno existe). Cualquier cambio futuro no tiene red de seguridad automatizada. | `find src -iname "*.test.*"` → vacío | — |

### UX problems

- **El botón "Reportar publicación"/"Reportar usuario" no reporta nada.** Muestra un toast de éxito ("Hemos recibido tu reporte... lo revisaremos en menos de 24h") pero no hay backend, cola de moderación ni panel de admin. El centro de ayuda (`src/data/support.ts`) promete explícitamente ese SLA de 24h que hoy es imposible de cumplir. 🟦 Esto no es solo deuda técnica: es una promesa de confianza que el producto no puede sostener si alguien la usa hoy en serio.
- **El formulario de publicar propiedad es una página larga de scroll único**, no un asistente por pasos, con más de 10 campos visibles antes de llegar a comodidades/fotos adicionales. 🟨 Es razonable esperar una tasa de abandono más alta en móvil que con un flujo por pasos, especialmente en un usuario que publica por primera vez y no está seguro de qué va a pedirle la app.
- **El feed de "Comunidad" mezcla ciudades y universidades sin agrupar por contexto del usuario**: aparecen publicaciones de Salamanca y de Universitat Pompeu Fabra en el mismo scroll que las de Madrid, sin que el usuario haya elegido verlas. En un producto con 0 usuarios reales, una comunidad "de toda España" se sentirá vacía y genérica en cualquier ciudad concreta.
- **La home ("Para ti en Madrid") no filtra realmente por ciudad de forma dura**: el código (`inicio/page.tsx`) hace un `sort` que prioriza la ciudad del usuario pero igualmente rellena hasta 8 tarjetas con propiedades de otras ciudades si no hay suficientes locales — comportamiento correcto para una demo con pocos datos, pero es la prueba en código de que el producto está diseñado para sentirse "grande" incluso vacío, en vez de sentirse "lleno" en un solo sitio.

### UI problems

- Ninguno grave de bajo nivel: la tipografía (Plus Jakarta Sans), la paleta de color (verde "tribu" + coral cálido sobre fondo cálido no-blanco) y el espaciado son consistentes y de aspecto profesional, no genérico. 🟦 Esto es una fortaleza real, no hay que rehacer el sistema visual.
- El indicador de contador "3" en notificaciones y las insignias "Verificado"/"Destacado" están hardcodeadas en los datos mock, así que **todo usuario nuevo ve de inmediato una app que parece "ya usada"** (notificaciones pendientes, favoritos con corazones ya marcados según el usuario simulado) — coherente para una demo, pero es exactamente lo que hay que apagar antes de dársela a un usuario real, para no generar confusión ("¿por qué tengo 3 notificaciones si acabo de entrar?").

### Product problems (funcionalidades que probablemente no deberían existir todavía)

- **Marketplace de segunda mano completo** (categorías, negociación, ofertas por chat) compitiendo desde el día uno, en la misma app, contra Wallapop (19M de usuarios activos mensuales en España 🟦, ver Fase 3) y Vinted. No hay ninguna razón para que un estudiante use el marketplace de MiTribu con cero vendedores en vez de Wallapop con millones, salvo que ya esté en MiTribu por el piso.
- **Feed social tipo Instagram/Reddit ("Comunidad")** con siete tipos de publicación (Pregunta, Piso, Evento, Consejo, Marketplace, Presentación...) es una superficie de producto grande para mantener con actividad — los feeds sociales mueren de silencio mucho más rápido y más visiblemente que un listado de pisos vacío.
- **Sistema de reputación/reviews de convivencia** (`context: "convivencia"` en `Review`) es una idea excelente a medio plazo, pero requiere que existan convivencias reales que ya hayan terminado — no puede tener contenido real hasta la segunda o tercera cohorte de usuarios.

### Technical debt

- Cero capa de datos/API abstraída: los componentes importan directamente de `src/data/*.ts`. El propio README avisa de que hay que "sustituir estos ficheros por funciones que llamen a tu API" — es decir, el día que haya backend, prácticamente cada página que consuma datos necesita tocarse.
- Sin gestión de errores de red, estados de carga reales ni paginación real (todo es `array.slice()` en memoria) — normal en una maqueta, pero no sirve tal cual con datos reales a escala.
- Sin tipado de permisos/roles (todo usuario ve todas las acciones de "editar"/"eliminar" en su propio contenido vía UI, pero no hay ninguna capa que en un backend real impida que el usuario A edite el anuncio del usuario B).

### Accesibilidad y performance

🟦 Uso consistente de primitivas Radix UI (accordion, dialog, dropdown, tabs, tooltip, switch, checkbox) da una base razonable de foco por teclado y `aria-*` "gratis". 🟨 No se ha hecho una auditoría WCAG formal (fuera de alcance de esta sesión); esto es una base sólida, no una certificación de accesibilidad.

🟦 Next.js avisa en consola de imágenes candidatas a LCP (*Largest Contentful Paint*) sin la prop `priority` en `/inicio`, `/pisos`, `/perfil` — impacto real y menor en el rendimiento de carga percibida, fácil de arreglar.

### Seguridad

🟦 No hay superficie de ataque real hoy porque no hay backend (no hay SQL, no hay API que exponer). El riesgo relevante hoy no es técnico, es **de producto/confianza**: cifras de tracción falsas y testimonios ficticios en la landing (ver Fase 13) generan un riesgo reputacional y potencialmente de publicidad engañosa si se despliega tal cual con tráfico real, aunque sea de validación.

---

## 3. Análisis de mercado

Todo lo que sigue está basado en fuentes públicas de 2024-2026 (enlaces en el Apéndice). Donde una fuente no da un dato exacto o reciente, se indica explícitamente.

### El problema de vivienda estudiantil en España es real, agudo y está empeorando

- 🟦 **FACT** — España cerró 2025 con 118.762 camas operativas en residencias de estudiantes (+62% en diez años), pero la demanda potencial alcanza los 650.000 estudiantes: **la tasa de cobertura es de solo el 7-8%, frente a una media europea del 20% y el 31% del Reino Unido.** El déficit supera las 528.000 plazas. — [The Objective, dic. 2025](https://theobjective.com/economia/2025-12-18/espana-demanda-residencias-estudiantiles-alquiler/); [que.es, jul. 2026](https://www.que.es/2026/07/17/deficit-alojamiento-universitario-espana/)
- 🟦 **FACT** — Según la OCU (datos de Idealista, agosto 2026), la habitación media cuesta **735 €/mes en Barcelona y 689 €/mes en Madrid**, con subidas de hasta un 33% desde 2023. El gasto anual en alojamiento supera los 6.200 € en Madrid y los 6.600 € en Barcelona solo en renta. — [Infobae, sept. 2026](https://www.infobae.com/espana/2026/09/11/alquiler-una-habitacion-se-encarece-hasta-un-33-en-tres-anos-los-estudiantes-se-enfrentan-a-precios-de-700-euros-al-mes-en-madrid-y-barcelona/)
- 🟦 **FACT** — Idealista sitúa el precio medio de una habitación compartida en España en 430 €/mes (Q1 2026), con un rango de 245 € (Jaén) a 600 € (Barcelona). — [Blog Homi, citando Idealista](https://www.homi-app.com/blog/cuanto-cuesta-compartir-piso-espana-2026)

### El tamaño del mercado universitario y de intercambio

- 🟦 **FACT** — Curso 2024-2025: más de 2,1 millones de estudiantes matriculados en titulaciones oficiales en España (~1,65M en grado). — [Ministerio de Ciencia, Innovación y Universidades](https://www.ciencia.gob.es/dam/jcr:08f45793-116d-4df2-8ddd-207662c3c6ee/PrincipalesResultadosEstudiantes2025.pdf)
- 🟦 **FACT** — Curso 2023-2024: 159.002 estudiantes internacionales en el sistema universitario español, de los cuales 63.624 llegaron vía programa de movilidad. 180.563 estudiantes extranjeros matriculados en 2022-23 (+6,1% interanual). — [Ministerio de Ciencia](https://www.ciencia.gob.es/Noticias/2024/Noviembre/estadisticas-universidades-internacionalizacion.html)
- 🟦 **FACT** — En 2023, **España fue el país de la UE que más participantes Erasmus recibió**, con casi 200.000 personas (estudiantes, profesores, FP, jóvenes trabajadores), y concentra el 14% de todas las becas Erasmus+ de Europa — la proporción más alta de cualquier país. — [The Objective, nov. 2024](https://theobjective.com/sociedad/2024-11-27/espana-principal-destino-erasmus-2023/); [Ministerio de Ciencia](https://www.ciencia.gob.es/Noticias/2024/Julio/erasmus-plus.html)
- 🟦 **FACT** — Las universidades que más movilidad Erasmus concentran son la Universidad de Granada, la Universidad Complutense de Madrid y la Universidad de Valencia (en ese orden aproximado). — [Sinmaletas](https://sinmaletas.com/blog/8-universidades-de-espana-con-mas-estudiantes-erasmus/)

### El fraude en alquiler a estudiantes es un patrón documentado y recurrente

- 🟦 **FACT** — Casos reales y recientes: ~20 estudiantes internacionales estafados en Donostia/San Sebastián en septiembre de 2024 (depósito de 500 € tras videollamada con un "propietario" que luego desaparece); alertas equivalentes en Zaragoza (septiembre 2026) y Granada. El patrón se repite cada inicio de curso. — [Noticias de Navarra](https://www.noticiasdenavarra.com/sociedad/2024/09/04/estudiantes-erasmus-alquilan-piso-san-8650870.html); [Aragón Digital](https://www.aragondigital.es/articulo/sucesos/alerta-zaragoza-estafas-alquiler-pisos-inicio-curso-universitario/202609091123441006789.html)
- 🟦 **FACT** — La razón estructural: los estudiantes internacionales "buscan piso desde el extranjero y no conocen los precios ni las costumbres locales", lo que los hace especialmente vulnerables. — [Xataka](https://www.xataka.com/basics/estafas-alquiler-piso-estudiantes-como-identificarlas-como-evitarlas)
- 🟨 **INFERENCE** — Este es, con diferencia, el punto de dolor más agudo, más cuantificado y con mejor cobertura mediática de todo el espacio en el que quiere jugar MiTribu. Es también el único de los tres verticales (vivienda / marketplace / comunidad) donde existe una necesidad de **confianza verificada** que un marketplace generalista (Idealista, Badi) no resuelve bien porque no puede verificar que ambas partes son estudiantes reales de una universidad real.

### Segunda mano: mercado grande, pero ya dominado

- 🟦 **FACT** — Wallapop: +19 millones de usuarios mensuales en España, 101 M€ de facturación en 2024, volumen de transacciones entre particulares de 2.000-2.500 M€/año. — [About Wallapop](https://about.wallapop.com/que-han-buscado-y-comprado-los-espanoles-en-wallapop-durante-2024/); [Merca2](https://www.merca2.es/2024/12/30/wallapop-2025-segunda-mano-2098074/)
- 🟨 **INFERENCE** — Con esa escala y esos efectos de red, ningún marketplace de segunda mano "para estudiantes" nuevo puede competir en liquidez pura contra Wallapop o Vinted. La única cuña defendible es el contexto (verificación universitaria, entrega en el mismo edificio/campus, coincide con la mudanza), no el catálogo.

---

## 4. Competidores

| Competidor | Qué resuelve | Usuario objetivo | Modelo de negocio | Fortalezas | Debilidades | Qué aprender | Qué NO copiar |
|---|---|---|---|---|---|---|---|
| **[Badi](https://badi.com/es/sobre-badi)** 🟦 | Alquiler de habitaciones y pisos, con matching por compatibilidad | Alquiler urbano general (🟦 70% de sus usuarios son trabajadores, edad media 29 años — no es un producto centrado en estudiantes) | Intermediación + verificación de identidad + pago seguro; expansión a "Badi Homes" gestionando inventario de fondos/hoteles | +5M usuarios registrados, 325K MAU, 500K habitaciones publicadas, presencia en 200 ciudades españolas 🟦 ([EjePrime](https://www.ejeprime.com/empresa/badi-a-por-la-fiebre-del-alquiler-crea-badi-homes-para-gestionar-pisos-de-grandes-empresas), [The New Barcelona Post](https://www.thenewbarcelonapost.com/badi-se-lanza-al-alquiler-de-habitaciones-de-hoteles-vacios/)) | No es estudiante-first; sin comunidad ni reputación entre pares del mismo campus | Verificación de identidad + pago seguro como estándar de confianza | Intentar cubrir 200 ciudades desde el día uno |
| **[Uniplaces](https://onlinelibrary.wiley.com/doi/10.1111/tesg.12560)** 🟦 | Alojamiento de estudiantes tipo Airbnb, reserva 100% online sin visitar | Estudiante internacional que reserva desde su país de origen | Comisión sobre la reserva | Modelo "Airbnb para estudiantes" maduro, presente en 130+ ciudades, fotos/tours verificados | Fricción y coste para el anfitrión; foco en estancias largas pre-pagadas, poca comunidad | Fotos y descripciones verificadas como estándar mínimo de listado | Cobrar la primera mensualidad por adelantado sin trato humano — es justo el patrón que da pie a desconfianza/estafas |
| **[Spotahome](https://www.luntero.com/resource/platform/comparison/spotahome-vs-uniplaces)** 🟦 | Igual que Uniplaces; sede en Madrid | Estudiante/profesional que se muda a España sin poder visitar | Comisión | Vídeos profesionales in situ, fuerte en el sur de Europa | Coste operativo alto (fotografía profesional en cada piso); no es comunidad | Vídeo real del piso reduce fraude percibido más que fotos de stock | — |
| **[HousingAnywhere](https://www.luntero.com/resource/platform/comparison/housinganywhere-vs-spotahome-vs-uniplaces)** 🟦 | Igual, paneuropeo, para exchange students/becarios | Estudiante de intercambio o interno en prácticas | Comisión + listados verificados | Red paneuropea, confianza vía landlords verificados | Sin capa social/comunidad | — | — |
| **[Idealista](https://www.idealista.com) / [Fotocasa](https://www.fotocasa.es)** 🟦 | Portal inmobiliario generalista con sección de habitaciones compartidas | Cualquier persona que alquila, no solo estudiantes | Publicidad + listados destacados de agencias | Inventario masivo, es la referencia de precio del mercado (usado como fuente en este mismo documento) | Cero verificación de "eres estudiante", cero comunidad, UX genérica, foco en profesionales inmobiliarios | Referencia de precios de mercado, fiable y actualizada | — |
| **[Wallapop](https://about.wallapop.com)** 🟦 | Compraventa de segunda mano general | Toda la población española | Publicidad + listados destacados/envíos | 19M MAU, efecto de red enorme, ya es el hábito por defecto | No conecta con vivienda ni comunidad estudiantil, cero verificación universitaria | — | Competir en catálogo/volumen |
| **Vinted** | Ropa de segunda mano | General, fuerte en moda | Comisión al comprador | Dominante en categoría ropa | Fuera del scope de vivienda/mobiliario | — | — |
| **[Homi](https://www.homi-app.com/)** 🟦 | Matching de compañeros de piso por compatibilidad de personalidad (test de hábitos/valores) | Personas que buscan compañero de piso afín, no solo estudiantes | Registro y búsqueda gratuitos (modelo de ingresos no confirmado en fuentes públicas) | Es, de todos los competidores encontrados, el más cercano conceptualmente a la pieza de "comunidad + matching" que MiTribu quiere construir | Presencia y tracción no cuantificadas públicamente; nace de un proyecto de estudiantes de FP, sin la escala de Badi | El test de compatibilidad como mecanismo de "comunidad útil" en vez de feed social abierto | — |
| **[ESN España](https://www.esn-spain.org/)** (Erasmus Student Network) 🟦 | Integración social y de acogida de estudiantes internacionales, por campus | Estudiante Erasmus/internacional | ONG sin ánimo de lucro | Presencia local ya establecida en prácticamente todas las universidades receptoras de Erasmus, canal de comunidad de confianza | No resuelve vivienda ni marketplace; es comunidad pura | **No es competidor: es el socio de distribución más obvio para la fase de validación** (ver Fase 15) | — |

### Qué aprender del conjunto

🟩 **RECOMMENDATION** — El patrón ganador de los jugadores de vivienda (Badi, Uniplaces, Spotahome, HousingAnywhere) es **verificación + confianza como producto**, no listados como producto — el listado ya lo tiene Idealista con más volumen que nadie. MiTribu no puede competir en volumen de anuncios contra Idealista/Badi ni en usuarios contra Wallapop. Solo puede ganar si su verificación es más estricta y más específica (estudiante real, de una universidad real, de tu misma ciudad o campus) de lo que cualquiera de ellos ofrece hoy.

### Qué no copiar

🟩 **RECOMMENDATION** — No copiar la expansión geográfica agresiva de Badi (200 ciudades) ni el modelo de reserva 100% online y prepagada de Uniplaces/Spotahome, que traslada al usuario justo el riesgo (pagar sin ver ni conocer a nadie) que hoy genera las estafas documentadas en la Fase 3. MiTribu debería diferenciarse exactamente en el sentido contrario: contacto humano verificado antes de cualquier compromiso de dinero.

---

## 5. Oportunidad

🟩 **RECOMMENDATION**, apoyada en los FACTS anteriores: existe una ventana real para un producto que combine (a) verificación de identidad universitaria de ambas partes, (b) alcance hiperlocal por campus/ciudad en vez de nacional, y (c) el momento exacto de mayor dolor (llegada a una ciudad nueva sin red de contactos ni conocimiento del mercado local), que hoy ningún competidor cubre a la vez:

- Idealista/Fotocasa/Badi tienen volumen pero cero verificación estudiantil ni comunidad.
- Uniplaces/Spotahome/HousingAnywhere verifican el alojamiento, no la identidad social del inquilino, y monetizan cobrando por adelantado — el punto exacto del fraude.
- Homi tiene la idea de matching pero sin foco geográfico/institucional ni vivienda.
- ESN tiene la comunidad y la confianza local, pero no producto digital de vivienda/marketplace.

La oportunidad no es "hacer una app de estudiantes que lo tenga todo". Es **ser la capa de confianza estudiante-a-estudiante que falta entre esos actores**, empezando por un solo campus.

---

## 6. Nicho inicial recomendado

### Matriz de nichos evaluados

| Nicho | Tamaño | Dolor | Facilidad de adquisición | Competencia | Potencial | Recomendación |
|---|---:|---:|---:|---:|---:|---|
| Estudiantes Erasmus/internacionales que llegan a Madrid (zona Ciudad Universitaria: Complutense + Politécnica) | Medio-alto 🟦 (Madrid recibe una parte significativa de los ~200.000 participantes Erasmus de España; Complutense está entre las 3 universidades con más movilidad) | Muy alto 🟦 (precios +33% en 3 años, cobertura de residencias del 7-8%, estafas documentadas específicamente por buscar en remoto) | Media-alta — canal ESN local ya existente, cohortes concentradas en fechas fijas (agosto-sept. y enero-feb.) | Alta en volumen de anuncios (Idealista/Badi) pero nula en verificación estudiantil | Alto | 🟩 **Recomendado (principal)** |
| Estudiantes Erasmus/internacionales que llegan a Granada | Alto en términos relativos al tamaño de la ciudad 🟦 (Granada es la universidad con más movilidad Erasmus de España) | Muy alto (mismos factores estructurales que Madrid) | Alta — ciudad más pequeña, mayor densidad relativa de Erasmus, comunidad ESN muy activa | Menor presión de Badi/Idealista que en Madrid/Barcelona | Alto | 🟩 **Recomendado (alternativa nº1, si el fundador no tiene base en Madrid)** |
| Estudiantes de primer año que se mudan de provincia (no Erasmus) | Muy alto (parte de los 1,65M de estudiantes de grado) | Alto (mismos precios, pero conocen el idioma y algo más el país) | Media — más difícil de segmentar y de alcanzar como grupo cerrado que un intercambio con fecha fija | Igual que arriba | Medio-alto | 🟨 Buen segundo escalón tras validar con Erasmus, no punto de partida |
| Estudiantes que buscan amueblar su habitación/piso (marketplace de mobiliario) | Alto pero disperso | Medio | Alta (todo el mundo compra/vende algo al mudarse) | Muy alta — Wallapop domina totalmente | Bajo como cuña inicial | 🟥 No usar como entrada; solo como capa secundaria tras tener housing funcionando |
| Comunidad social general de estudiantes ("conocer gente") | Muy alto | Medio-bajo (hay sustitutos gratuitos: Instagram, grupos de WhatsApp/Telegram, ESN) | Media | Alta (redes sociales generalistas + ESN gratuito) | Bajo como cuña inicial | 🟥 No usar como entrada; usar como retención una vez hay housing |

### EL NICHO INICIAL RECOMENDADO

> **Estudiantes de intercambio (Erasmus/internacionales) que llegan a Madrid para estudiar en el entorno de Ciudad Universitaria (Complutense + Politécnica de Madrid) y necesitan encontrar habitación verificada antes de o durante su primer mes, sin caer en las estafas de alquiler remoto documentadas cada inicio de curso.**

🟨 **INFERENCE, no FACT**: elijo Madrid como ciudad principal (en vez de Granada, la alternativa objetivamente más "fácil" por concentración relativa de Erasmus) porque los propios datos de ejemplo ya presentes en el repositorio están sesgados hacia Madrid — dos de los primeros usuarios mock son estudiantes de la Complutense y la Politécnica, y uno de los anfitriones ficticios tiene "dos pisos para estudiantes cerca del campus" en Madrid — lo cual sugiere que quien construyó esta base de datos de ejemplo tiene contexto o intención de arrancar ahí. **Si esto no es así y no tienes red de contactos en Madrid, Granada es la recomendación por defecto**, por tener la universidad con más movilidad Erasmus de España y una comunidad ESN muy activa y accesible en una ciudad más pequeña, donde es más fácil alcanzar densidad.

### Por qué este nicho y no "estudiantes" a secas

1. Tiene una **fecha límite natural** (llegada del cuatrimestre) que crea urgencia real, no artificial.
2. Tiene un **dolor cuantificado y creciente** (precios, escasez de residencias, estafas).
3. Tiene un **canal de distribución gratuito y ya organizado** (ESN Madrid/UCM/UPM, grupos de acogida universitarios, oficinas de relaciones internacionales).
4. Resuelve el **problema del arranque en frío mejor que "estudiantes en general"**: un Erasmus que llega en septiembre necesita habitación *esa* semana, no "algún día" — genera actividad concentrada y medible desde la primera cohorte.
5. Es lo bastante pequeño para que **el fundador pueda conocer personalmente a los primeros 50-100 usuarios**, algo imposible si el nicho es "estudiantes de España".

---

## 7. Beachhead market

- **Ciudad:** Madrid (alternativa: Granada).
- **Universidades:** Universidad Complutense de Madrid + Universidad Politécnica de Madrid (ambas ya modeladas en el código, `src/lib/constants.ts`), zona Ciudad Universitaria/Moncloa/Argüelles.
- **Tipo de estudiante:** de intercambio internacional (Erasmus u otros programas de movilidad), 19-25 años.
- **Situación:** llega a España sin piso cerrado, sin red social local, sin conocer precios reales del barrio, típicamente 4-8 semanas antes del inicio de curso (búsqueda) hasta la primera semana in situ (cierre).
- **Momento exacto del dolor:** entre 6 semanas antes de la llegada (empieza a buscar por Facebook/Idealista desde el extranjero) y los primeros 5-7 días en la ciudad (si no ha cerrado nada, duerme en hostales/Airbnb pagando de más mientras visita pisos a contrarreloj).
- **Cómo resuelve el problema hoy:** grupos de Facebook de "Erasmus Madrid [año]", Idealista/Fotocasa/Badi sin filtro de confianza estudiantil, contacto informal con la oficina de relaciones internacionales de su universidad de origen o destino, o simplemente confiando en la primera respuesta que recibe (de ahí las estafas).
- **Por qué cambiaría a MiTribu:** porque puede ver perfiles verificados con universidad real, contactar con anfitriones que ya han alojado a otros Erasmus (reputación), y —clave para el arranque manual— porque en la fase de validación el fundador o un "embajador de campus" hace de intermediario humano de confianza, algo que ni Idealista ni Badi ofrecen.

### ICP (Ideal Customer Profile)

Estudiante de intercambio internacional, 19-25 años, que llega a Madrid por primera vez para un cuatrimestre o curso completo, busca habitación en piso compartido (no piso completo, presupuesto limitado), activo en redes sociales (Instagram/WhatsApp), habla inglés y/o español básico, ya está en algún grupo de Facebook/Telegram de su cohorte Erasmus antes de llegar.

### Personas

**1. Marco, 21 años — Erasmus de Italia, Ingeniería, llega a la Politécnica de Madrid en enero**
- Objetivo: tener habitación cerrada antes de coger el vuelo.
- Frustración: no puede visitar pisos en persona; ya ha visto anuncios "demasiado baratos para ser verdad" en Facebook.
- Comportamiento: busca en inglés, compara Idealista y grupos de Facebook, pide videollamada antes de pagar nada.
- Qué le convencería: ver que el anfitrión o el piso tiene reseñas de anteriores Erasmus reales, no solo fotos.
- Qué le impediría usarlo: que la app tenga pocos anuncios en Madrid o le pida pagar antes de hablar con nadie.

**2. Sofía, 18 años — primer año de Arquitectura en la UPM, se muda desde otra provincia española**
(inspirada en el usuario mock `u1` ya presente en el código, reencuadrada como persona objetivo real)
- Objetivo: encontrar habitación cerca del campus dentro de su presupuesto familiar.
- Frustración: es su primera vez viviendo fuera de casa; le da miedo negociar con desconocidos por WhatsApp.
- Comportamiento: pide opinión a su familia antes de decidir, mira valoraciones, prefiere pisos con otras chicas.
- Qué le convencería: perfiles verificados con universidad y reseñas reales de convivencia.
- Qué le impediría usarlo: que la app parezca vacía o sin actividad reciente.

**3. Lucas, 23 años — estudiante de la UCM en su piso desde hace 2 años, potencial anfitrión/vendedor**
(lado de la oferta — imprescindible para resolver el arranque en frío, ver Fase 18)
- Objetivo: alquilar la habitación libre de un compañero que se va, sin pagar comisión ni tratar con desconocidos raros.
- Frustración: los anuncios en Idealista/Badi le traen mensajes genéricos de gente que no es estudiante.
- Comportamiento: publica en el grupo de Facebook de su universidad, pide "que sea estudiante, mejor Erasmus si puede ser".
- Qué le convencería: que MiTribu le traiga candidatos ya verificados como estudiantes, sin tener que filtrar él.
- Qué le impediría usarlo: que le pida publicar en una app sin ningún candidato disponible todavía (por eso el reclutamiento de oferta y demanda debe ir en paralelo, ver Fase 18).

---

## 8. Problema principal

> **Para estudiantes de intercambio que llegan a Madrid sin conocer la ciudad ni a nadie, MiTribu permite encontrar y cerrar una habitación verificada con otro estudiante en menos de un mes sin arriesgarse a una estafa, a diferencia de buscar en Facebook, Idealista o Badi genéricos, porque MiTribu verifica que ambas partes son estudiantes reales de una universidad real y da acceso a una comunidad de acogida de su propio campus antes incluso de llegar.**

### Jobs To Be Done
- "Necesito cerrar una habitación segura antes de subirme al avión/tren."
- "Necesito saber si el precio que me piden es razonable para esa zona."
- "Necesito no parecer un blanco fácil para un estafador porque no conozco el mercado local."

### Pain points
- Miedo a la estafa al pagar sin ver el piso ni conocer a la persona.
- Desconocimiento total de precios y barrios "por estudiante" (no genéricos).
- Cero red social al llegar → aislamiento las primeras semanas.

### Desired outcomes
- Habitación cerrada antes de llegar, con confianza razonable en que es real.
- Ahorro de tiempo (no visitar 15 pisos a contrarreloj la primera semana).
- Tener ya 1-2 contactos/amigos potenciales antes de la primera clase.

### Alternativas actuales
Grupos de Facebook/Telegram de la cohorte Erasmus, Idealista/Fotocasa/Badi sin filtro estudiantil, oficina de relaciones internacionales de la universidad (lenta, no siempre resolutiva), boca a boca con antiguos Erasmus del mismo país de origen.

---

## 9. Value Proposition

**One-liner:** Tu habitación, verificada por y para estudiantes, antes de que pongas un pie en la ciudad.

**Elevator pitch:** MiTribu conecta a estudiantes que llegan a Madrid con anfitriones y compañeros de piso verificados como estudiantes reales, para que encontrar habitación no dependa de confiar a ciegas en un anuncio de Facebook o de pagar por adelantado a un desconocido.

**Hero headline:** Encuentra tu habitación. Encuentra tu gente.

**Subheadline:** Verificado por estudiantes, para estudiantes que llegan a Madrid.

**3 beneficios principales:**
1. Perfiles verificados con universidad real — sabes que hablas con un estudiante, no con un estafador.
2. Precios de mercado por barrio y por campus, no precios genéricos de toda la ciudad.
3. Una comunidad de acogida de tu propia universidad antes de llegar, no solo un listado de pisos.

**Diferenciación:** ningún competidor verifica simultáneamente identidad estudiantil + universidad + ciudad de destino.

**Por qué ahora:** los precios de alquiler estudiantil han subido un 33% en tres años y la cobertura de residencias cubre solo el 7-8% de la demanda — la presión sobre el estudiante que busca piso nunca ha sido mayor, y las estafas documentadas cada septiembre lo confirman.

**Por qué MiTribu:** porque nace centrado en el problema de confianza, no en el volumen de anuncios, que ya está resuelto (peor) por Idealista y Badi.

---

## 10. MVP

### CORE / SUPPORTING / LATER / REMOVE

| Categoría | Elemento | Razonamiento |
|---|---|---|
| 🟩 **CORE** | Publicar y buscar habitaciones en un único piso/campus objetivo, con verificación manual de universidad | Es el problema principal; sin esto no hay producto |
| 🟩 **CORE** | Mensajería 1:1 entre estudiante y anfitrión | Imprescindible para cerrar el trato con confianza |
| 🟩 **CORE** | Perfil con universidad, verificación y reseñas básicas | Es la ventaja de confianza frente a Idealista/Badi |
| 🟨 **SUPPORTING** | Favoritos/guardados | Útil pero no bloqueante; ya existe en el código, mantenerlo |
| 🟨 **SUPPORTING** | Notificaciones in-app | Solo si hay mensajes/actividad real que notificar |
| 🟨 **SUPPORTING** | Búsqueda global con filtros avanzados (mascotas, género, amueblado...) | Reducir a 3-4 filtros clave al principio (precio, zona, disponibilidad, verificado) |
| 🟦 **LATER** | Marketplace de segunda mano | Activar cuando haya masa crítica de usuarios de vivienda en la misma ciudad/fecha (pico de mudanzas) |
| 🟦 **LATER** | Feed social "Comunidad" abierto | Activar como grupo de acogida cerrado por cohorte/campus, no como red social general |
| 🟦 **LATER** | Reseñas de convivencia | Solo tiene sentido cuando ya han terminado convivencias reales |
| 🟦 **LATER** | Pagos/depósitos dentro de la app | Alto riesgo legal/regulatorio y de confianza si se hace mal; no meterse hasta tener asesoría legal (Fase 13) |
| 🟥 **REMOVE (del pitch/landing actual, ya)** | Cifras de tracción falsas, testimonios ficticios, badge "Verificado"/"Reportado en 24h" sin backend real | Riesgo de credibilidad y potencialmente de publicidad engañosa |

### Funcionalidades del MVP real (detalle)

| Funcionalidad | Valor para usuario | Complejidad | Prioridad | ¿Necesaria para lanzar? | ¿Puede hacerse manualmente? |
|---|---|---|---|---|---|
| Publicar habitación (formulario simple, 1 pantalla) | Alto | Baja (ya existe UI) | P0 | Sí | Parcial — founder ayuda a redactar el primer anuncio por WhatsApp |
| Verificación de universidad | Muy alto | Baja si es manual | P0 | Sí | **Sí, 100% manual al principio** (ver Fase 11) |
| Búsqueda + filtro por zona/precio/fecha | Alto | Baja (ya existe UI) | P0 | Sí | No |
| Contacto/mensajería | Alto | Media (ya existe UI, falta backend real) | P0 | Sí | Sí, vía WhatsApp en la cohorte 0 (ver Fase 11) |
| Perfil con reseñas | Medio | Media | P1 | No para la cohorte 0 | Sí, recogidas por formulario y publicadas manualmente |
| Favoritos | Medio | Baja | P2 | No | — |
| Marketplace de productos | Bajo al inicio | Alta | P3 | No | — |
| Comunidad/feed social | Bajo al inicio | Alta | P3 | No | Sí, como grupo de WhatsApp/Telegram de cohorte |

---

## 11. Manual First / Concierge MVP

🟩 **RECOMMENDATION** — Antes de construir backend real de verificación automática, matching o pagos, hacer esto a mano:

- **Antes de construir verificación automática de universidad → pide el carnet universitario o el email .edu por WhatsApp/email y márcalo tú manualmente como "Verificado" en la base de datos.** Con 10-100 usuarios esto tarda minutos al día.
- **Antes de construir un sistema de matching de compañeros de piso → sé tú el matchmaker.** Con un Google Form o Typeform de "qué buscas / qué ofreces", cruza manualmente candidatos y preséntalos por WhatsApp.
- **Antes de construir pagos/depósitos in-app → no los construyas.** Deja que el acuerdo económico se cierre fuera de la plataforma, como ya hacen Badi y la mayoría de portales; MiTribu añade confianza, no gestiona dinero, al menos en la fase de validación.
- **Antes de construir moderación automática de contenido/reportes → revisa tú cada publicación nueva antes de que sea visible** (cola de aprobación manual, factible hasta varios cientos de anuncios).
- **Antes de construir el feed social "Comunidad" → crea un grupo de WhatsApp o Telegram por cohorte/campus** y usa eso como comunidad real; mide ahí el engagement antes de replicarlo en producto.
- **Antes de construir un sistema de reputación algorítmico → pide valoraciones por formulario después de cada convivencia/transacción y publícalas tú mismo en el perfil.**

---

## 12. Product Audit

| Acción | Elemento | Prioridad |
|---|---|---|
| **KEEP** | Sistema de diseño (tokens de color, tipografía, dark mode), tarjetas de propiedad/producto, navegación inferior móvil, primitivas Radix UI | P0 |
| **KEEP** | Modelo de datos (`src/types/index.ts`) — está bien pensado y mapea bien a un backend futuro | P0 |
| **IMPROVE** | Formulario de publicar propiedad → convertir en asistente por pasos (fotos → datos básicos → precio/condiciones → revisar y publicar) | P1 |
| **IMPROVE** | Bug de claves duplicadas en `/inicio` (`popularProducts`) | P0 (es gratis de arreglar y es un bug real) |
| **IMPROVE** | Banco de imágenes de ejemplo (ampliar pool para evitar fotos repetidas) | P2 |
| **REDESIGN** | Onboarding → capturar universidad + fecha de llegada + "vienes de intercambio o eres nuevo en la ciudad" para poder segmentar la cohorte desde el primer paso | P1 |
| **REDESIGN** | Home (`/inicio`) → que muestre solo la ciudad/campus objetivo mientras el producto esté en fase de validación, no 8 ciudades a la vez | P1 |
| **REMOVE (del producto visible, no del código)** | Cifras de tracción falsas y testimonios ficticios en la landing | P0 |
| **REMOVE (aparcar)** | Feed de Comunidad abierto multi-ciudad, marketplace de productos, reseñas de convivencia | P2 — aparcar, no borrar código |
| **BUILD** | Verificación manual de universidad (proceso, no feature de software todavía) | P0 |
| **BUILD** | Backend mínimo: autenticación real + base de datos para propiedades/usuarios/mensajes de un único campus | P0 |
| **LATER** | Pagos, matching automático, moderación automática, mapas reales | P2-P3 |

---

## 13. UX/UI

- **Primera impresión:** fuerte. La landing comunica bien "vivienda + comunidad + estudiantes" en el primer scroll, con una jerarquía visual clara (badge → titular → CTA → prueba social). El problema no es el diseño, es que la prueba social es falsa (ver Fase 2).
- **Branding:** coherente y diferenciado (verde "tribu" + coral), no parece una plantilla genérica.
- **Mobile:** patrón de navegación inferior con FAB central de "Publicar" es correcto para un producto de marketplace/comunidad; funciona bien en las capturas móviles revisadas.
- **Formularios:** correctos visualmente, pero el de publicar propiedad es largo en una sola pantalla — candidato a rediseño en pasos.
- **Jerarquía visual en tarjetas:** buena (precio, valoración, verificado, distancia a universidad, favorito) — es información realmente relevante para decidir, no relleno.

**¿Qué haría que un estudiante abandonara la aplicación?**
Abrir la app en Madrid y ver anuncios de Bilbao o Zaragoza sin haberlo pedido; ver "3 notificaciones" y "favoritos ya marcados" en su primera sesión (se siente como una cuenta de otra persona); intentar reportar algo sospechoso y no tener ninguna certeza real de que alguien lo revisó.

**¿Qué haría que quisiera volver mañana?**
Recibir un mensaje real de un anfitrión o de otro estudiante de su misma cohorte; ver que su anuncio (si es anfitrión) ha tenido contactos reales; ver contenido de su propio campus/fecha de llegada, no de toda España.

### Cambios concretos propuestos
1. Limitar por completo (en producto, no solo en datos) la ciudad/campus visible durante la fase de validación.
2. Convertir el formulario de publicar en un asistente de 3-4 pasos.
3. Sustituir notificaciones/favoritos precargados por un estado verdaderamente vacío para cuentas nuevas.
4. Añadir `priority` a las imágenes LCP detectadas por Next.js en `/inicio`, `/pisos`, `/perfil`.

---

## 14. Trust & Safety

Dado que MiTribu toca vivienda, dinero (indirectamente) y contacto con desconocidos, y su nicho elegido es precisamente el segmento más vulnerable a fraude documentado (estudiantes que buscan en remoto), esta es probablemente el área más crítica de todo el producto.

**Necesario para el MVP:**
- Verificación de identidad/universidad (manual al principio, ver Fase 11).
- Un canal real de reporte con revisión humana (aunque sea el propio fundador respondiendo en 24h de verdad, no un toast falso).
- No procesar pagos ni depósitos dentro de la app en esta fase — reduce tanto el riesgo legal como el de fraude percibido.
- Política clara y visible de "nunca pagues antes de una videollamada/visita" — convertir el propio patrón de estafa documentado en contenido educativo dentro del producto.

**Puede esperar:**
- Verificación automática de documentos (KYC).
- Sistema de pagos y depósitos garantizados.
- Moderación de contenido con IA.
- Panel de administración completo.

**Aspectos legales/regulatorios a revisar con profesionales antes de operar comercialmente** (esto no es asesoramiento legal, es una lista de temas a llevar a un abogado):
- Normativa de intermediación inmobiliaria y de alquiler de habitaciones en España (posible necesidad de registro según el tipo de actividad).
- RGPD/LOPD: verificación de identidad y datos universitarios son datos sensibles; define base legal y retención.
- Responsabilidad de la plataforma ante contenido/anuncios fraudulentos publicados por terceros (régimen de intermediarios, LSSI).
- Si en el futuro se gestionan pagos o depósitos: normativa de servicios de pago (posible necesidad de un proveedor regulado tipo Stripe Connect en vez de gestionarlo tú mismo).
- Publicidad de cifras de tracción/testimonios: si se usan cifras o testimonios no reales en marketing dirigido a consumidores, revisar la normativa de publicidad engañosa antes de cualquier lanzamiento público, no solo antes de escalar.

---

## 15. Business Model

**¿Deberíamos cobrar desde el principio?** 🟩 No. La prioridad es liquidez y confianza, no ingresos, mientras no exista una masa crítica de usuarios reales en la ciudad piloto.

**¿Qué debería ser gratis?** Publicar, buscar, verificar universidad, mensajería — todo lo relacionado con el CORE del MVP.

**¿Qué podría monetizarse después?** 
- Anuncios destacados para anfitriones (el badge "Destacado" ya existe en el diseño actual — es la palanca de monetización más natural y ya construida visualmente).
- Insignia de verificación premium/prioritaria para anfitriones con varios pisos.
- Acuerdos B2B con universidades/oficinas de relaciones internacionales (acceso "oficial" para sus estudiantes entrantes) — probablemente el modelo más defendible a medio plazo, porque monetiza una institución, no al estudiante que ya está pagando precios de alquiler altísimos.

**¿Quién debería pagar?** El anfitrión/vendedor (que obtiene ingresos), no el estudiante que busca, al menos mientras el producto compite en confianza y no en volumen.

---

## 16. Go-To-Market

Priorizando lo que funciona con presupuesto mínimo:

1. **Canal ESN/oficinas de relaciones internacionales:** contactar directamente con ESN Madrid (o ESN Granada) y las oficinas de movilidad de la UCM/UPM para que compartan MiTribu con los estudiantes entrantes antes de llegar — es exactamente el momento de máximo dolor.
2. **Grupos de Facebook/Telegram de cohorte Erasmus ("Erasmus Madrid 2027", etc.):** presencia directa del fundador respondiendo dudas de vivienda y remitiendo a MiTribu, no publicidad fría.
3. **Embajadores de campus:** 1-2 estudiantes ya viviendo en Madrid (perfil "Lucas" de la Fase 7) que reclutan anfitriones entre sus propios contactos a cambio de acceso prioritario o una pequeña compensación simbólica.
4. **Residencias/colegios mayores cercanos al campus:** carteles físicos y contacto directo — sigue siendo el canal más barato y de mayor confianza para vivienda universitaria.
5. **Instagram/TikTok orientado a contenido útil** ("cómo no te estafen buscando piso en Madrid"), no anuncios pagados, aprovechando el gancho real del problema documentado.
6. **Referral simple:** cada Erasmus que cierra piso vía MiTribu invita a 1-2 compañeros de su misma cohorte/país de origen.

---

## 17. Primeros 10 usuarios

- **Quiénes:** 5-6 estudiantes que ya buscan piso activamente en grupos de Facebook/Telegram de Erasmus Madrid (demanda) + 4-5 estudiantes/propietarios que ya tienen habitación libre cerca de Ciudad Universitaria (oferta) — reclutados directamente por el fundador, uno a uno.
- **Dónde encontrarlos:** grupos de Facebook "Erasmus Madrid [curso]", el propio ESN Madrid, publicaciones existentes de habitación en Idealista/Badi cerca del campus (contactar directamente al anunciante para invitarle a MiTribu).
- **Qué decirles:** "Estoy validando una forma más segura y verificada de encontrar/publicar habitación para estudiantes de la Complutense/Politécnica — ¿te importa ser de los primeros en probarlo? Te ayudo yo mismo con todo."
- **Qué ofrecerles:** atención personal del fundador, verificación prioritaria, cero coste.
- **Onboarding:** llamada o WhatsApp de 10 minutos, verificación manual del email/carnet universitario, ayuda a redactar el primer anuncio o la primera búsqueda.
- **Qué observar:** si de verdad contactan a otro usuario dentro de la app o se saltan a WhatsApp en cuanto pueden; cuánto tardan en cerrar (o no) un acuerdo.
- **Qué preguntar:** "¿Qué has hecho antes para buscar piso? ¿Qué te preocupaba más al buscarlo desde fuera? ¿Qué te faltó en esta primera experiencia?"

## 18. Primeros 50 usuarios

Repetir el mismo proceso manual escalado con 2-3 embajadores de campus reclutando en paralelo, activar el canal ESN de forma más formal (charla/publicación oficial), y empezar a medir tiempo hasta primer contacto y tiempo hasta cierre por cohorte, no solo registros.

## 19. Primeros 100 usuarios

Introducir la verificación semi-automatizada (formulario + revisión manual sigue, pero ya con checklist y no ad-hoc), abrir una segunda universidad del mismo entorno (Autónoma de Madrid, por proximidad geográfica) solo si la primera cohorte muestra señales claras de PMF (Fase 21), y empezar a testear el primer contenido de comunidad cerrada (grupo de acogida por cohorte dentro del producto, no feed abierto).

## 20. Primeros 500 usuarios

Solo si hay señales sólidas de retención y liquidez (Fase 21): expandir a una segunda ciudad (Granada, dado el dato de concentración Erasmus), introducir el marketplace de segunda mano limitado a la ventana de mudanza (agosto-octubre / enero-febrero), y empezar a evaluar el primer acuerdo B2B con una oficina de relaciones internacionales.

---

## 18(b). Cold Start Strategy

MiTribu tiene un problema clásico de doble cara: sin pisos no hay buscadores, sin buscadores no hay anfitriones.

🟩 **RECOMMENDATION — Empezar por la oferta, no por la demanda.** Razón: los anfitriones (estudiantes que ya viven en Madrid y tienen una habitación libre o van a tenerla el próximo cuatrimestre) son un grupo más pequeño, más identificable y más fácil de reclutar uno a uno por el fundador que la demanda (miles de Erasmus dispersos por toda Europa). Con 10-15 habitaciones reales verificadas en el entorno de Ciudad Universitaria, ya hay suficiente inventario para que el primer grupo de Erasmus vea valor real al entrar, en vez de una app vacía.

Estrategias concretas:
- Contactar directamente a anunciantes actuales de Idealista/Badi/Fotocasa cerca del campus e invitarles a listar también (o solo) en MiTribu, ofreciendo verificación gratuita de sus futuros inquilinos como valor añadido.
- Usar el propio patrón de "fin de contrato de alquiler" (estudiantes que se gradúan o cambian de piso a final de cuatrimestre) como fuente de oferta recurrente y predecible por fechas.
- No abrir la demanda (marketing hacia Erasmus) hasta tener un mínimo de inventario real y verificado — evita la primera mala experiencia ("no hay nada aquí") que mata la confianza de un usuario para siempre.

---

## 19(b). Metrics

**North Star Metric propuesta:** número de estudiantes que cierran una habitación real a través de un contacto iniciado en MiTribu por cuatrimestre/cohorte. (No registros, no descargas.)

- **Activation:** % de nuevos registros que completan verificación de universidad + envían o reciben al menos un mensaje en las primeras 72h.
- **Retention:** % de anfitriones que vuelven a publicar la cohorte siguiente; % de estudiantes que abren la app más de una vez en la misma búsqueda.
- **Engagement:** mensajes enviados por conversación; tiempo medio hasta primera respuesta de un anfitrión.
- **Marketplace liquidity:** ratio anuncios activos / búsquedas activas en la misma ciudad y ventana de fechas (no a nivel nacional).
- **Conversion:** % de conversaciones iniciadas que terminan en "habitación cerrada" (autodeclarado vía encuesta corta, ya que no hay pagos in-app).
- **Referral:** % de nuevos usuarios que llegan invitados por otro usuario.
- **CAC/LTV:** 🟨 no estimables con rigor todavía — no hay datos reales de conversión ni de gasto en adquisición; cualquier cifra ahora sería inventada. Definir una vez haya al menos una cohorte completa medida.

**Objetivos iniciales razonables** (🟨 estimaciones de referencia para una validación manual, no benchmarks de mercado):

| Usuarios | Objetivo activation | Objetivo de cierres reales reportados |
|---|---|---|
| 10 | 8/10 completan verificación y envían 1 mensaje | 3-5 cierres |
| 50 | ≥70% activation | 15-20 cierres |
| 100 | ≥60% activation (normal que baje al escalar el reclutamiento manual) | 30-40 cierres |
| 500 | ≥50% activation | Empieza a depender de liquidez real por ciudad, medir por cohorte, no en agregado |

---

## 20(b). Product Market Fit

**Señales:**

- 🔴 **Mala idea / pivotar:** tras 2-3 cohortes con reclutamiento manual activo, menos del 20% de los emparejamientos iniciados terminan en cierre reportado, o los propios anfitriones dejan de responder a los mensajes.
- 🟡 **Hay interés pero el producto no funciona:** hay demanda real (mensajes de búsqueda constantes) pero falta oferta (pocos anfitriones dispuestos a listar), o al revés — indica que el problema de cold start (Fase 18b) no está resuelto, no que la idea esté mal.
- 🟢 **Hay PMF inicial:** anfitriones piden activamente volver a publicar la cohorte siguiente sin que se les pida; estudiantes recomiendan MiTribu de forma espontánea a compañeros de su misma cohorte; el tiempo medio hasta primer contacto de calidad baja de forma sostenida cohorte a cohorte.

**Cualitativo:** entrevistas cortas (10 min) a cada uno de los primeros 20-30 usuarios preguntando qué hicieron antes, qué cambiaría de la experiencia, y si lo recomendarían — la pregunta más honesta es "¿qué tan decepcionado estarías si mañana MiTribu desapareciera?" (test de Sean Ellis: >40% "muy decepcionado" es la señal estándar de PMF temprano en esta metodología, 🟦 hecho metodológico conocido, no una cifra inventada para MiTribu).

---

## 21. Roadmap

| Fase | Objetivo | Producto | Tech | Usuarios | Marketing | Métricas | Criterio para avanzar |
|---|---|---|---|---|---|---|---|
| **0 — Arreglar y entender** | Sanear el prototipo actual | Quitar cifras/testimonios falsos, arreglar bug de claves duplicadas, acotar demo a una sola ciudad | Sin cambios de arquitectura todavía | 0 usuarios reales | Ninguno | — | Checklist de la Fase 12 completado |
| **1 — MVP** | Producto mínimo para el nicho elegido | Publicar/buscar habitación + mensajería + perfil verificado manualmente, en Madrid/Ciudad Universitaria | Backend mínimo real (auth + BD) o proceso 100% manual con Typeform/WhatsApp si aún no hay backend | 0 → primeros contactos piloto | Reclutamiento uno a uno | Activation de la cohorte piloto | 10 usuarios reales completan al menos un contacto |
| **2 — Primeros usuarios** | 10 → 50 | Iterar formulario de publicación, verificación | Empezar a automatizar lo más repetitivo de la verificación manual | 10-50 | ESN + embajadores de campus | Ver Fase 19b | ≥70% activation sostenida |
| **3 — Validación** | Confirmar PMF inicial | Cerrar huecos detectados en entrevistas | — | 50-100 | Igual + contenido educativo (estafas) | Sean Ellis test, tasa de cierre | ≥40% "muy decepcionado" o señal 🟢 de Fase 20b |
| **4 — Primer crecimiento** | 100 → 500 | Activar comunidad cerrada por cohorte, marketplace estacional | Empezar a automatizar verificación y moderación | 100-500 | Referral + segunda universidad | Liquidez por ciudad | Liquidez estable en Madrid antes de abrir Granada |
| **5 — Expansión** | Segunda ciudad/vertical | Marketplace completo, reputación de convivencia | Backend a escala, posible verificación KYC | 500+ | B2B con universidades | Retención intercohorte | Repetir el mismo patrón de validación en la nueva ciudad antes de abrir una tercera |

---

## 22. Plan 30/60/90 días

**Días 1-30**
- Semana 1: aplicar Fase 12 (quitar cifras falsas/testimonios, arreglar bug de `inicio/page.tsx`, acotar demo a Madrid). Contactar ESN Madrid y oficinas de relaciones internacionales UCM/UPM.
- Semana 2: reclutar 5-6 anfitriones reales con habitación cerca del campus (oferta primero, Fase 18b). Verificación manual.
- Semana 3: reclutar primeros 5-6 buscadores Erasmus desde grupos de Facebook/Telegram. Primeros contactos e intentos de cierre.
- Semana 4: entrevistas cortas a los 10 primeros usuarios. Documentar qué funcionó y qué no.

**Días 31-60**
- Escalar reclutamiento con 1-2 embajadores de campus hasta 50 usuarios.
- Formalizar el canal ESN (charla o publicación oficial de acogida).
- Empezar a medir activation/retention de forma sistemática (hoja de cálculo si aún no hay analítica de producto).
- Decidir, con datos reales, si el formulario de publicación necesita rediseño en pasos.

**Días 61-90**
- Aplicar el test de Sean Ellis a la base acumulada (≥40-50 usuarios).
- Si la señal es 🟢: preparar apertura de una segunda universidad cercana (Autónoma) o de Granada.
- Si la señal es 🟡: enfocarse en resolver el lado de la ecuación (oferta o demanda) que esté fallando, antes de crecer.
- Si la señal es 🔴: revisar honestamente si el problema es el nicho, el canal, o el producto, antes de invertir más tiempo en el mismo enfoque.

---

## 23. Checklist de lanzamiento

| Área | Elemento | Prioridad | Responsable | Estado | Dependencia |
|---|---|---|---|---|---|
| PRODUCT | Acotar demo/producto a una sola ciudad/campus | P0 | Founder | Pendiente | — |
| PRODUCT | Rediseñar formulario de publicar en pasos | P1 | Founder/dev | Pendiente | Backend mínimo |
| DESIGN | Ampliar banco de imágenes de ejemplo | P2 | Founder | Pendiente | — |
| TECH | Arreglar bug de claves duplicadas en `/inicio` | P0 | Dev | Pendiente | — |
| TECH | Backend mínimo (auth real + BD) para el nicho piloto | P0 | Dev | Pendiente | Decisión de stack (Supabase/Postgres recomendado por el propio README) |
| SECURITY | Definir política de "no pagos in-app" y comunicarla en producto | P0 | Founder | Pendiente | — |
| LEGAL | Consulta con abogado sobre intermediación de alquiler y RGPD | P0 | Founder + asesor externo | Pendiente | — |
| ANALYTICS | Instrumentar eventos mínimos (Fase 24) | P1 | Dev | Pendiente | Backend mínimo |
| MARKETING | Quitar cifras de tracción y testimonios falsos | P0 | Founder | Pendiente | — |
| MARKETING | Contacto inicial con ESN Madrid/UCM/UPM | P0 | Founder | Pendiente | — |
| SUPPORT | Sustituir el "reporte" cosmético por un canal real (aunque sea un email/WhatsApp del founder) | P0 | Founder | Pendiente | — |
| CONTENT | Contenido educativo sobre cómo evitar estafas de alquiler | P1 | Founder | Pendiente | — |
| USERS | Reclutar primeros 5-6 anfitriones reales | P0 | Founder | Pendiente | — |
| OPERATIONS | Proceso manual de verificación de universidad documentado | P0 | Founder | Pendiente | — |
| BUSINESS | Decidir modelo de monetización futuro (destacados) sin activarlo aún | P2 | Founder | Pendiente | — |

---

## 24. Analytics

Tracking plan inicial (eventos mínimos, sin necesidad de plataforma sofisticada al principio — puede ser un hoja de cálculo manual en la fase 0-50 usuarios):

`signup`, `university_verified`, `onboarding_completed`, `property_viewed`, `property_saved`, `property_contacted`, `message_sent`, `message_first_reply_time`, `listing_created`, `listing_republished_next_cohort`, `deal_closed_reported` (autodeclarado vía encuesta corta), `report_submitted`, `report_resolved`, `referral_signup`.

🟩 **RECOMMENDATION:** priorizar `property_contacted`, `message_sent` y `deal_closed_reported` sobre cualquier métrica de vanidad (visitas, registros) desde el primer día — son las únicas que responden a la pregunta real: ¿esto está resolviendo el problema?

---

## 25. Experimentos

| # | Hipótesis | Experimento | Coste | Tiempo | Métrica | Resultado esperado | Decisión según resultado |
|---|---|---|---|---|---|---|---|
| 1 | Los anfitriones actuales de Idealista/Badi cerca del campus aceptarán listar también en MiTribu si se lo pide el fundador directamente | Contactar 20 anunciantes reales uno a uno | Bajo (tiempo) | 1 semana | % que acepta | ≥25% acepta | Si <10%, replantear la propuesta de valor al anfitrión |
| 2 | ESN Madrid compartirá MiTribu con su cohorte entrante si se le presenta como recurso de seguridad frente a estafas | Reunión/email con ESN Madrid | Bajo | 2 semanas | Respuesta positiva / publicación compartida | Publicación o mención oficial | Si no hay respuesta, probar ESN de otra universidad o Granada |
| 3 | Los estudiantes prefieren verificación manual visible ("Verificado por MiTribu, universidad confirmada") a ningún sello de confianza | A/B cualitativo en entrevistas mostrando ambas versiones de tarjeta | Nulo | 1 semana | Preferencia declarada | Preferencia clara por la verificada | Si no hay diferencia percibida, no priorizar más inversión en el badge |
| 4 | El formulario largo de publicar reduce las publicaciones completadas frente a un asistente por pasos | Publicar manualmente con el founder por WhatsApp vs. dejar que el usuario use el formulario actual | Bajo | 2 semanas | % que completa sin ayuda | Founder detecta en qué paso abandonan | Si hay abandono claro en un campo, simplificarlo primero |
| 5 | Los estudiantes Erasmus responden mejor a contenido sobre "cómo evitar estafas" que a publicidad directa del producto | Publicar 2-3 posts educativos en grupos de Facebook | Nulo | 2 semanas | Clics/mensajes recibidos | Mayor engagement que un post promocional directo | Si no hay diferencia, simplificar mensaje a beneficio directo |
| 6 | Empezar por la oferta (anfitriones) genera más inventario útil que empezar por la demanda | Comparar resultados de reclutamiento de oferta vs. demanda en paralelo durante 2 semanas | Bajo | 2 semanas | Nº de anuncios reales vs. nº de búsquedas activas | Oferta crece más rápido con el mismo esfuerzo | Confirma o corrige la estrategia de Fase 18b |
| 7 | Un test de compatibilidad tipo Homi aumenta la intención de contacto entre desconocidos | Prototipo de formulario de "qué buscas en un compañero de piso" antes de mostrar contacto | Bajo | 1 semana | % que lo completa | >50% lo completa voluntariamente | Si es bajo, no es prioritario construirlo en producto |
| 8 | Los usuarios seguirán la conversación en WhatsApp en cuanto puedan, aunque exista chat in-app | Observar directamente las primeras 10 conversaciones | Nulo | Continuo desde el día 1 | % que pide WhatsApp en el primer mensaje | Alto (esperado) | Si es casi 100%, no invertir en pulir el chat in-app todavía; invertir en verificación previa al contacto |
| 9 | Los anfitriones vuelven a publicar la siguiente cohorte sin que se les pida | Seguimiento pasivo de los primeros anfitriones al inicio del siguiente cuatrimestre | Nulo | 1 cuatrimestre | % que republica espontáneamente | Señal de PMF si es alto | Ver Fase 20b |
| 10 | Un segundo campus (Autónoma) o ciudad (Granada) puede abrirse antes de tener liquidez sólida en Madrid | Simulación: intentar reclutar 5 anfitriones en la segunda ubicación antes de decidir expandir | Bajo | 2 semanas | Facilidad relativa de reclutamiento | Comparar esfuerzo/resultado con Madrid | No abrir la segunda ubicación si Madrid aún no tiene liquidez estable |

---

## 26. Riesgos

| Riesgo | Probabilidad | Impacto | Señal temprana | Mitigación |
|---|---|---|---|---|
| Falta de oferta (pocos anfitriones dispuestos a listar) | Alta | Alto | Búsquedas activas sin respuesta en días | Reclutamiento manual de oferta primero (Fase 18b) |
| Falta de demanda fuera de temporada de matrícula | Alta | Medio | Actividad cae fuera de agosto-sept./enero-feb. | Planificar el calendario de adquisición alrededor de las dos ventanas de intercambio, no de forma continua |
| Competencia de Idealista/Badi por volumen | Media | Medio | Anfitriones prefieren publicar solo ahí | Competir en confianza/verificación, no en volumen (Fase 4-5) |
| Fraude/estafa ocurre dentro o a través de MiTribu | Media | Muy alto (reputacional y potencialmente legal) | Cualquier denuncia de usuario | Verificación manual estricta, no pagos in-app, política educativa visible |
| Problemas legales por publicidad con cifras/testimonios no reales si se comparte antes de limpiarlo | Alta si no se corrige | Alto | — | Corregir en Fase 0 antes de cualquier tráfico externo |
| Coste de adquisición sube al salir del canal gratuito (ESN, grupos, boca a boca) | Media | Medio | CAC empieza a superar el valor percibido | No escalar marketing pagado hasta confirmar retención/PMF |
| Retención baja entre cohortes (cada Erasmus se va en 4-6 meses por definición) | Alta, es estructural | Medio | Usuarios no vuelven la cohorte siguiente | Diseñar la retención en torno al anfitrión (que sí permanece) y al referral entre cohortes, no en torno al estudiante de intercambio individual |
| Marketplace vacío si se activa demasiado pronto | Alta si se abre antes de tiempo | Medio | Cero actividad tras el lanzamiento de esa vertical | No activar marketplace hasta la Fase 4 del roadmap (Fase 21) |

---

## 27. Founder Recommendation

**Si yo fuera el fundador de MiTribu, esto es lo que haría:**

1. **Mercado:** España, empezando por una sola ciudad, no varias.
2. **Nicho:** estudiantes de intercambio (Erasmus/internacionales) que llegan a Madrid al entorno de Ciudad Universitaria (Complutense + Politécnica), con Granada como plan B si no hay red de contactos en Madrid.
3. **Problema a resolver primero:** encontrar habitación verificada y segura antes de/durante el primer mes en la ciudad, sin caer en las estafas de alquiler remoto que ya están documentadas y son recurrentes cada inicio de curso.
4. **Funcionalidades que mantendría:** publicar/buscar habitación, mensajería, perfil con verificación de universidad, favoritos, el propio sistema de diseño actual (es una fortaleza real).
5. **Funcionalidades que eliminaría (de lo visible, no del código):** cifras de tracción falsas, testimonios ficticios, badges de "verificado"/"reportado en 24h" que hoy no significan nada real.
6. **Funcionalidades que construiría a continuación:** backend mínimo real (auth + base de datos) acotado a un solo campus/ciudad; verificación manual de universidad como proceso, antes que como feature automatizada.
7. **Lo que NO construiría todavía:** marketplace de segunda mano completo, feed social abierto, sistema de pagos/depósitos in-app, matching algorítmico, verificación KYC automática.
8. **Cómo conseguiría los primeros 10:** reclutamiento uno a uno del fundador, empezando por la oferta (anfitriones con habitación libre cerca del campus), no por publicidad.
9. **Cómo conseguiría los primeros 100:** canal ESN Madrid/UCM/UPM formalizado + 1-2 embajadores de campus + referral entre la misma cohorte de Erasmus.
10. **Métricas que miraría:** contactos iniciados, tiempo hasta primera respuesta, cierres reales autodeclarados, y si los anfitriones vuelven a publicar la cohorte siguiente sin que se les pida. No registros ni descargas.
11. **Cuándo pivotaría:** si tras 2-3 cohortes con reclutamiento manual activo la tasa de cierre real se mantiene por debajo del 20% y los propios anfitriones dejan de responder — sería señal de que el problema no es de ejecución sino de que el nicho o el enfoque no encajan.
12. **Cuándo invertiría más:** cuando anfitriones y estudiantes empiecen a recomendar MiTribu sin que se les pida y el test de Sean Ellis supere el ~40% de "muy decepcionado" si desapareciera — ahí sí construiría el backend a escala, abriría una segunda ciudad y empezaría a explorar monetización con anuncios destacados.
13. **Cómo convertiría MiTribu en un negocio:** monetizando primero al anfitrión (destacados, verificación premium) y explorando acuerdos B2B con universidades una vez haya evidencia de que el flujo de acogida funciona para sus estudiantes entrantes — nunca cobrando al estudiante que ya está pagando precios de alquiler históricamente altos, y nunca gestionando pagos/depósitos dentro de la app hasta tener asesoría legal y volumen que lo justifiquen.

---

## Apéndice — Fuentes

1. [Badi — Sobre Badi](https://badi.com/es/sobre-badi)
2. [EjePrime — Badi Homes](https://www.ejeprime.com/empresa/badi-a-por-la-fiebre-del-alquiler-crea-badi-homes-para-gestionar-pisos-de-grandes-empresas)
3. [The New Barcelona Post — Badi y hoteles vacíos](https://www.thenewbarcelonapost.com/badi-se-lanza-al-alquiler-de-habitaciones-de-hoteles-vacios/)
4. [Wiley Online Library — The Platformization of Student Housing (Uniplaces, Lisboa)](https://onlinelibrary.wiley.com/doi/10.1111/tesg.12560)
5. [Luntero — Spotahome vs Uniplaces](https://www.luntero.com/resource/platform/comparison/spotahome-vs-uniplaces)
6. [Luntero — HousingAnywhere vs Spotahome vs Uniplaces](https://www.luntero.com/resource/platform/comparison/housinganywhere-vs-spotahome-vs-uniplaces)
7. [Ministerio de Ciencia, Innovación y Universidades — Estadísticas de internacionalización 2024](https://www.ciencia.gob.es/Noticias/2024/Noviembre/estadisticas-universidades-internacionalizacion.html)
8. [Ministerio de Ciencia — Erasmus+ 2024](https://www.ciencia.gob.es/Noticias/2024/Julio/erasmus-plus.html)
9. [Ministerio de Ciencia — Estadística de Estudiantes Universitarios 2024-2025 (PDF)](https://www.ciencia.gob.es/dam/jcr:08f45793-116d-4df2-8ddd-207662c3c6ee/PrincipalesResultadosEstudiantes2025.pdf)
10. [The Objective — España, principal destino Erasmus en 2023](https://theobjective.com/sociedad/2024-11-27/espana-principal-destino-erasmus-2023/)
11. [Sinmaletas — Universidades españolas con más estudiantes Erasmus](https://sinmaletas.com/blog/8-universidades-de-espana-con-mas-estudiantes-erasmus/)
12. [Infobae — Alquiler de habitación hasta 700€ en Madrid y Barcelona (OCU, sept. 2026)](https://www.infobae.com/espana/2026/09/11/alquiler-una-habitacion-se-encarece-hasta-un-33-en-tres-anos-los-estudiantes-se-enfrentan-a-precios-de-700-euros-al-mes-en-madrid-y-barcelona/)
13. [Blog Homi — Cuánto cuesta compartir piso en España en 2026 (datos Idealista)](https://www.homi-app.com/blog/cuanto-cuesta-compartir-piso-espana-2026)
14. [Homi — plataforma de compañeros de piso](https://www.homi-app.com/)
15. [About Wallapop — Qué han buscado y comprado los españoles en 2024](https://about.wallapop.com/que-han-buscado-y-comprado-los-espanoles-en-wallapop-durante-2024/)
16. [Merca2 — Wallapop en 2025](https://www.merca2.es/2024/12/30/wallapop-2025-segunda-mano-2098074/)
17. [ESN Spain — Erasmus Student Network España](https://www.esn-spain.org/)
18. [The Objective — España cubre solo el 7% de la demanda de residencias](https://theobjective.com/economia/2025-12-18/espana-demanda-residencias-estudiantiles-alquiler/)
19. [que.es — Déficit de alojamiento universitario supera las 528.000 plazas](https://www.que.es/2026/07/17/deficit-alojamiento-universitario-espana/)
20. [Noticias de Navarra — Estafa a estudiantes Erasmus en San Sebastián](https://www.noticiasdenavarra.com/sociedad/2024/09/04/estudiantes-erasmus-alquilan-piso-san-8650870.html)
21. [Aragón Digital — Alerta por estafas de alquiler en Zaragoza](https://www.aragondigital.es/articulo/sucesos/alerta-zaragoza-estafas-alquiler-pisos-inicio-curso-universitario/202609091123441006789.html)
22. [Xataka — Cómo identificar y evitar estafas de alquiler a estudiantes](https://www.xataka.com/basics/estafas-alquiler-piso-estudiantes-como-identificarlas-como-evitarlas)

---

# NEXT 10 ACTIONS

1. **Arreglar el bug de claves duplicadas en `/inicio`.**
   Por qué: es un error real de React ya confirmado en consola, gratis de arreglar y visible para cualquier usuario que abra la home.
   Tiempo: 30-60 min. Prioridad: P0. Resultado esperado: consola limpia, sin warnings de React en `/inicio`.

2. **Quitar las cifras de tracción falsas (18.000 estudiantes, 1.200 pisos, 4.500 artículos) y los tres testimonios ficticios de la landing.**
   Por qué: es prueba social inventada presentada como real; riesgo de credibilidad y potencialmente de publicidad engañosa en cuanto alguien externo vea la página.
   Tiempo: 1-2 horas. Prioridad: P0. Resultado esperado: landing honesta, sin cifras ni testimonios no verificables.

3. **Acotar la demo/base de datos de ejemplo a una sola ciudad (Madrid) durante la fase de validación.**
   Por qué: el producto actual se comporta como si ya fuera nacional; esto contradice la estrategia de nicho y confunde tanto al founder como a los primeros usuarios.
   Tiempo: medio día. Prioridad: P0. Resultado esperado: `/inicio`, `/pisos`, `/marketplace`, `/comunidad` muestran por defecto solo contenido de Madrid.

4. **Contactar a ESN Madrid y a las oficinas de relaciones internacionales de la UCM y la UPM.**
   Por qué: es el canal de distribución gratuito más alineado con el nicho elegido y con mayor probabilidad de éxito temprano.
   Tiempo: 1 semana para primeras respuestas. Prioridad: P0. Resultado esperado: al menos un contacto/reunión confirmado.

5. **Reclutar manualmente 5-6 anfitriones reales con habitación libre cerca de Ciudad Universitaria (empezar por la oferta, no por la demanda).**
   Por qué: resuelve el problema de arranque en frío (Fase 18b) y da inventario real antes de traer demanda.
   Tiempo: 1-2 semanas. Prioridad: P0. Resultado esperado: 5-6 habitaciones reales, verificadas manualmente, publicadas.

6. **Definir y documentar el proceso manual de verificación de universidad (qué se pide, cómo se marca "Verificado").**
   Por qué: es la pieza central de la propuesta de valor (confianza) y hoy no existe ningún proceso, solo un badge decorativo.
   Tiempo: 1-2 días. Prioridad: P0. Resultado esperado: checklist repetible que cualquiera pueda ejecutar.

7. **Sustituir el botón "Reportar" cosmético por un canal real (aunque sea un WhatsApp/email del fundador) mientras no haya backend.**
   Por qué: el centro de ayuda promete una revisión en 24h que hoy es imposible de cumplir; es un riesgo de confianza innecesario.
   Tiempo: 1 día. Prioridad: P0. Resultado esperado: cualquier reporte llega de verdad a una persona.

8. **Reclutar los primeros 10 buscadores Erasmus reales desde grupos de Facebook/Telegram de la cohorte de destino.**
   Por qué: cierra el ciclo oferta-demanda y permite medir activation y cierre real por primera vez.
   Tiempo: 2 semanas. Prioridad: P0. Resultado esperado: al menos 3-5 contactos iniciados de verdad dentro de MiTribu.

9. **Hacer entrevistas cortas (10 min) a los primeros 10 usuarios y documentar respuestas.**
   Por qué: es la única forma de saber si el problema principal (Fase 8) está realmente bien identificado antes de escalar nada.
   Tiempo: 1 semana. Prioridad: P1. Resultado esperado: documento con aprendizajes y decisión de continuar/ajustar.

10. **Decidir el stack mínimo de backend real (recomendado: Supabase/Postgres, tal y como ya sugiere el propio README del repositorio) y planificar su implementación acotada al nicho piloto.**
    Por qué: sin backend real, MiTribu no puede pasar de "demo que uso yo" a "producto que usan dos personas distintas a la vez" — es el bloqueo técnico de fondo detrás de todo lo demás.
    Tiempo: decisión en 2-3 días, implementación mínima en 2-4 semanas en paralelo al reclutamiento manual. Prioridad: P0. Resultado esperado: plan técnico concreto con fechas.
