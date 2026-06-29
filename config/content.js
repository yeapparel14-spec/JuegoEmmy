/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║        ARCHIVO DE CONFIGURACIÓN — EDITA AQUÍ            ║
 * ║  Cambia textos, preguntas y mensajes sin tocar la lógica ║
 * ╚══════════════════════════════════════════════════════════╝
 */

export const content = {
  // ─── Datos de la pareja ───────────────────────────────────
  pareja: {
    nombre: 'Emely',
    yo: 'alguien especial',
    distancia: 'De Nicaragua con amor, hasta El Salvador 💕',
  },

  // ─── Hub principal ────────────────────────────────────────
  hub: {
    titulo: 'Para Emely',
    subtitulo: 'Un pequeño mundo lleno de amor, hecho solo para ti',
    bienvenida:
      'Hola amor, esto lo creé con todo mi corazón solo para ti. Espero que te saque una sonrisa cada vez que lo abras. ❤️',
    juegos: [
      {
        id: 'gato',
        emoji: '⭕',
        titulo: 'Gato',
        descripcion: '¿Puedes ganarme?',
        color: 'from-rosa-400 to-rosa-600',
      },
      {
        id: 'memorama',
        emoji: '🃏',
        titulo: 'Memorama',
        descripcion: 'Pon a prueba tu memoria',
        color: 'from-dorado-400 to-dorado-500',
      },
      {
        id: 'quiz',
        emoji: '💭',
        titulo: 'Quiz de amor',
        descripcion: '¿Cuánto me conoces?',
        color: 'from-purple-400 to-purple-600',
      },
      {
        id: 'sorpresa',
        emoji: '💌',
        titulo: 'Sorpresa',
        descripcion: 'Toca para una sorpresa',
        color: 'from-rosa-500 to-dorado-400',
      },
      {
        id: 'dragones',
        emoji: '🐉',
        titulo: 'Jinetes del Fuego',
        descripcion: 'Batalla épica de dragones',
        color: 'from-gray-800 to-red-900',
        wide: true,
      },
      {
        id: 'valdrath',
        emoji: '🏰',
        titulo: 'Valdrath',
        descripcion: 'Novela visual épica · Elige tu destino',
        color: 'from-gray-900 to-violet-950',
        wide: true,
        destacado: true,
      },
    ],
  },

  // ─── Juego: Gato (Tic-tac-toe) ───────────────────────────
  gato: {
    titulo: 'Juego del Gato',
    subtitulo: 'Tú vs la Máquina',
    simboloJugador: '🩷',   // símbolo de la jugadora (Emely)
    simboloMaquina: '💙',   // símbolo de la máquina
    mensajeGana: '¡Ganaste! 🎉 ¡Eres increíble, amor!',
    mensajePierde: 'La máquina ganó 😅 ¡Intenta de nuevo!',
    mensajeEmpate: '¡Empate! Qué partida tan reñida 😄',
    turno: 'Tu turno',
    pensando: '💭 Pensando...',
    botonReinicio: 'Jugar de nuevo',
    botonReset: 'Reiniciar',
  },

  // ─── Juego: Memorama ──────────────────────────────────────
  memorama: {
    titulo: 'Memorama',
    subtitulo: 'Encuentra todos los pares 🃏',
    mensajeGana: '¡Lo lograste, amor! ¡Qué memoria tan increíble! 🎊',
    botonReinicio: 'Jugar de nuevo',
    etiquetaMovimientos: 'Movimientos',
    etiquetaPares: 'Pares',

    // Para usar FOTOS PROPIAS:
    //   1. Copia tus fotos a /public/fotos/ (ej: foto1.jpg, foto2.jpg...)
    //   2. Cambia `emoji` por `image: "/fotos/foto1.jpg"` en cada par
    //   3. Puedes tener entre 4 y 8 pares (siempre número par de cartas)
    pares: [
      { id: 1, emoji: '🌹', etiqueta: 'Rosas' },
      { id: 2, emoji: '💫', etiqueta: 'Estrellas' },
      { id: 3, emoji: '🦋', etiqueta: 'Mariposas' },
      { id: 4, emoji: '🌙', etiqueta: 'Luna' },
      { id: 5, emoji: '💎', etiqueta: 'Tesoro' },
      { id: 6, emoji: '🎵', etiqueta: 'Música' },
      { id: 7, emoji: '🌺', etiqueta: 'Flores' },
      { id: 8, emoji: '✨', etiqueta: 'Magia' },
    ],
  },

  // ─── Juego: Quiz ─────────────────────────────────────────
  quiz: {
    titulo: '¿Cuánto me conoces?',
    subtitulo: 'Demuestra que sabes todo sobre mí 😊',
    mensajeAprobado: '¡Wow, me conoces perfecto! Eso me llena de amor. ❤️',
    mensajeRegular:  'Casi lo logras. ¡Seguimos aprendiendo juntos! 😊',
    mensajeMalo:     '¡Necesitamos hablar más! Pero igual te quiero mucho 😄',
    etiquetaPregunta:   'Pregunta',
    etiquetaDe:         'de',
    etiquetaCompletado: 'completado',
    textoCorecto:       '¡Correcto! 🎉',
    textoIncorrecto:    'Incorrecto — la respuesta era:',
    etiquetaResultado:  '¡Resultado!',
    botonSiguiente:  'Siguiente →',
    botonResultado:  'Ver resultado',
    botonReinicio:   'Intentarlo de nuevo',
    botonInicio:     '← Volver al inicio',

    // ─── EDITA TUS PREGUNTAS AQUÍ ───────────────────────────
    // `respuesta` es el ÍNDICE (0, 1, 2, 3) de la opción correcta
    preguntas: [
      {
        pregunta: '¿Cuál es mi color favorito?',
        opciones: ['Azul', 'Rojo', 'Verde', 'Morado'],
        respuesta: 0,
      },
      {
        pregunta: '¿Cuál es mi comida favorita?',
        opciones: ['Pizza', 'Sushi', 'Tacos', 'Hamburguesas'],
        respuesta: 2,
      },
      {
        pregunta: '¿En qué mes es mi cumpleaños?',
        opciones: ['Marzo', 'Junio', 'Septiembre', 'Diciembre'],
        respuesta: 1,
      },
      {
        pregunta: '¿Qué me gusta hacer los fines de semana?',
        opciones: ['Dormir', 'Leer', 'Salir a caminar', 'Ver series'],
        respuesta: 3,
      },
      {
        pregunta: '¿Cuál es mi animal favorito?',
        opciones: ['Gatos', 'Perros', 'Conejos', 'Delfines'],
        respuesta: 0,
      },
      {
        pregunta: '¿Cuál es mi mayor sueño?',
        opciones: ['Viajar el mundo', 'Tener mi negocio', 'Vivir en el campo', 'Estar contigo'],
        respuesta: 3,
      },
    ],
  },

  // ─── Juego: Dragones ─────────────────────────────────────
  dragones: {
    titulo: 'Jinetes del Fuego',
    subtitulo: 'La batalla por los cielos comienza',
    textoSeleccion: 'Elige tu Jinete',
    textoSubseleccion: '¿A quién montarás en la batalla épica?',
    botonRevancha: '⚔️ Pelear de nuevo',
    botonCambiarPersonaje: '🐉 Cambiar jinete',
    textoCooldown: (n) => `🔥 Enfriando (${n})`,

    // ─── PERSONAJES — edita nombre, dragón, descripción y stats ──
    // gradient/borderColor son colores CSS para las tarjetas
    personajes: [
      {
        id: 'zael',
        nombre: 'Zael Vorn',
        dragon: 'Ignareth',
        descripcion: 'Jinete implacable del norte ardiente. Alto poder de ataque.',
        dragonEmoji: '🔴',
        gradient: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%)',
        borderColor: '#991b1b',
        glowColor: 'rgba(239,68,68,0.3)',
        ataque: 85,
        defensa: 45,
        fuego: 75,
      },
      {
        id: 'lyrindeth',
        nombre: 'Lyrindeth',
        dragon: 'Solcinder',
        descripcion: 'Hija del sol, maestra de las llamas doradas. Magia equilibrada.',
        dragonEmoji: '🌟',
        gradient: 'linear-gradient(135deg, #451a03 0%, #78350f 100%)',
        borderColor: '#92400e',
        glowColor: 'rgba(245,158,11,0.3)',
        ataque: 65,
        defensa: 65,
        fuego: 82,
      },
      {
        id: 'korrax',
        nombre: 'Korrax',
        dragon: 'Embrath',
        descripcion: 'El escudo viviente de la fortaleza negra. Defensa máxima.',
        dragonEmoji: '⚫',
        gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderColor: '#334155',
        glowColor: 'rgba(100,116,139,0.3)',
        ataque: 70,
        defensa: 88,
        fuego: 55,
      },
      {
        id: 'vaelith',
        nombre: 'Vaelith',
        dragon: 'Sylvara',
        descripcion: 'Maestra del fuego arcano de las sombras. Fuego devastador.',
        dragonEmoji: '💜',
        gradient: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 100%)',
        borderColor: '#6d28d9',
        glowColor: 'rgba(139,92,246,0.3)',
        ataque: 55,
        defensa: 55,
        fuego: 95,
      },
    ],

    // ─── RIVAL (controlado por la máquina) ───────────────────────
    rival: {
      nombre: 'Lord Morvak',
      dragon: 'Keldrath',
      titulo: 'Señor del Abismo',
      dragonEmoji: '🖤',
      ataque: 72,
      defensa: 65,
      fuego: 72,
    },

    // ─── HABILIDADES ───────────────────────────────────────────────
    habilidades: {
      atacar:   { nombre: 'Atacar',             emoji: '⚔️', cooldown: 0 },
      fuego:    { nombre: 'Aliento de Fuego',   emoji: '🔥', cooldown: 3 },
      defender: { nombre: 'Defender',            emoji: '🛡️', cooldown: 0 },
    },

    // ─── MENSAJES DE COMBATE — puedes editar el texto ─────────────
    // (son funciones porque llevan nombres y daño dinámico)
    mensajesCombate: {
      atacarJugador:  (nombre, dragon, dano) => `⚔️ ${nombre} ordena a ${dragon} atacar — ¡${dano} de daño!`,
      fuegoJugador:   (nombre, dragon, dano) => `🔥 ${dragon} suelta su aliento de fuego — ¡${dano} de daño!`,
      defenderJugador:(nombre) => `🛡️ ${nombre} levanta su escudo, ¡listo para el golpe!`,
      atacarRival:    (nombre, dragon, dano) => `💀 ${dragon} ataca furiosamente — ¡${dano} de daño!`,
      fuegoRival:     (nombre, dragon, dano) => `🖤 ${dragon} escupe fuego oscuro — ¡${dano} de daño!`,
      defenderRival:  (nombre) => `🛡️ ${nombre} se prepara para recibir el impacto…`,
      bloqueado: '(¡tu escudo absorbe gran parte del golpe!)',
      inicio: (nombre, dragon) => `¡La batalla comienza! ${nombre} y ${dragon} están listos.`,
      reinicio: (nombre, dragon) => `¡Ronda nueva! ${nombre} y ${dragon} vuelven con todo.`,
    },

    // ─── PANTALLAS DE VICTORIA / DERROTA ─────────────────────────
    victoria: '¡VICTORIA! ¡Los cielos son tuyos, gran jinete!',
    derrota: 'Caíste en batalla… pero los valientes siempre se levantan.',

    // ─── MENSAJE ROMÁNTICO (aparece solo al ganar) ────────────────
    mensajeVictoria:
      'Igual que conquistaste los cielos hoy, conquistaste mi corazón desde el primer día. Eres mi heroína y mi aventura favorita. 💕',
  },

  // ─── Sorpresa: Mensajes de amor ───────────────────────────
  sorpresa: {
    titulo: 'Un mensaje especial',
    subtitulo: 'Toca el corazón para recibir un mensaje solo para ti',
    boton: 'Toca aquí 💝',
    placeholder: 'Toca el corazón de abajo para recibir\nun mensaje especial',
    etiquetaMensajes: 'mensajes enviados',

    // ─── EDITA TUS MENSAJES DE AMOR AQUÍ ────────────────────
    mensajes: [
      'Eres la razón por la que sonrío cada mañana. 🌅',
      'La distancia entre nosotros solo confirma cuánto te extraño y te amo. 💕',
      'Eres el mejor sueño del que nunca quiero despertar. 🌙',
      'Cada vez que pienso en ti, mi corazón late más rápido. 💗',
      'Gracias por existir y por hacer mi mundo tan especial. ✨',
      'Eres mi hogar, sin importar la distancia que nos separe. 🏡',
      'Contigo, cada momento ordinario se vuelve mágico. 🦋',
      'Te amo más de lo que las palabras jamás podrán expresar. 💌',
      'Soy el más afortunado del mundo por tenerte en mi vida. 🍀',
      'El día que nos volvamos a ver será el más feliz de mi vida. 🤗',
      'Eres mi sol en los días más nublados. ☀️',
      'Me enamoré de tu risa, de tu forma de ser, de absolutamente todo lo que eres. 💖',
      'Aunque estemos lejos, mi corazón siempre está cerca del tuyo. 💞',
      'Pensar en ti es mi pasatiempo favorito. 😊',
      'Eres todo lo que pedí y más de lo que merezco. 🌸',
    ],
  },
};
