'use client';

/**
 * app/valdrath/page.js
 * Motor de la novela visual VALDRATH.
 *
 * Estado principal:
 *   fase       — 'titulo' | 'juego'
 *   escenaId   — ID de la escena actual (ver config/valdrath.js)
 *   etapa      — 'narracion' | 'dialogos' | 'decisiones' | 'fin'
 *   coraje     — acumulado de valentía (afecta el final verdadero)
 *   historial  — { [escenaId]: índice de decisión elegida }
 *
 * Para editar la historia: modifica config/valdrath.js, no este archivo.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { escenas, ambientes, coloresPersonaje } from '../../config/valdrath';

// ── Variantes de animación reutilizables ─────────────────────
const FADE_SCENE  = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 } };
const FADE_PARRAF = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } };
const FADE_DLG    = { initial: { opacity: 0, x: 16 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -10 } };
const TRANS_MED   = { duration: 0.45, ease: 'easeInOut' };
const TRANS_FAST  = { duration: 0.35, ease: 'easeOut' };

// ════════════════════════════════════════════════════════════
// SUB-COMPONENTE: Partículas ambientales (solo cliente)
// ════════════════════════════════════════════════════════════
function ParticulasAmbiente({ tipo }) {
  const [parts, setParts] = useState([]);

  // Generamos posiciones aleatorias después del montaje para evitar
  // diferencias entre servidor y cliente (hydration mismatch)
  useEffect(() => {
    if (!tipo || tipo === 'ninguna') { setParts([]); return; }
    setParts(Array.from({ length: 9 }, (_, i) => ({
      id: i,
      x:   5 + Math.random() * 90,
      dur: 11 + Math.random() * 9,
      del: -(Math.random() * 16),
      sz:  (0.45 + Math.random() * 0.65).toFixed(2),
    })));
  }, [tipo]);

  // Símbolo visual por tipo de ambiente
  const simbolo = { brasa: '·✦·✦·✦·✦·', nieve: '·*·❄·*·❄·', ceniza: '·∘··∘··∘··', aurora: '✦·✦·✦·✦·✦' };
  const chars = (simbolo[tipo] || simbolo.ceniza).split('');

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {parts.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-[-8%] select-none heart-float"
          style={{ left: `${p.x}%`, fontSize: `${p.sz}rem`, opacity: 0.22,
                   animationDuration: `${p.dur}s`, animationDelay: `${p.del}s` }}
        >
          {chars[p.id % chars.length]}
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// SUB-COMPONENTE: Pantalla de título animada
// ════════════════════════════════════════════════════════════
function PantallaTitle({ onStart }) {
  const letras = 'VALDRATH'.split('');

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a0005 0%, #1a000e 50%, #0a0005 100%)' }}
    >
      <ParticulasAmbiente tipo="brasa" />

      {/* Glow de fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 45%, rgba(251,191,36,0.07) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Letras del título, entran escalonadas */}
      <div className="relative z-10 flex mb-3" aria-label="VALDRATH">
        {letras.map((l, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 42, rotateX: 80 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.35 + i * 0.11, duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="font-playfair font-bold select-none"
            style={{
              fontSize: 'clamp(2.8rem, 13vw, 5.5rem)',
              color: '#fbbf24',
              textShadow: '0 0 40px rgba(251,191,36,0.55), 0 0 90px rgba(251,191,36,0.18)',
              letterSpacing: '0.1em',
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>

      {/* Subtítulo */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.9 }}
        className="relative z-10 text-gray-500 text-xs tracking-[0.28em] uppercase font-light mb-10"
      >
        Una novela visual épica
      </motion.p>

      {/* Línea decorativa */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.1, duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-36 h-px mb-10"
        style={{ background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)', originX: 0.5 }}
        aria-hidden="true"
      />

      {/* Botón de inicio */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.7 }}
        className="relative z-10 flex flex-col items-center gap-3"
      >
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(251,191,36,0.5)' }}
          whileTap={{ scale: 0.96 }}
          className="px-9 py-4 font-playfair font-semibold text-lg rounded-2xl text-gray-900 select-none"
          style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            boxShadow: '0 0 25px rgba(251,191,36,0.35)',
          }}
        >
          Comenzar la historia
        </motion.button>
        <p className="text-gray-600 text-xs">Una historia de valentía y de amor</p>
      </motion.div>

      {/* Volver al inicio */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
        className="relative z-10 absolute bottom-8"
      >
        <Link href="/" className="text-gray-700 hover:text-gray-500 text-xs transition-colors">
          ← Volver al hub
        </Link>
      </motion.div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// SUB-COMPONENTE: Botón de avance (dentro de escena)
// ════════════════════════════════════════════════════════════
function BtnContinuar({ onClick, acento, texto = 'Continuar ›' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.96 }}
      className="mt-5 self-end px-6 py-2.5 rounded-xl text-sm font-medium border select-none"
      style={{ borderColor: `${acento}55`, color: acento, background: `${acento}12` }}
    >
      {texto}
    </motion.button>
  );
}

// ════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL: Motor de la novela visual
// ════════════════════════════════════════════════════════════
export default function ValadrathPage() {
  // ── Estado ───────────────────────────────────────────────
  const [fase,       setFase]       = useState('titulo');    // 'titulo' | 'juego'
  const [escenaId,   setEscenaId]   = useState('prologo');
  const [etapa,      setEtapa]      = useState('narracion'); // 'narracion'|'dialogos'|'decisiones'|'fin'
  const [parrafoIdx, setParrafoIdx] = useState(0);
  const [dialogoIdx, setDialogoIdx] = useState(0);
  const [coraje,     setCoraje]     = useState(0);
  const [historial,  setHistorial]  = useState({});

  // Escena y ambiente actuales
  const escena = escenas[escenaId];
  const amb    = ambientes[escena?.ambiente || 'neutro'];

  // ── Navegar a una nueva escena ──────────────────────────
  const irA = (id) => {
    setEscenaId(id);
    setEtapa('narracion');
    setParrafoIdx(0);
    setDialogoIdx(0);
  };

  // ── Avanzar dentro de la escena (tap/click en el área) ──
  const avanzar = () => {
    if (!escena) return;
    const hayDialogos  = (escena.dialogos?.length  || 0) > 0;
    const hayDecisions = (escena.decisiones?.length || 0) > 0;

    if (etapa === 'narracion') {
      if (parrafoIdx < escena.narracion.length - 1) {
        // Siguiente párrafo
        setParrafoIdx((p) => p + 1);
      } else if (hayDialogos) {
        setEtapa('dialogos'); setDialogoIdx(0);
      } else if (hayDecisions) {
        setEtapa('decisiones');
      } else if (escena.esFinal) {
        setEtapa('fin');
      } else {
        irA(escena.siguiente);
      }

    } else if (etapa === 'dialogos') {
      if (dialogoIdx < escena.dialogos.length - 1) {
        // Siguiente línea de diálogo
        setDialogoIdx((d) => d + 1);
      } else if (hayDecisions) {
        setEtapa('decisiones');
      } else if (escena.esFinal) {
        setEtapa('fin');
      } else {
        irA(escena.siguiente);
      }
    }
  };

  // ── El jugador elige una decisión ───────────────────────
  const elegir = (decision, idx) => {
    setHistorial((h) => ({ ...h, [escenaId]: idx }));
    setCoraje((c) => c + (decision.delta || 0));
    irA(decision.siguiente);
  };

  // ── Reiniciar el juego desde el principio ───────────────
  const reiniciar = () => {
    setEscenaId('prologo');
    setEtapa('narracion');
    setParrafoIdx(0);
    setDialogoIdx(0);
    setCoraje(0);
    setHistorial({});
    setFase('titulo');
  };

  // ════════════════════════════════════════════════════════
  // RENDER — PANTALLA DE TÍTULO
  // ════════════════════════════════════════════════════════
  if (fase === 'titulo') {
    return <PantallaTitle onStart={() => setFase('juego')} />;
  }

  if (!escena) return null;

  // ════════════════════════════════════════════════════════
  // RENDER — PANTALLA DE FINAL
  // ════════════════════════════════════════════════════════
  const renderFin = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="text-center py-4"
    >
      {/* Mensaje romántico — solo en final_verdadero */}
      {escena.mensajeRomantico && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-8 p-6 rounded-2xl border ember-glow"
          style={{ background: `${amb.acento}12`, borderColor: `${amb.acento}50` }}
        >
          <div className="text-3xl mb-3">💕</div>
          <p
            className="font-playfair italic text-base leading-relaxed"
            style={{ color: amb.textoTitulo }}
          >
            &ldquo;{escena.mensajeRomantico}&rdquo;
          </p>
        </motion.div>
      )}

      {/* Indicador de fin */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-3xl mb-3" style={{ color: amb.acento }}>✦</div>
        <p
          className="font-playfair text-2xl font-bold mb-1"
          style={{ color: amb.textoTitulo }}
        >
          {escena.titulo}
        </p>
        <p className="text-xs mb-2" style={{ color: `${amb.acento}90` }}>
          {escena.capitulo}
        </p>
        <p className="text-xs mb-8 tracking-wider" style={{ color: `${amb.acento}60` }}>
          Valentía acumulada: {Math.max(0, coraje)} puntos
        </p>
      </motion.div>

      {/* Botones de reinicio */}
      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        <motion.button
          onClick={reiniciar}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="py-3.5 rounded-xl font-semibold text-sm text-white select-none"
          style={{ background: `linear-gradient(135deg, ${amb.acento}80, ${amb.acento})`,
                   boxShadow: `0 0 20px ${amb.acento}30` }}
        >
          Jugar de nuevo
        </motion.button>
        <Link
          href="/"
          className="py-3 rounded-xl text-sm text-center border select-none"
          style={{ borderColor: `${amb.acento}35`, color: `${amb.acento}cc` }}
        >
          ← Volver al hub
        </Link>
      </div>
    </motion.div>
  );

  // ════════════════════════════════════════════════════════
  // RENDER — JUEGO PRINCIPAL
  // ════════════════════════════════════════════════════════
  return (
    <div
      className="min-h-dvh flex flex-col relative overflow-hidden"
      style={{ background: amb.bg, transition: 'background 1.2s ease' }}
    >
      {/* Partículas de ambiente */}
      <ParticulasAmbiente tipo={amb.particula} />

      {/* Glow atmosférico de fondo */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${amb.acento}08 0%, transparent 65%)` }}
        aria-hidden="true"
      />

      {/* ── Barra de capítulo ──────────────────────────── */}
      <header className="relative z-10 flex items-center justify-between px-5 pt-5 pb-3">
        <Link
          href="/"
          className="text-xs font-medium transition-colors select-none"
          style={{ color: `${amb.acento}88` }}
        >
          ← Inicio
        </Link>
        <span
          className="text-[11px] tracking-widest uppercase font-light"
          style={{ color: `${amb.acento}65` }}
        >
          {escena.capitulo}
        </span>
        {/* Indicador de coraje */}
        <span className="text-xs" style={{ color: `${amb.acento}55` }} title="Valentía acumulada">
          ✦ {Math.max(0, coraje)}
        </span>
      </header>

      {/* ── Contenido principal — transición entre escenas ── */}
      <main className="relative z-10 flex-1 flex flex-col px-5 pb-8 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={escenaId}
            initial={FADE_SCENE.initial}
            animate={FADE_SCENE.animate}
            exit={FADE_SCENE.exit}
            transition={TRANS_MED}
            className="flex-1 flex flex-col"
          >
            {/* Título de escena */}
            {escena.titulo && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="font-playfair text-2xl md:text-3xl font-bold mb-5 mt-2 leading-tight"
                style={{ color: amb.textoTitulo, textShadow: `0 0 22px ${amb.acento}35` }}
              >
                {escena.titulo}
              </motion.h2>
            )}

            {/* ── NARRACIÓN ─────────────────────────────── */}
            {etapa === 'narracion' && (
              <div className="flex-1 flex flex-col justify-between">
                {/* Área de texto con transición por párrafo */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={parrafoIdx}
                    initial={FADE_PARRAF.initial}
                    animate={FADE_PARRAF.animate}
                    exit={{ opacity: 0, y: -6 }}
                    transition={TRANS_FAST}
                    className="leading-[1.85] text-base flex-1"
                    style={{ color: '#c9cdd4', fontStyle: 'italic' }}
                  >
                    {escena.narracion[parrafoIdx]}
                  </motion.p>
                </AnimatePresence>

                <div className="flex justify-between items-center mt-6">
                  <span className="text-xs" style={{ color: `${amb.acento}55` }}>
                    {parrafoIdx + 1} / {escena.narracion.length}
                  </span>
                  <BtnContinuar onClick={avanzar} acento={amb.acento} />
                </div>
              </div>
            )}

            {/* ── DIÁLOGOS ─────────────────────────────── */}
            {etapa === 'dialogos' && (() => {
              const dlg   = escena.dialogos[dialogoIdx];
              const color = coloresPersonaje[dlg.personaje] || coloresPersonaje.Narrador;
              return (
                <div className="flex-1 flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={dialogoIdx}
                      initial={FADE_DLG.initial}
                      animate={FADE_DLG.animate}
                      exit={FADE_DLG.exit}
                      transition={TRANS_FAST}
                      className="rounded-2xl p-5 border"
                      style={{
                        background: color.bg,
                        borderColor: color.borde,
                        boxShadow:   `0 0 24px ${color.borde}25`,
                      }}
                    >
                      {/* Nombre del personaje */}
                      <div
                        className="text-[11px] font-bold uppercase tracking-widest mb-3"
                        style={{ color: color.nombre }}
                      >
                        {dlg.personaje}
                      </div>
                      {/* Texto del diálogo */}
                      <p className="leading-relaxed text-gray-200 text-sm md:text-base">
                        {dlg.texto === '...'
                          ? <span className="text-2xl tracking-widest opacity-40">…</span>
                          : `"${dlg.texto}"`}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-between items-center mt-6">
                    <span className="text-xs" style={{ color: `${amb.acento}55` }}>
                      {dialogoIdx + 1} / {escena.dialogos.length}
                    </span>
                    <BtnContinuar onClick={avanzar} acento={amb.acento} />
                  </div>
                </div>
              );
            })()}

            {/* ── DECISIONES ───────────────────────────── */}
            {etapa === 'decisiones' && (
              <div className="flex-1 flex flex-col">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-[11px] uppercase tracking-[0.2em] mb-4"
                  style={{ color: `${amb.acento}80` }}
                >
                  — Tu decisión —
                </motion.p>

                <div className="space-y-3 flex-1">
                  {escena.decisiones.map((d, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.13, duration: 0.38 }}
                      whileHover={{ scale: 1.025, y: -2 }}
                      whileTap={{ scale: 0.975 }}
                      onClick={() => elegir(d, i)}
                      className="w-full text-left px-5 py-4 rounded-2xl border text-sm
                                 leading-relaxed select-none transition-shadow duration-200"
                      style={{
                        background:   d.esVerdadero ? `${amb.acento}18` : '#ffffff07',
                        borderColor:  d.esVerdadero ? `${amb.acento}80` : `${amb.acento}28`,
                        color:        d.esVerdadero ? amb.textoTitulo   : '#cbd5e1',
                        boxShadow:    d.esVerdadero ? `0 0 18px ${amb.acento}20` : 'none',
                      }}
                    >
                      {/* Etiqueta especial para el camino de valentía */}
                      {d.esVerdadero && (
                        <div
                          className="text-[10px] font-bold uppercase tracking-widest mb-2"
                          style={{ color: amb.acento }}
                        >
                          ✦ Camino de valentía
                        </div>
                      )}
                      {d.texto}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* ── PANTALLA DE FINAL ─────────────────────── */}
            {etapa === 'fin' && renderFin()}

          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
