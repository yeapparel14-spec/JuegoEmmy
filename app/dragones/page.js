'use client';

import { useState } from 'react';
import BackButton from '../../components/BackButton';
import { content } from '../../config/content';

const { dragones: cfg } = content;

const MAX_HP    = 100;
const FIRE_CD   = cfg.habilidades.fuego.cooldown;

// ── Damage formula ─────────────────────────────────────────────
// stat × 0.30 × rnd(0.8–1.2) − def × 0.12 + 5  →  min 7 (atk) / 10 (fire)
function calcDmg(attacker, defender, type) {
  const stat   = type === 'fuego' ? attacker.fuego : attacker.ataque;
  const rnd    = 0.8 + Math.random() * 0.4;
  const raw    = stat * 0.30 * rnd - defender.defensa * 0.12 + 5;
  return Math.max(type === 'fuego' ? 10 : 7, Math.floor(raw));
}

// ── AI decision ────────────────────────────────────────────────
function aiDecision(aiHp, playerHp, fireCd) {
  if (fireCd === 0 && playerHp > 20 && Math.random() < 0.38) return 'fuego';
  if (aiHp < 28 && Math.random() < 0.32) return 'defender';
  return 'atacar';
}

// ── HpBar sub-component ────────────────────────────────────────
function HpBar({ hp, isPlayer }) {
  const pct = Math.max(0, (hp / MAX_HP) * 100);
  const color =
    pct > 55 ? (isPlayer ? 'from-amber-600 to-amber-400' : 'from-red-700 to-red-500')
    : pct > 25 ? 'from-orange-700 to-orange-500'
    : 'from-red-950 to-red-700';
  return (
    <div className="relative h-5 bg-gray-800 rounded-full overflow-hidden border border-gray-700/80">
      <div
        className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white/90 select-none">
        {hp} / {MAX_HP}
      </span>
    </div>
  );
}

