import Image from "next/image";

import { cn } from "@/lib/utils";

interface FuegoProps {
  className?: string;
  /** Añade el halo amarillo que rodea el fuego en el hero de la landing. */
  conHalo?: boolean;
  priority?: boolean;
}

/** El fuego 3D de Pactados. Decorativo: siempre aria-hidden. */
export function Fuego({ className, conHalo = false, priority }: FuegoProps) {
  return (
    <span aria-hidden="true" className={cn("pointer-events-none relative inline-block", className)}>
      {conHalo ? (
        <span className="absolute inset-x-[-45%] bottom-[-6%] top-[20%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,243,175,0.9),rgba(255,205,76,0.5)_42%,transparent_72%)] blur-[10px]" />
      ) : null}
      <Image
        src="/fuego.png"
        alt=""
        fill
        sizes="160px"
        priority={priority}
        className="object-contain drop-shadow-[0_10px_14px_rgba(255,115,53,0.28)]"
      />
    </span>
  );
}
