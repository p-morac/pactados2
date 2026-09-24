"use client";

import { useRef, useState } from "react";
import { ArrowLeft, Check, Music2, Search } from "lucide-react";
import styles from "./selector-cancion.module.css";

const CANCIONES = [
  { titulo: "Shake it Off", artista: "Taylor Swift" },
  { titulo: "Despacito", artista: "Luis Fonsi" },
  { titulo: "Vivir mi vida", artista: "Marc Anthony" },
  { titulo: "Happy", artista: "Pharrell Williams" },
  { titulo: "La bicicleta", artista: "Carlos Vives y Shakira" },
];

function normalizar(texto: string) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es").trim();
}

type Props = { valor: string; onSeleccionar: (cancion: string) => void; claseBoton: string };

export function SelectorCancion({ valor, onSeleccionar, claseBoton }: Props) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const disparador = useRef<HTMLButtonElement>(null);
  const [busqueda, setBusqueda] = useState("");
  const [seleccion, setSeleccion] = useState("");
  const canciones = CANCIONES.filter(cancion => normalizar(`${cancion.titulo} ${cancion.artista}`).includes(normalizar(busqueda)));

  function abrir() {
    setBusqueda("");
    setSeleccion(valor);
    dialogo.current?.showModal();
  }

  function confirmar() {
    if (!seleccion) return;
    onSeleccionar(seleccion);
    dialogo.current?.close();
  }

  return (
    <>
      <button ref={disparador} className={claseBoton} type="button" onClick={abrir} aria-haspopup="dialog">
        <Music2 size={15} aria-hidden="true" /><span>{valor || "busca canción ♫"}</span>
      </button>
      <dialog ref={dialogo} className={styles.dialogo} aria-labelledby="selector-cancion-titulo" aria-describedby="selector-cancion-descripcion" onClose={() => disparador.current?.focus()}>
        <div className={styles.contenedor}>
          <header className={styles.cabecera}>
            <button className={styles.volver} type="button" aria-label="Volver sin cambiar la canción" onClick={() => dialogo.current?.close()}><ArrowLeft size={22} /></button>
            <h2 id="selector-cancion-titulo">Elegir canción</h2>
            <Music2 className={styles.notaCabecera} size={30} aria-hidden="true" />
          </header>
          <div className={styles.contenido}>
            <h3>Dale ritmo a tu hábito</h3>
            <p id="selector-cancion-descripcion" className={styles.descripcion}>Elige una canción para tu alarma</p>
            <div className={styles.buscador}>
              <Search size={19} aria-hidden="true" />
              <input type="search" aria-label="Buscar canción o artista" placeholder="Buscar canción o artista" value={busqueda} onChange={event => setBusqueda(event.target.value)} onKeyDown={event => { if (event.key === "Enter") event.preventDefault(); }} />
            </div>
            <p className={styles.etiqueta} id="selector-cancion-lista">CANCIONES</p>
            <ul className={styles.lista} aria-labelledby="selector-cancion-lista">
              {canciones.map(cancion => {
                const nombre = `${cancion.titulo} · ${cancion.artista}`;
                const activa = seleccion === nombre;
                return (
                  <li key={cancion.titulo}>
                    <button type="button" className={styles.opcion} aria-pressed={activa} onClick={() => setSeleccion(nombre)}>
                      <span className={styles.icono}><Music2 size={20} aria-hidden="true" /></span>
                      <span className={styles.detalle}><span className={styles.titulo}>{cancion.titulo}</span><span className={styles.artista}>{cancion.artista}</span></span>
                      {activa && <Check className={styles.marca} size={21} aria-hidden="true" />}
                    </button>
                  </li>
                );
              })}
            </ul>
            {canciones.length === 0 && <p className={styles.sinResultados} role="status">No encontramos canciones. Prueba con otro nombre o artista.</p>}
          </div>
          <footer className={styles.pie}>
            <p aria-live="polite">{seleccion || "Selecciona una canción para continuar"}</p>
            <button className={styles.usar} type="button" disabled={!seleccion} onClick={confirmar}>Usar canción</button>
          </footer>
        </div>
      </dialog>
    </>
  );
}
