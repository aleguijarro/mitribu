import Link from "next/link";
import { Music2 } from "lucide-react";
import { siteConfig } from "@/lib/constants";

/** lucide-react ya no incluye logos de marca; usamos SVGs propios minimalistas. */
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 2h3.3l-7.2 8.2L23.5 22h-6.6l-5.2-6.8L5.8 22H2.5l7.7-8.8L1.5 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.8L7.4 3.9H5.5L17.7 20Z" />
    </svg>
  );
}

const columns = [
  {
    title: "Producto",
    links: [
      { label: "Pisos", href: "/pisos" },
      { label: "Marketplace", href: "/marketplace" },
      { label: "Comunidad", href: "/comunidad" },
      { label: "Solicitudes", href: "/solicitudes" },
      { label: "Precios", href: "/precios" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { label: "Sobre nosotros", href: "/sobre-nosotros" },
      { label: "Blog", href: "/blog" },
      { label: "Contacto", href: "/soporte" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Centro de ayuda", href: "/soporte" },
      { label: "Verificación", href: "/verificacion" },
      { label: "Seguridad", href: "/soporte#seguridad" },
      { label: "Reportar un problema", href: "/soporte#contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidad", href: "/legal/privacidad" },
      { label: "Términos", href: "/legal/terminos" },
      { label: "Cookies", href: "/legal/cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-tribu-gradient text-base font-bold text-primary-foreground">
                T
              </span>
              <span className="text-lg font-bold tracking-tight">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              La red de los estudiantes de intercambio en España.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="MiTribu en Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noreferrer"
                aria-label="MiTribu en TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
              >
                <Music2 className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.x}
                target="_blank"
                rel="noreferrer"
                aria-label="MiTribu en X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
              >
                <XIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Hecho con 💚 para estudiantes de intercambio.</p>
          <p>Madrid · Barcelona · Valencia · Sevilla · Granada</p>
        </div>
      </div>
    </footer>
  );
}
