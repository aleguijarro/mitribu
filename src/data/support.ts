import type { FaqItem, SupportCategory } from "@/types";

export const supportCategories: SupportCategory[] = [
  { id: "cuenta", label: "Cuenta", description: "Perfil, contraseña y verificación", icon: "UserCog" },
  { id: "propiedades", label: "Propiedades", description: "Publicar y buscar alojamiento", icon: "Home" },
  { id: "marketplace", label: "Marketplace", description: "Comprar y vender artículos", icon: "ShoppingBag" },
  { id: "pagos", label: "Pagos", description: "Cobros, señales y facturación", icon: "CreditCard" },
  { id: "seguridad", label: "Seguridad", description: "Estafas, denuncias y confianza", icon: "ShieldCheck" },
  { id: "mensajes", label: "Mensajes", description: "Chat, notificaciones y bloqueos", icon: "MessageCircle" },
  { id: "tecnico", label: "Problemas técnicos", description: "Errores, rendimiento y bugs", icon: "Wrench" },
];

export const faqs: FaqItem[] = [
  {
    id: "f1",
    category: "cuenta",
    question: "¿Cómo verifico mi cuenta de MiTribu?",
    answer:
      "Desde tu perfil, en 'Verificar perfil'. Primero confirmas que eres estudiante (con tu email universitario, tu carnet o tu certificado de matrícula) y después quién eres (DNI, NIE o pasaporte). Es obligatorio para enviar y aceptar solicitudes de alojamiento.",
  },
  {
    id: "f2",
    category: "cuenta",
    question: "¿Puedo cambiar mi universidad o ciudad más adelante?",
    answer:
      "Sí, puedes editarlo en cualquier momento desde 'Editar perfil'. Esto ayuda a MiTribu a mostrarte propiedades y publicaciones más relevantes para ti.",
  },
  {
    id: "f3",
    category: "propiedades",
    question: "¿Cómo publico una propiedad?",
    answer:
      "Pulsa en '+ Publicar', elige 'Propiedad' y completa el formulario con fotos, precio, fechas y características. Publicar es gratis. Si te vas de intercambio, es la forma más fácil de dejar tu habitación a otro estudiante que llega.",
  },
  {
    id: "f4",
    category: "propiedades",
    question: "¿Cuánto cuesta MiTribu?",
    answer:
      "Publicar es gratis. Si publicas, ver las solicitudes también es gratis: solo pagas 0,99 € cuando aceptas una y 19,99 € cuando marcáis el contrato como firmado. Si buscas, tienes una prueba gratuita con búsqueda ilimitada, 5 guardados y 3 contactos; después puedes pasarte a Premium (4,99 €/semana o 9,99 €/mes) o comprar un contacto suelto por 1,99 €. MiTribu nunca cobra alquileres ni fianzas.",
  },
  {
    id: "f5",
    category: "marketplace",
    question: "¿Cómo hago una oferta por un producto?",
    answer:
      "Entra en el producto que te interesa y pulsa 'Hacer oferta'. Podrás proponer un precio distinto al anunciado y el vendedor podrá aceptar, rechazar o contraofertar desde el chat.",
  },
  {
    id: "f6",
    category: "marketplace",
    question: "¿Qué pasa si el artículo no es como se describía?",
    answer:
      "Puedes reportar el anuncio o al vendedor desde la página del producto. Nuestro equipo revisa cada reporte en menos de 24 horas.",
  },
  {
    id: "f7",
    category: "pagos",
    question: "¿MiTribu gestiona los pagos entre usuarios?",
    answer:
      "No. El alquiler, la fianza o el precio de un producto se acuerdan directamente entre vosotros. MiTribu solo cobra sus propias tarifas (ver Precios). Desconfía de cualquiera que te pida una señal antes de ver el piso o firmar.",
  },
  {
    id: "f8",
    category: "seguridad",
    question: "¿Cómo reporto un anuncio sospechoso?",
    answer:
      "En cualquier ficha de propiedad o producto encontrarás el botón 'Reportar publicación'. Revisamos todos los reportes de forma prioritaria.",
  },
  {
    id: "f9",
    category: "seguridad",
    question: "¿Qué significa la insignia de 'Estudiante verificado'?",
    answer:
      "Que hemos comprobado que esa persona estudia (email universitario, carnet o matrícula) y su identidad (DNI, NIE o pasaporte). No es una garantía absoluta, pero reduce mucho el riesgo de estafa.",
  },
  {
    id: "f10",
    category: "mensajes",
    question: "¿Puedo bloquear a otro usuario?",
    answer:
      "Sí, desde cualquier conversación puedes silenciar o bloquear a un usuario. Dejará de poder escribirte y no verá cuándo estás en línea.",
  },
  {
    id: "f11",
    category: "tecnico",
    question: "La app va lenta o no me carga una página, ¿qué hago?",
    answer:
      "Prueba a refrescar o cerrar sesión y volver a entrar. Si el problema persiste, cuéntanoslo en el formulario de contacto con todo el detalle posible.",
  },
  {
    id: "f12",
    category: "cuenta",
    question: "¿Cómo elimino mi cuenta?",
    answer:
      "Desde Ajustes de cuenta > Privacidad puedes solicitar la eliminación de tu cuenta y todos tus datos asociados.",
  },
  {
    id: "f13",
    category: "seguridad",
    question: "¿Por qué no puedo compartir mi teléfono o mi Instagram?",
    answer:
      "Por seguridad, los datos de contacto (teléfonos, emails, enlaces, Instagram, WhatsApp o Telegram) se ocultan hasta que el propietario acepta la solicitud. Así evitamos que alguien saque a otros de la plataforma para estafarles. En cuanto se acepta, podéis compartir lo que queráis.",
  },
  {
    id: "f14",
    category: "propiedades",
    question: "¿Cómo funciona una solicitud de alojamiento?",
    answer:
      "Envías una solicitud con tus fechas y una presentación. El propietario ve gratis tu perfil verificado, tu universidad y tu mensaje. Si le encaja, la acepta y se abre el chat; a partir de ahí podéis hablar libremente, pasar a WhatsApp o llamaros. Cuando firméis, el propietario marca el contrato como firmado y el anuncio se retira.",
  },
  {
    id: "f15",
    category: "pagos",
    question: "¿Cómo cancelo Premium?",
    answer:
      "Premium se renueva automáticamente hasta que lo canceles. Entra en Precios y pulsa 'Cancelar renovación' antes de la fecha del siguiente cobro: seguirás teniendo Premium hasta el final del periodo pagado.",
  },
];

export function getFaqsByCategory(categoryId: string): FaqItem[] {
  return faqs.filter((f) => f.category === categoryId);
}
