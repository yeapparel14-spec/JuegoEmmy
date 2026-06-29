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
