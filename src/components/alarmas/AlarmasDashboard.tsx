"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, Music2 } from "lucide-react";
import styles from "./alarmas.module.css";

type Alarma = { id: string; nombre: string; hora: number; minuto: number; dias: number[]; descripcion: string; activa: boolean; cancion?: string };
const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const LETRAS = ["L", "M", "X", "J", "V", "S", "D"];
const TODOS = [0, 1, 2, 3, 4, 5, 6];
const INICIALES: Alarma[] = [
  { id: "perro", nombre: "Sacar al perro", hora: 7, minuto: 0, dias: TODOS, descripcion: "", activa: true },
  { id: "agua-am", nombre: "Tomar Agua", hora: 7, minuto: 40, dias: TODOS, descripcion: "", activa: true },
  { id: "leer", nombre: "Leer la odisea", hora: 16, minuto: 0, dias: [0, 2, 4], descripcion: "", activa: true },
  { id: "agua-pm", nombre: "Tomar Agua", hora: 18, minuto: 0, dias: TODOS, descripcion: "", activa: true },
];
const STORAGE = "pactados-alarmas-v1";
function esAlarma(value: unknown): value is Alarma {
  if (!value || typeof value !== "object") return false;
  const a = value as Alarma;
  return typeof a.id === "string" && typeof a.nombre === "string" && typeof a.descripcion === "string" && typeof a.activa === "boolean" && Number.isInteger(a.hora) && a.hora >= 0 && a.hora < 24 && Number.isInteger(a.minuto) && a.minuto >= 0 && a.minuto < 60 && Array.isArray(a.dias) && a.dias.length > 0 && a.dias.every(d => Number.isInteger(d) && d >= 0 && d < 7);
}
function repeticion(dias: number[]) {
  return dias.length === 7 ? "todos los días" : dias.map(d => ["Lun", "Mar", "Mie", "Jue", "Vier", "Sáb", "Dom"][d]).join("-");
}

