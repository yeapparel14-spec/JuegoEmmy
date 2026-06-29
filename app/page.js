import Link from 'next/link';
import FloatingHearts from '../components/FloatingHearts';
import { content } from '../config/content';

export default function Home() {
  const { hub, pareja } = content;

  return (
    <div className="relative min-h-dvh flex flex-col overflow-hidden">
      <FloatingHearts />

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="relative z-10 text-center pt-14 pb-2 px-5">
        <div className="text-5xl mb-3 animate-pulse-heart inline-block">💕</div>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-rosa-900 leading-tight tracking-tight">
          {hub.titulo}
        </h1>
        <p className="mt-2 text-rosa-500 font-light text-sm md:text-base max-w-xs mx-auto">
          {hub.subtitulo}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm
                        border border-rosa-200 rounded-full px-4 py-1.5 text-xs text-rosa-600 shadow-sm">
          <span className="animate-sparkle inline-block">✨</span>
          {pareja.distancia}
        </div>
      </header>

      {/* ── Bienvenida ──────────────────────────────────────── */}
      <div className="relative z-10 mx-auto px-5 mt-5 mb-6 w-full max-w-sm">
        <div className="bg-white/75 backdrop-blur-sm border border-rosa-100 rounded-2xl
                        p-4 shadow-sm text-center">
          <p className="text-rosa-800 text-sm leading-relaxed font-light italic">
            &ldquo;{hub.bienvenida}&rdquo;
          </p>
        </div>
      </div>

      {/* ── Games grid ──────────────────────────────────────── */}
      <main className="relative z-10 flex-1 px-5 pb-14 max-w-sm mx-auto w-full">
        <div className="grid grid-cols-2 gap-4">
          {hub.juegos.map((juego, i) => (
            <Link href={`/${juego.id}`} key={juego.id} className={`block ${juego.wide ? 'col-span-2' : ''}`}>
              <div
                className="game-card p-5 h-full flex flex-col items-center text-center"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Gradient icon badge */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${juego.color}
                               flex items-center justify-center text-2xl shadow-md mb-3
                               transition-transform duration-300 group-hover:scale-110`}
                >
                  {juego.emoji}
                </div>
                <h2 className="font-playfair text-base font-semibold text-rosa-900 leading-tight">
                  {juego.titulo}
                </h2>
                <p className="text-rosa-400 text-xs mt-1 font-light">
                  {juego.descripcion}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="relative z-10 text-center pb-6 text-rosa-300 text-xs">
        Hecho con ❤️ solo para ti
      </footer>
    </div>
  );
}
