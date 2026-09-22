import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/** Logo completo (manos + fuego + "pactados") para fondos claros. */
export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-block rounded-2xl transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-fuego/30",
        className
      )}
    >
      <Image
        src="/pactados-logo.png"
        alt="Pactados"
        width={505}
        height={237}
        priority
        className="h-auto w-full object-contain"
      />
    </Link>
  );
}

/** Marca compacta: fuego + "Pactados" en Bebas. */
interface MarcaCompactaProps {
  className?: string;
  /** Texto claro para usar sobre el panel naranja. */
  claro?: boolean;
  /** Tamaño del texto "Pactados". */
  tamano?: "md" | "lg";
}

export function MarcaCompacta({ className, claro = false, tamano = "lg" }: MarcaCompactaProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span aria-hidden="true" className={cn("relative shrink-0", tamano === "lg" ? "h-10 w-8" : "h-8 w-6")}>
        <Image
          src="/fuego.png"
          alt=""
          fill
          sizes="40px"
          className="object-contain drop-shadow-[0_6px_10px_rgba(97,27,9,0.3)]"
        />
      </span>
      <span
        className={cn(
          "font-display leading-none tracking-wide",
          tamano === "lg" ? "text-[2.3rem]" : "text-[1.9rem]",
          claro ? "text-[#fff7ef] [text-shadow:0_6px_18px_rgba(97,27,9,0.3)]" : "text-tinta"
        )}
      >
        Pactados
      </span>
    </span>
  );
}
