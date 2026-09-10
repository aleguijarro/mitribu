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
      "Ve a tu perfil y pulsa en 'Verificar email'. Te enviaremos un enlace de confirmación. Verificar tu cuenta aumenta la confianza de otros estudiantes y mejora la visibilidad de tus anuncios.",
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
      "Pulsa en '+ Publicar' en la barra de navegación, elige 'Propiedad' y completa el formulario con fotos, precio, ubicación y características. Tu anuncio se revisa automáticamente y queda publicado al instante.",
  },
  {
    id: "f4",
    category: "propiedades",
    question: "¿MiTribu cobra comisión por alquilar un piso?",
    answer:
      "No. Publicar y contactar con propietarios es completamente gratuito. MiTribu no interviene en el cobro de alquileres ni fianzas entre particulares.",
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
      "Actualmente los pagos se acuerdan directamente entre estudiantes. Te recomendamos usar siempre el chat de MiTribu para dejar constancia de los acuerdos.",
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
    question: "¿Qué significa el check de 'Perfil verificado'?",
    answer:
      "Indica que hemos confirmado el email, y en muchos casos también el documento de identidad y la universidad del usuario. No es una garantía absoluta, pero reduce mucho el riesgo de fraude.",
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
];

export function getFaqsByCategory(categoryId: string): FaqItem[] {
  return faqs.filter((f) => f.category === categoryId);
}