// ── Stat mini-bar ──────────────────────────────────────────────
function StatBar({ value, color }) {
  return (
    <div className="h-1.5 bg-gray-800/80 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }} />
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────
export default function DragonesPage() {
  const [phase,   setPhase]   = useState('selection'); // selection | combat | victory | defeat
  const [player,  setPlayer]  = useState(null);
  const [selId,   setSelId]   = useState(null);       // for selection animation

  // Combat state
  const [playerHp,       setPlayerHp]       = useState(MAX_HP);
  const [enemyHp,        setEnemyHp]        = useState(MAX_HP);
  const [playerFireCd,   setPlayerFireCd]   = useState(0);
  const [enemyFireCd,    setEnemyFireCd]    = useState(0);
  const [playerDefending,setPlayerDefending]= useState(false);
  const [enemyDefending, setEnemyDefending] = useState(false);
  const [log,    setLog]    = useState('');
  const [waiting,setWaiting]= useState(false);
  const [pShake, setPShake] = useState(false);
  const [eShake, setEShake] = useState(false);
  const [sparks, setSparks] = useState([]);  // fire particles

  const rival = cfg.rival;

  // Trigger screen shake
  const shake = (who) => {
    const set = who === 'player' ? setPShake : setEShake;
    set(true);
    setTimeout(() => set(false), 480);
  };

  // Spawn fire emoji particles
  const burstFire = () => {
    const FIRE_EMOJI = ['🔥', '💥', '🔥', '✨', '🔥'];
    const batch = Array.from({ length: 9 }, (_, i) => ({
      id: Date.now() + i,
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 55,
      emoji: FIRE_EMOJI[i % FIRE_EMOJI.length],
      size: (1 + Math.random() * 1.3).toFixed(2),
      delay: (Math.random() * 0.28).toFixed(2),
    }));
    setSparks(batch);
    setTimeout(() => setSparks([]), 950);
  };

  // Start combat after selection animation
  const startCombat = (char) => {
    if (selId) return;
    setSelId(char.id);
    setTimeout(() => {
      setPlayer(char);
      setPlayerHp(MAX_HP);
      setEnemyHp(MAX_HP);
      setPlayerFireCd(0);
      setEnemyFireCd(0);
      setPlayerDefending(false);
      setEnemyDefending(false);
      setLog(cfg.mensajesCombate.inicio(char.nombre, char.dragon));
      setWaiting(false);
      setPhase('combat');
    }, 500);
  };

  // Player performs an action
  const act = (action) => {
    if (waiting || phase !== 'combat') return;
    if (action === 'fuego' && playerFireCd > 0) return;
    setWaiting(true);

    // ── Compute player action ───────────────────────────────
    let newEnemyHp       = enemyHp;
    let newPlayerFireCd  = Math.max(0, playerFireCd - 1);
    const newEnemyFireCd = Math.max(0, enemyFireCd - 1);  // also ticks down
    let nextPDef = false;
    let msg = '';

    if (action === 'atacar') {
      const raw = calcDmg(player, rival, 'atacar');
      const dmg = enemyDefending ? Math.floor(raw * 0.45) : raw;
      newEnemyHp = Math.max(0, enemyHp - dmg);
      msg = cfg.mensajesCombate.atacarJugador(player.nombre, player.dragon, dmg);
      shake('enemy');
    } else if (action === 'fuego') {
      const raw = calcDmg(player, rival, 'fuego');
      const dmg = enemyDefending ? Math.floor(raw * 0.45) : raw;
      newEnemyHp = Math.max(0, enemyHp - dmg);
      newPlayerFireCd = FIRE_CD;
      msg = cfg.mensajesCombate.fuegoJugador(player.nombre, player.dragon, dmg);
      burstFire();
      shake('enemy');
    } else {
      nextPDef = true;
      msg = cfg.mensajesCombate.defenderJugador(player.nombre);
    }

    setEnemyHp(newEnemyHp);
    setPlayerFireCd(newPlayerFireCd);
    setPlayerDefending(nextPDef);
    setEnemyDefending(false);
    setLog(msg);

    if (newEnemyHp <= 0) {
      setTimeout(() => setPhase('victory'), 750);
      setWaiting(false);
      return;
    }

    // Capture locals for AI closure (avoid stale state)
    const capPlayerHp      = playerHp;
    const capNewEnemyHp    = newEnemyHp;
    const capNewEnemyFireCd= newEnemyFireCd;
    const capNextPDef      = nextPDef;

    // ── AI acts after delay ─────────────────────────────────
    setTimeout(() => {
      const aiAct = aiDecision(capNewEnemyHp, capPlayerHp, capNewEnemyFireCd);
      let newPlayerHp     = capPlayerHp;
      let finalEnemyFireCd= capNewEnemyFireCd;
      let nextEDef = false;
      let aiMsg = '';

      if (aiAct === 'atacar') {
        const raw = calcDmg(rival, player, 'atacar');
        const dmg = capNextPDef ? Math.floor(raw * 0.45) : raw;
        newPlayerHp = Math.max(0, capPlayerHp - dmg);
        aiMsg = cfg.mensajesCombate.atacarRival(rival.nombre, rival.dragon, dmg);
        if (capNextPDef) aiMsg += ' ' + cfg.mensajesCombate.bloqueado;
        shake('player');
      } else if (aiAct === 'fuego') {
        const raw = calcDmg(rival, player, 'fuego');
        const dmg = capNextPDef ? Math.floor(raw * 0.45) : raw;
        newPlayerHp = Math.max(0, capPlayerHp - dmg);
        finalEnemyFireCd = FIRE_CD;
        aiMsg = cfg.mensajesCombate.fuegoRival(rival.nombre, rival.dragon, dmg);
        if (capNextPDef) aiMsg += ' ' + cfg.mensajesCombate.bloqueado;
        burstFire();
        shake('player');
      } else {
        nextEDef = true;
        aiMsg = cfg.mensajesCombate.defenderRival(rival.nombre);
      }

      setPlayerHp(newPlayerHp);
      setEnemyFireCd(finalEnemyFireCd);
      setEnemyDefending(nextEDef);
      setLog(aiMsg);
      setWaiting(false);

      if (newPlayerHp <= 0) setTimeout(() => setPhase('defeat'), 700);
    }, 1300);
  };

  const restart = (sameChar) => {
    setSparks([]);
    if (!sameChar) {
      setPhase('selection');
      setSelId(null);
      setPlayer(null);
    } else {
      setPlayerHp(MAX_HP);
      setEnemyHp(MAX_HP);
      setPlayerFireCd(0);
      setEnemyFireCd(0);
      setPlayerDefending(false);
      setEnemyDefending(false);
      setLog(cfg.mensajesCombate.reinicio(player.nombre, player.dragon));
      setWaiting(false);
      setPhase('combat');
    }
  };

  // ════════════════════════════════════════════════════════════
  // RENDER — SELECTION
  // ════════════════════════════════════════════════════════════
  if (phase === 'selection') {
    return (
      <div className="min-h-dvh bg-gray-950 text-white flex flex-col items-center
                      px-4 pt-8 pb-14 relative overflow-hidden">
        {/* Atmospheric glows */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80
                          bg-red-900/25 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-56 h-56
                          bg-amber-900/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 self-start mb-7"><BackButton /></div>

        {/* Title */}
        <div className="relative z-10 text-center mb-7">
          <div className="text-5xl mb-3 animate-float inline-block">🐉</div>
          <h1 className="font-playfair text-4xl font-bold tracking-wide"
              style={{ color: '#fbbf24', textShadow: '0 0 30px rgba(251,191,36,0.35)' }}>
            {cfg.titulo}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{cfg.subtitulo}</p>
          <p className="mt-3 text-amber-700/80 text-xs tracking-widest uppercase font-medium">
            — {cfg.textoSeleccion} —
          </p>
        </div>

        {/* Character cards */}
        <div className="relative z-10 grid grid-cols-2 gap-3 w-full max-w-sm">
          {cfg.personajes.map((char) => {
            const isSelected = selId === char.id;
            return (
              <button
                key={char.id}
                onClick={() => startCombat(char)}
                disabled={selId !== null}
                className={[
                  'relative flex flex-col items-center text-center p-4 rounded-2xl border-2',
                  'transition-all duration-300 overflow-hidden text-left',
                  isSelected
                    ? 'scale-105 border-amber-400 ring-2 ring-amber-400/40'
                    : 'hover:scale-[1.03] active:scale-[0.98]',
                ].join(' ')}
                style={{
                  background: char.gradient,
                  borderColor: isSelected ? '#fbbf24' : char.borderColor,
                  boxShadow: isSelected ? `0 0 20px ${char.glowColor}` : 'none',
                }}
              >
                {isSelected && (
                  <div className="absolute inset-0 bg-amber-400/10 animate-pulse" aria-hidden="true" />
                )}

                <div className="text-4xl mb-2 w-full text-center">{char.dragonEmoji}</div>
                <div className="font-playfair font-bold text-white text-sm leading-tight w-full text-center">
                  {char.nombre}
                </div>
                <div className="text-amber-400/90 text-xs mt-0.5 font-medium w-full text-center">
                  🐉 {char.dragon}
                </div>
                <p className="text-gray-400 text-[11px] mt-1.5 leading-tight w-full text-center">
                  {char.descripcion}
                </p>

                {/* Stats */}
                <div className="w-full mt-3 space-y-1.5">
                  {[
                    { label: '⚔️', key: 'ataque',  color: 'bg-red-500' },
                    { label: '🛡️', key: 'defensa', color: 'bg-blue-500' },
                    { label: '🔥', key: 'fuego',   color: 'bg-orange-500' },
                  ].map(({ label, key, color }) => (
                    <div key={key}>
                      <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
                        <span>{label}</span>
                        <span>{char[key]}</span>
                      </div>
                      <StatBar value={char[key]} color={color} />
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════
  // RENDER — VICTORY / DEFEAT
  // ════════════════════════════════════════════════════════════
  if (phase === 'victory' || phase === 'defeat') {
    const isWin = phase === 'victory';
    return (
      <div className="min-h-dvh bg-gray-950 flex flex-col items-center justify-center
                      px-5 pb-12 relative overflow-hidden">
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ background: isWin ? 'radial-gradient(circle at 50% 30%, rgba(251,191,36,0.08) 0%, transparent 70%)'
                                     : 'radial-gradient(circle at 50% 30%, rgba(127,29,29,0.15) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 text-center max-w-sm w-full">
          <div className="text-7xl mb-4 animate-bounce-soft">{isWin ? '🏆' : '💀'}</div>

          <h2
            className="font-playfair text-3xl font-bold mb-4 leading-tight"
            style={{ color: isWin ? '#fbbf24' : '#ef4444',
                     textShadow: isWin ? '0 0 25px rgba(251,191,36,0.4)' : '0 0 20px rgba(239,68,68,0.4)' }}
          >
            {isWin ? cfg.victoria : cfg.derrota}
          </h2>

          {/* Romantic message on win */}
          {isWin && (
            <div className="bg-gray-900/90 border border-amber-900/50 rounded-2xl p-5 mb-6 shadow-xl ember-glow">
              <div className="text-3xl mb-2">💕</div>
              <p className="font-playfair italic text-amber-200/90 text-base leading-relaxed">
                &ldquo;{cfg.mensajeVictoria}&rdquo;
              </p>
            </div>
          )}

          {!isWin && (
            <p className="text-gray-600 text-sm mb-6">Los valientes siempre se levantan de nuevo.</p>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={() => restart(true)}
              className="w-full py-3.5 rounded-xl font-bold text-white transition-all
                         duration-200 active:scale-95 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)',
                       boxShadow: '0 4px 20px rgba(220,38,38,0.3)' }}
            >
              {cfg.botonRevancha}
            </button>
            <button
              onClick={() => restart(false)}
              className="w-full py-3.5 rounded-xl font-medium text-gray-300 bg-gray-800
                         border border-gray-700 hover:bg-gray-700 transition-all
                         duration-200 active:scale-95"
            >
              {cfg.botonCambiarPersonaje}
            </button>
            <div className="mt-1"><BackButton /></div>
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════
  // RENDER — COMBAT
  // ════════════════════════════════════════════════════════════
  return (
    <div className="min-h-dvh bg-gray-950 text-white flex flex-col px-4 pt-6 pb-5 relative overflow-hidden">
      {/* Atmospheric gradient */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-red-950/30 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />
      </div>

      {/* Fire particle overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
        {sparks.map((s) => (
          <div
            key={s.id}
            className="fire-particle"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              fontSize: `${s.size}rem`,
              animationDelay: `${s.delay}s`,
            }}
          >
            {s.emoji}
          </div>
        ))}
      </div>

      {/* Back button */}
      <div className="relative z-10 mb-4"><BackButton /></div>

      {/* ── Enemy ─────────────────────────────────────────────── */}
      <div
        className={`relative z-10 rounded-2xl p-4 mb-3 border transition-transform
                    ${eShake ? 'shake' : ''}`}
        style={{ background: 'linear-gradient(135deg, #1a0000 0%, #2d0a0a 100%)',
                 borderColor: '#7f1d1d' }}
      >
        <div className="flex items-center gap-3 mb-2.5">
          <span className="text-3xl">{rival.dragonEmoji}</span>
          <div className="flex-1 min-w-0">
            <div className="font-playfair font-bold text-red-400 text-base leading-tight">
              {rival.nombre}
            </div>
            <div className="text-gray-600 text-xs">🐉 {rival.dragon} · {rival.titulo}</div>
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
            {enemyDefending && (
              <span className="text-[10px] bg-blue-950/70 border border-blue-800/60
                               text-blue-300 px-2 py-0.5 rounded-full">🛡️</span>
            )}
            {enemyFireCd > 0 && (
              <span className="text-[10px] bg-orange-950/70 border border-orange-900/60
                               text-orange-400 px-2 py-0.5 rounded-full">🔥{enemyFireCd}</span>
            )}
          </div>
        </div>
        <HpBar hp={enemyHp} isPlayer={false} />
      </div>

      {/* ── Battle log ────────────────────────────────────────── */}
      <div className="relative z-10 bg-gray-900/70 border border-gray-800/80 rounded-xl
                      px-4 py-3 mb-3 min-h-[52px] flex items-center">
        <p className="text-gray-300 text-sm leading-snug">{log || '…'}</p>
      </div>

      {/* ── Player ────────────────────────────────────────────── */}
      {player && (
        <div
          className={`relative z-10 rounded-2xl p-4 mb-4 border transition-transform
                      ${pShake ? 'shake' : ''}`}
          style={{ background: player.gradient, borderColor: player.borderColor }}
        >
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-3xl">{player.dragonEmoji}</span>
            <div className="flex-1 min-w-0">
              <div className="font-playfair font-bold text-amber-400 text-base leading-tight">
                {player.nombre}
              </div>
              <div className="text-gray-500 text-xs">🐉 {player.dragon}</div>
            </div>
            <div className="flex gap-1.5 flex-shrink-0">
              {playerDefending && (
                <span className="text-[10px] bg-blue-950/70 border border-blue-800/60
                                 text-blue-300 px-2 py-0.5 rounded-full">🛡️</span>
              )}
              {playerFireCd > 0 && (
                <span className="text-[10px] bg-orange-950/70 border border-orange-900/60
                                 text-orange-400 px-2 py-0.5 rounded-full">🔥{playerFireCd}</span>
              )}
            </div>
          </div>
          <HpBar hp={playerHp} isPlayer={true} />
        </div>
      )}

      {/* ── Action buttons ────────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-2 gap-2 mt-auto">
        {/* Atacar */}
        <button
          onClick={() => act('atacar')}
          disabled={waiting}
          className="py-4 rounded-xl font-bold text-sm text-white
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-200 active:scale-95 hover:brightness-110"
          style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)',
                   boxShadow: '0 4px 14px rgba(220,38,38,0.25)' }}
        >
          {cfg.habilidades.atacar.emoji} {cfg.habilidades.atacar.nombre}
        </button>

        {/* Aliento de Fuego */}
        <button
          onClick={() => act('fuego')}
          disabled={waiting || playerFireCd > 0}
          className="py-4 rounded-xl font-bold text-sm text-white relative overflow-hidden
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-200 active:scale-95 hover:brightness-110"
          style={{ background: playerFireCd > 0
                    ? 'linear-gradient(135deg, #431407 0%, #7c2d12 100%)'
                    : 'linear-gradient(135deg, #92400e 0%, #f59e0b 100%)',
                   boxShadow: playerFireCd > 0 ? 'none' : '0 4px 14px rgba(245,158,11,0.3)' }}
        >
          {playerFireCd > 0
            ? cfg.textoCooldown(playerFireCd)
            : `${cfg.habilidades.fuego.emoji} ${cfg.habilidades.fuego.nombre}`}
        </button>

        {/* Defender */}
        <button
          onClick={() => act('defender')}
          disabled={waiting}
          className="col-span-2 py-3.5 rounded-xl font-bold text-sm text-gray-200
                     border border-gray-700 bg-gradient-to-r from-slate-800 to-slate-700
                     hover:from-slate-700 hover:to-slate-600
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-200 active:scale-95"
        >
          {cfg.habilidades.defender.emoji} {cfg.habilidades.defender.nombre}
          <span className="ml-2 text-xs text-gray-500 font-normal">
            — reduce el próximo daño a la mitad
          </span>
        </button>
      </div>
    </div>
  );
}
