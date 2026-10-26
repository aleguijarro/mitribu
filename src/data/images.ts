/**
 * Banco de imágenes de MiTribu.
 *
 * Todas las URLs apuntan a Unsplash (fotos reales, libres de uso) y pasan
 * por un helper que fija ancho/calidad para que el peso de página sea
 * razonable. Si más adelante conectas un backend con subida de imágenes
 * reales, solo tienes que sustituir estas funciones por las URLs que
 * devuelva tu almacenamiento (S3, Cloudinary, etc).
 */

function unsplash(id: string, width = 1200) {
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=80&auto=format&fit=crop`;
}

export const interiorPhotoIds = [
  "1502672260266-1c1ef2d93688",
  "1522708323590-d24dbb6b0267",
  "1484154218962-a197022b5858",
  "1493809842364-78817add7ffb",
  "1560448204-e02f11c3d0e2",
  "1560185893-a55cbc8c57e8",
  "1560185127-6ed189bf02f4",
  "1616486338812-3dadae4b4ace",
  "1598928506311-c55ded91a20c",
  "1571508601891-ca5e7a713859",
  "1522771739844-6a9f6d5f14af",
  "1567016376408-0226e4d0c1ea",
  "1586023492125-27b2c045efd7",
  "1554995207-c18c203602cb",
  "1533090161767-e6ffed986c88",
  "1584622650111-993a426fbf0a",
  "1556911220-bff31c812dba",
];

export const exteriorPhotoIds = [
  "1524758631624-e2822e304c36",
  "1449844908441-8829872d2607",
  "1502672023488-70e25813eb80",
];

export const communityPhotoIds = [
  "1498243691581-b145c3f54a5a",
  "1541339907198-e08756dedf3f",
  "1524178232363-1fb2b075b655",
  "1523580494863-6f3031224c94",
  "1506869640319-fe1a24fd76dc",
  "1522202176988-66273c2fd55f",
  "1571260899304-425eee4c7efc",
  "1517486808906-6ca8b3f04846",
  "1531482615713-2afd69097998",
  "1596496181848-3091d4878b24",
  "1490645935967-10de6ba17061",
  "1519452575417-564c1401ecc0",
  "1523289333742-be1143f6b766",
  "1573496359142-b8d87734a5a2",
  "1543807535-eceef0bc6599",
  "1517048676732-d65bc937f952",
  "1560250097-0b93528c311a",
  "1587614382346-4ec70e388b28",
];

export const productPhotoIds: Record<string, string[]> = {
  libros: ["1481627834876-b7833e8f5570", "1495446815901-a7297e633e8d", "1512820790803-83ca734da794"],
  apuntes: ["1495446815901-a7297e633e8d", "1512820790803-83ca734da794"],
  bicicletas: ["1485965120184-e220f721d03e", "1571068316344-75bc76f77890"],
  tecnologia: [
    "1496181133206-80ce9b88a853",
    "1517336714731-489689fd1ca8",
    "1550009158-9ebf69173e03",
    "1527443224154-c4a3942d3acf",
    "1547082299-de196ea013d6",
    "1486401899868-0e435ed85128",
    "1580327344181-c1163234e5a0",
  ],
  muebles: [
    "1503602642458-232111445657",
    "1519389950473-47ba0277781c",
    "1518770660439-4636190af475",
    "1554995207-c18c203602cb",
  ],
  ropa: ["1556905055-8f358a7a47b2", "1489987707025-afc232f7ea0f", "1521587760476-6c12a4b040da"],
  decoracion: ["1513519245088-0e12902e5a38", "1522075469751-3a6694fb2f61", "1524504388940-b1c1722653e1"],
  electrodomesticos: [
    "1523275335684-37898b6baf30",
    "1518481612222-68bbe828ecd1",
    "1595246140625-573b715d11dc",
    "1602143407151-7111542de6e8",
  ],
  otros: [
    "1553062407-98eeb64c6a62",
    "1587829741301-dc798b83add3",
    "1592078615290-033ee584e267",
    "1615397349754-cfa2066a298e",
    "1622560480605-d83c853bc5c3",
    "1594938298603-c8148c4dae35",
    "1548036328-c9fa89d128fa",
    "1445205170230-053b83016050",
    "1560343090-f0409e92791a",
    "1543269865-cbf427effbad",
    "1543002588-bfa74002ed7e",
    "1543269664-56d93c1b41a6",
    "1517841905240-472988babdf9",
    "1571019613454-1cb2f99b2d8b",
    "1523240795612-9a054b0db644",
  ],
};

export function interiorPhoto(i: number, width = 1200) {
  return unsplash(interiorPhotoIds[i % interiorPhotoIds.length], width);
}

export function exteriorPhoto(i: number, width = 1200) {
  return unsplash(exteriorPhotoIds[i % exteriorPhotoIds.length], width);
}

export function communityPhoto(i: number, width = 1000) {
  return unsplash(communityPhotoIds[i % communityPhotoIds.length], width);
}

export function productPhoto(category: string, i: number, width = 900) {
  const pool = productPhotoIds[category] ?? productPhotoIds.otros;
  return unsplash(pool[i % pool.length], width);
}

/**
 * Avatares: usamos randomuser.me (fotografías reales generadas de forma
 * estable a partir de un índice) para que cada perfil se sienta humano
 * sin depender de assets propios.
 */
const avatarIndices: { gender: "women" | "men"; n: number }[] = [
  { gender: "women", n: 44 },
  { gender: "men", n: 32 },
  { gender: "women", n: 68 },
  { gender: "men", n: 54 },
  { gender: "women", n: 21 },
  { gender: "men", n: 76 },
  { gender: "women", n: 65 },
  { gender: "men", n: 12 },
  { gender: "women", n: 33 },
  { gender: "men", n: 85 },
  { gender: "women", n: 90 },
  { gender: "men", n: 41 },
  { gender: "women", n: 58 },
  { gender: "men", n: 23 },
  { gender: "women", n: 17 },
];

export function avatarPhoto(i: number) {
  const a = avatarIndices[i % avatarIndices.length];
  return `https://randomuser.me/api/portraits/${a.gender}/${a.n}.jpg`;
}

export const heroPhotoId = "1522202176988-66273c2fd55f";
export const heroPhoto = unsplash(heroPhotoId, 1600);