export function AlarmasDashboard() {
  const [alarmas, setAlarmas] = useState(INICIALES);
  const [cargado, setCargado] = useState(false);
  const [dias, setDias] = useState([0, 1, 2, 3, 4]);
  const [cancion, setCancion] = useState("");
  const [error, setError] = useState("");
  const modal = useRef<HTMLDialogElement>(null);
  const crear = useRef<HTMLButtonElement>(null);
  const audio = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(STORAGE) ?? "null");
      if (Array.isArray(saved) && saved.every(esAlarma)) setAlarmas(saved);
    } catch { /* Un almacenamiento no disponible no impide usar el formulario. */ }
    setCargado(true);
  }, []);
  useEffect(() => {
    if (cargado) {
      try { localStorage.setItem(STORAGE, JSON.stringify(alarmas)); } catch { /* Mantener la sesión en memoria. */ }
    }
  }, [alarmas, cargado]);

  function guardar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nombre = String(data.get("nombre") ?? "").trim();
    if (!nombre) { setError("Escribe el nombre del hábito."); return; }
    if (!dias.length) { setError("Selecciona al menos un día de repetición."); return; }
    const hora = Number(data.get("hora")) % 12 + (data.get("periodo") === "pm" ? 12 : 0);
    setAlarmas(actuales => [...actuales, { id: crypto.randomUUID(), nombre, hora, minuto: Number(data.get("minuto")), dias: [...dias].sort(), descripcion: String(data.get("descripcion") ?? "").trim(), activa: true, cancion }]);
    setError("");
    form.reset();
    setDias([0, 1, 2, 3, 4]);
    setCancion("");
    modal.current?.showModal();
  }

  const activas = alarmas.filter(a => a.activa).length;
  const pausadas = alarmas.length - activas;
  return (
    <div className={styles.dashboard}>
      <h1>TUS ALARMAS</h1>
      <p className={styles.resumen} aria-live="polite">{activas} {activas === 1 ? "Activa" : "Activas"}{pausadas > 0 ? `, ${pausadas === 1 ? "una pausada" : `${pausadas} pausadas`}` : ""}</p>
      <div className={styles.columnas}>
        <div className={styles.agenda}>
          {["MAÑANA", "TARDE"].map((titulo, index) => (
            <section key={titulo} aria-label={titulo}>
              <h2>{titulo}</h2>
              <ul className={styles.lista}>
                {alarmas.filter(a => index === 0 ? a.hora < 12 : a.hora >= 12).sort((a, b) => a.hora * 60 + a.minuto - b.hora * 60 - b.minuto).map(a => (
                  <li key={a.id}>
                    <div className={a.activa ? undefined : styles.pausada}>
                      <h3>{a.hora % 12 || 12}:{String(a.minuto).padStart(2, "0")} {a.hora < 12 ? "am" : "pm"}</h3>
                      <p>{a.nombre} · {repeticion(a.dias)}</p>
                    </div>
                    <button type="button" className={styles.interruptor} role="switch" aria-checked={a.activa} aria-label={`${a.activa ? "Pausar" : "Activar"} ${a.nombre}, ${a.hora}:${String(a.minuto).padStart(2, "0")}`} onClick={() => setAlarmas(actuales => actuales.map(item => item.id === a.id ? { ...item, activa: !item.activa } : item))}><span /></button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <form className={styles.formulario} onSubmit={guardar}>
          <p className={styles.eyebrow}>NUEVA ALARMA</p>
          <h2>Crear un hábito</h2>
          <label htmlFor="alarma-nombre">Nombre Alarma</label>
          <input id="alarma-nombre" name="nombre" placeholder="Escribe el nombre del hábito" required maxLength={100} />
          <label htmlFor="alarma-hora">Hora</label>
          <div className={styles.hora}>
            <input id="alarma-hora" name="hora" type="number" min="1" max="12" placeholder="00" required aria-label="Hora (1 a 12)" />
            <span>:</span>
            <input name="minuto" type="number" min="0" max="59" placeholder="00" required aria-label="Minutos" />
            <select name="periodo" defaultValue="" required aria-label="am o pm"><option value="" disabled>pm/am</option><option value="am">am</option><option value="pm">pm</option></select>
          </div>
          <fieldset className={styles.repeticion}>
            <legend>Repetición</legend>
            <div>{DIAS.map((dia, i) => <button key={dia} type="button" aria-label={dia} aria-pressed={dias.includes(i)} onClick={() => setDias(actuales => actuales.includes(i) ? actuales.filter(d => d !== i) : [...actuales, i])}>{LETRAS[i]}</button>)}</div>
          </fieldset>
          <label htmlFor="alarma-descripcion">Descripción</label>
          <textarea id="alarma-descripcion" name="descripcion" placeholder="Escribe una descripción..." rows={2} maxLength={500} />
          <input ref={audio} className={styles.archivo} type="file" accept="audio/*" aria-label="Seleccionar canción" onChange={event => setCancion(event.target.files?.[0]?.name ?? "")} />
          <button className={styles.cancion} type="button" onClick={() => audio.current?.click()}><Music2 size={15} /><span>{cancion || "busca canción ♫"}</span></button>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button ref={crear} className={styles.primario} type="submit">Crear Alarma</button>
        </form>
      </div>
      <dialog ref={modal} className={styles.modal} aria-labelledby="alarma-confirmacion" aria-describedby="alarma-mensaje" onClose={() => crear.current?.focus()}>
        <div className={styles.modalTitulo}><span><Check size={21} strokeWidth={2.5} /></span><h2 id="alarma-confirmacion">Nueva Alarma creada<br />satisfactoriamente</h2></div>
        <p id="alarma-mensaje">La nueva alarma ya está configurada y lista para sonar según el horario y repetición seleccionados.</p>
        <button className={styles.primario} type="button" autoFocus onClick={() => modal.current?.close()}>Entendido</button>
      </dialog>
    </div>
  );
}
