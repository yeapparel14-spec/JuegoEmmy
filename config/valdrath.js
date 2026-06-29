/**
 * config/valdrath.js
 * ══════════════════════════════════════════════════════════════
 * Toda la historia y datos de la novela visual VALDRATH.
 *
 * ── CÓMO EDITAR UN TEXTO ──────────────────────────────────────
 *   Busca la escena por su ID (ej: 'prologo', 'cap1_llegada')
 *   y edita el texto de `narracion` o `dialogos`.
 *
 * ── CÓMO AGREGAR UNA ESCENA ───────────────────────────────────
 *   1. Crea un nuevo objeto en `escenas` con un ID único.
 *   2. Enlázala: en la escena anterior cambia `siguiente` o
 *      el `siguiente` de una decisión al nuevo ID.
 *   3. Asegúrate de que la nueva escena tenga `siguiente` o
 *      `decisiones` (excepto las escenas `esFinal: true`).
 *
 * ── CAMPOS DE UNA ESCENA ──────────────────────────────────────
 *   capitulo    — Texto del encabezado (ej: "Capítulo I")
 *   titulo      — Título de la escena (opcional)
 *   ambiente    — Paleta visual: 'fuego'|'hielo'|'ceniza'|
 *                 'neutro'|'aurora'|'tormenta'
 *   narracion   — Array de strings. Cada string = un párrafo.
 *   dialogos    — Array de { personaje, texto }. Opcional.
 *   decisiones  — Array de { texto, delta, siguiente, esVerdadero? }
 *                 delta: puntos de valentía (+/-). Opcional.
 *   siguiente   — ID de la siguiente escena (sin decisiones).
 *   esFinal     — true si es una pantalla de final.
 *   mensajeRomantico — Texto personal que aparece en el final
 *                      verdadero (solo en final_verdadero).
 */

// ── Ambientes: paleta por tipo de escena ─────────────────────
export const ambientes = {
  fuego: {
    bg:          'linear-gradient(160deg, #1a0500 0%, #2d0800 55%, #1a0300 100%)',
    acento:      '#f97316',
    textoTitulo: '#fbbf24',
    borde:       'rgba(249,115,22,0.35)',
    particula:   'brasa',
  },
  hielo: {
    bg:          'linear-gradient(160deg, #020c1e 0%, #0a1b38 55%, #020c1e 100%)',
    acento:      '#93c5fd',
    textoTitulo: '#bfdbfe',
    borde:       'rgba(147,197,253,0.35)',
    particula:   'nieve',
  },
  ceniza: {
    bg:          'linear-gradient(160deg, #0a0a0a 0%, #181010 55%, #0a0a0a 100%)',
    acento:      '#9ca3af',
    textoTitulo: '#e5e7eb',
    borde:       'rgba(156,163,175,0.25)',
    particula:   'ceniza',
  },
  neutro: {
    bg:          'linear-gradient(160deg, #0f0a14 0%, #1a1028 55%, #0f0a14 100%)',
    acento:      '#c084fc',
    textoTitulo: '#e9d5ff',
    borde:       'rgba(192,132,252,0.28)',
    particula:   'ninguna',
  },
  aurora: {
    bg:          'linear-gradient(160deg, #030a1a 0%, #0a1830 40%, #080d22 100%)',
    acento:      '#818cf8',
    textoTitulo: '#c7d2fe',
    borde:       'rgba(129,140,248,0.35)',
    particula:   'aurora',
  },
  tormenta: {
    bg:          'linear-gradient(160deg, #08080f 0%, #0e0e1c 55%, #08080f 100%)',
    acento:      '#6b7280',
    textoTitulo: '#9ca3af',
    borde:       'rgba(107,114,128,0.28)',
    particula:   'ceniza',
  },
};

// ── Colores por personaje en los diálogos ─────────────────────
export const coloresPersonaje = {
  Emrys:   { bg: 'rgba(120,40,15,0.55)',  borde: '#ea580c', nombre: '#fed7aa' },
  Yelan:   { bg: 'rgba(25,52,120,0.55)',  borde: '#3b82f6', nombre: '#bfdbfe' },
  Corvane: { bg: 'rgba(28,35,48,0.7)',    borde: '#6b7280', nombre: '#d1d5db' },
  Sera:    { bg: 'rgba(70,30,8,0.6)',     borde: '#d97706', nombre: '#fcd34d' },
  Ashkar:  { bg: 'rgba(65,8,8,0.65)',     borde: '#dc2626', nombre: '#fca5a5' },
  Ithara:  { bg: 'rgba(48,40,62,0.6)',    borde: '#a78bfa', nombre: '#ddd6fe' },
  Narrador:{ bg: 'rgba(12,12,18,0.8)',    borde: '#374151', nombre: '#9ca3af' },
};

// ══════════════════════════════════════════════════════════════
// ESCENAS — edita aquí la historia
// ══════════════════════════════════════════════════════════════
export const escenas = {

  // ──────────────────────────────────────────────────────────
  // PRÓLOGO
  // ──────────────────────────────────────────────────────────
  prologo: {
    capitulo: 'Prólogo',
    titulo:   'El mundo partido',
    ambiente: 'ceniza',
    narracion: [
      'Valdrath es un continente partido.',
      'Al norte, Aurenheim se extiende bajo cielos perpetuamente grises. Allí los dragones de hielo surcan ventiscas capaces de congelar el tiempo, y su gente es estoica, resistente, forjada en el frío eterno.',
      'Al sur, Solmarca arde sobre tierra de volcanes, custodiada por dragones de fuego que duermen en calderas de lava. Su gente es apasionada, veloz, acostumbrada a que todo lo que toca queme.',
      'Entre ambos: el Mar de Ceniza. Un océano de brasas eternas que ningún barco cruza, que ningún navegante ha sobrevivido intentando cruzar. Solo los dragones pueden atravesarlo, y solo los más valientes de ellos.',
      'Hace cuarenta años, dos coronas firmaron la Paz de Valdrath en una isla perdida en ese mar de fuego. Esa paz duró mientras vivieron quienes la firmaron.',
      'Ahora están muertos. Y la paz muere con ellos.',
      'Esta es la historia de dos personas que intentaron construir algo nuevo sobre las cenizas de lo que se rompió.',
    ],
    siguiente: 'cap1_llegada',
  },

  // ──────────────────────────────────────────────────────────
  // CAPÍTULO I — LA CUMBRE
  // ──────────────────────────────────────────────────────────
  cap1_llegada: {
    capitulo: 'Capítulo I — La Cumbre',
    titulo:   'La Isla del Tratado',
    ambiente: 'neutro',
    narracion: [
      'La Cumbre de Valdrath se celebra en terreno neutral: las ruinas de la Isla del Tratado, el único suelo en el Mar de Ceniza donde el fuego no quema y el hielo no congela.',
      'Emrys llega antes que nadie. Ha viajado tres días sobre el lomo de Brasaluz, su dragona carmesí cuyas escamas brillan como brasas vivas en la niebla. La isla huele a azufre y flores amarillas que crecen obstinadas entre la ceniza.',
      'Desde el balcón del pabellón de piedra, ve llegar la delegación del norte. Dragones blancos descendiendo entre nubes bajas. Y entre ellos, uno diferente: un dragón de hielo azul, casi translúcido, más pequeño que los demás. Su jinete no porta los colores reales de Aurenheim. Un soldado, no un noble. Alguien que llegó aquí por mérito, no por sangre.',
      'Algo en ese jinete la hace fijarse más de lo que debería.',
    ],
    dialogos: [
      { personaje: 'Ithara', texto: 'Alteza, el Maestre Corvane de Aurenheim ha solicitado una audiencia privada antes de la sesión formal. Dice que tiene información que afecta directamente a Solmarca.' },
      { personaje: 'Emrys', texto: '¿A qué hora?' },
      { personaje: 'Ithara', texto: 'Ahora mismo, si Vuestra Alteza lo desea.' },
    ],
    decisiones: [
      {
        texto: 'Ignoro a Corvane por ahora. Quiero ver a esa delegación con mis propios ojos antes de escuchar a nadie.',
        delta: 1,
        siguiente: 'cap1_encuentro',
      },
      {
        texto: 'Acepto la audiencia. La información es poder, venga de donde venga.',
        delta: 0,
        siguiente: 'cap1_encuentro',
      },
    ],
  },

  cap1_encuentro: {
    capitulo: 'Capítulo I — La Cumbre',
    titulo:   'El jinete del hielo',
    ambiente: 'neutro',
    narracion: [
      'El patio central de la isla tiene dos fuentes que ya no funcionan. Entre ellas, el jinete del dragón azul está solo, estudiando un mapa desplegado sobre la piedra. No parece nervioso. Parece alguien que lleva años aprendiendo a estar cómodo estando fuera de lugar.',
      'Emrys lo observa un momento sin que él la vea. Tiene cicatrices en las manos del tipo que se ganan aprendiendo a volar antes de aprender a no caerse. No es nobleza. Es algo más interesante que eso.',
      'Cuando levanta la vista y la encuentra mirándolo, no aparta los ojos. Tampoco se inclina como haría cualquier noble. Solo pregunta:',
    ],
    dialogos: [
      { personaje: 'Yelan', texto: '¿Estabas buscando algo, o solo me estabas estudiando?' },
      { personaje: 'Emrys', texto: '...' },
      { personaje: 'Yelan', texto: 'No tienes que responder. El mapa tampoco me va a responder, pero al menos no me mira como si intentara descifrarme.' },
    ],
    decisiones: [
      {
        texto: '"Las dos cosas. Soy Emrys, heredera de Solmarca. Y tú no eres lo que esperaba encontrar en una delegación de Aurenheim."',
        delta: 2,
        siguiente: 'cap1_corvane',
      },
      {
        texto: '"Solo admiraba el dragón. Es raro ver uno azul tan joven." Guardo mi nombre por ahora.',
        delta: 0,
        siguiente: 'cap1_corvane',
      },
    ],
  },

  cap1_corvane: {
    capitulo: 'Capítulo I — La Cumbre',
    titulo:   'El Maestre de las dos caras',
    ambiente: 'tormenta',
    narracion: [
      'Corvane espera en una sala sin ventanas. Es un hombre de setenta años que parece haber decidido que envejecer era optativo. Sus ojos grises se mueven demasiado rápido para alguien que pretende estar en calma.',
      'Habla durante media hora. Tiene razones para la guerra: territorios en disputa, deudas históricas de la paz anterior, insultos que ningún rey puede ignorar sin perder el respeto de su corte. Cada argumento encaja con el siguiente como piezas talladas para eso.',
      'Cuando termina, señala que ha dado este mismo consejo a ambas delegaciones, "por el bien de Valdrath". Y sonríe.',
    ],
    dialogos: [
      { personaje: 'Corvane', texto: 'La guerra, Alteza, no es un fracaso. Es una herramienta. Y a veces la herramienta correcta en el momento correcto construye una paz más duradera que cualquier tratado firmado en papel.' },
      { personaje: 'Corvane', texto: 'Confíe en mí. He servido a Valdrath durante cuarenta años. Sé exactamente cuándo la balanza necesita un empujón.' },
      { personaje: 'Emrys', texto: '¿Y para qué lado empuja usted, Maestre?' },
    ],
    decisiones: [
      {
        texto: '"Sus palabras son demasiado perfectas, Maestre. Nadie que sirve a Valdrath puede servir a dos reinos a la vez sin servirse primero a sí mismo."',
        delta: 1,
        siguiente: 'cap2_guerra',
      },
      {
        texto: '"Sus puntos son sólidos. Le daré el beneficio de la duda, por ahora."',
        delta: 0,
        siguiente: 'cap2_guerra',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // CAPÍTULO II — LA GUERRA ESTALLA
  // ──────────────────────────────────────────────────────────
  cap2_guerra: {
    capitulo: 'Capítulo II — La Guerra Estalla',
    titulo:   'El cuarto día',
    ambiente: 'tormenta',
    narracion: [
      'La cumbre dura tres días. Durante esos tres días, algo cambia.',
      'Emrys y Yelan se encuentran dos veces más, siempre de manera que puede llamarse accidental si alguien pregunta. Hablan de dragones, de rutas de vuelo, de por qué el Mar de Ceniza no puede cruzarse en barco. Hablan de cosas que no son las cosas de las que hablan.',
      'Al amanecer del cuarto día llega el mensaje: los ejércitos de Aurenheim han comenzado a moverse hacia la frontera sur. La cumbre se ha roto sin que nadie lo anunciara oficialmente. No hay acuerdo. Hay guerra.',
      'Brasaluz siente el cambio en el aire; su fuego aumenta de temperatura sin que Emrys se lo pida.',
    ],
    dialogos: [
      { personaje: 'Ithara', texto: 'Alteza, el General Kael pide que regresemos a Solmarca inmediatamente. Los dragones de guerra están siendo preparados.' },
      { personaje: 'Emrys', texto: '¿Y la delegación de Aurenheim? ¿Ya partieron?' },
      { personaje: 'Ithara', texto: 'Todos menos uno, Alteza. El jinete del dragón azul sigue en la isla.' },
    ],
    decisiones: [
      {
        texto: 'Busco a Yelan antes de responder a nadie. Si hay una persona en este mundo que también quiera parar esto, es él.',
        delta: 2,
        siguiente: 'cap2_ashkar',
      },
      {
        texto: 'Mi deber es volver a Solmarca. Todo lo demás es ruido que no me puedo permitir ahora mismo.',
        delta: -1,
        siguiente: 'cap2_ashkar',
      },
    ],
  },

  cap2_ashkar: {
    capitulo: 'Capítulo II — La Guerra Estalla',
    titulo:   'Lord Ashkar',
    ambiente: 'fuego',
    narracion: [
      'Lord Ashkar llega a la isla dos horas después. No fue invitado a la cumbre, pero está aquí de todas formas, porque Ashkar no espera invitaciones. Es el hombre con quien Emrys está comprometida desde los dieciséis años, por orden de su padre.',
      'No es cruel. Eso sería más sencillo. Es convicto. Cree genuinamente en cada palabra que dice, y eso lo hace imposible de razonar.',
    ],
    dialogos: [
      { personaje: 'Ashkar', texto: 'La cumbre fracasó. Eso ya no importa. Lo que importa es que Solmarca entre a esta guerra desde una posición de fuerza, no de duda. Cada día que esperemos es una ventaja que le damos al norte.' },
      { personaje: 'Ashkar', texto: 'He visto tus informes sobre el jinete de Aurenheim. El de la bestia azul. No te dejes llevar por distracciones de la cumbre, Emrys.' },
      { personaje: 'Emrys', texto: '¿Distracciones?' },
      { personaje: 'Ashkar', texto: 'La guerra no perdona a quienes sienten demasiado. Tu padre te lo enseñó. Yo también te lo digo.' },
    ],
    decisiones: [
      {
        texto: '"Ashkar. Esta guerra no es inevitable. Hay un tercer camino y necesito tiempo para encontrarlo. Dame eso, o apártate de mi camino."',
        delta: 2,
        siguiente: 'cap3_sera',
      },
      {
        texto: 'No es el momento para esta confrontación. Asiento y espero mi oportunidad.',
        delta: 0,
        siguiente: 'cap3_sera',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // CAPÍTULO III — EL MAR DE CENIZA
  // ──────────────────────────────────────────────────────────
  cap3_sera: {
    capitulo: 'Capítulo III — El Mar de Ceniza',
    titulo:   'Sera la Sin-Dragón',
    ambiente: 'ceniza',
    narracion: [
      'Yelan sabía de Sera antes de que Emrys preguntara. "La única contrabandista que conoce una ruta para cruzar el Mar sin depender de un dragón", le había dicho en su última conversación en la cumbre, dejándole coordenadas en un mapa.',
      'Sera vive en una plataforma flotante anclada en la orilla del Mar, construida sobre los cascos de doce barcos que intentaron cruzarlo y fallaron. Tiene treinta y tantos años y la expresión de alguien que ha decidido que el mundo le debe una deuda y está cobrando intereses con paciencia infinita.',
    ],
    dialogos: [
      { personaje: 'Sera', texto: 'Una heredera de Solmarca y un soldado de Aurenheim entran juntos a mi casa. ¿Es esto el principio de un chiste, o el principio de algo que va a costarme muy caro?' },
      { personaje: 'Yelan', texto: 'Necesitamos cruzar el Mar. Tú conoces la ruta.' },
      { personaje: 'Sera', texto: 'Todo el mundo sabe que yo conozco la ruta. Eso no significa que la venda. Díganme por qué debería confiar en dos personas que dentro de una semana probablemente estarán en lados opuestos de un campo de batalla.' },
    ],
    decisiones: [
      {
        texto: '"Porque si no cruzamos, esa guerra que mencionas va a matar a miles de personas. Y tú vives en la orilla. Eso te hace más afectada de lo que quieres admitir."',
        delta: 1,
        siguiente: 'cap3_mar',
      },
      {
        texto: '"Porque te pagaremos más de lo que cualquier rey en guerra puede ofrecerte en este momento."',
        delta: 0,
        siguiente: 'cap3_mar',
      },
    ],
  },

  cap3_mar: {
    capitulo: 'Capítulo III — El Mar de Ceniza',
    titulo:   'La travesía',
    ambiente: 'fuego',
    narracion: [
      'El Mar de Ceniza no es un mar. Es el recuerdo de uno. Las brasas flotan en corrientes térmicas que suben desde un fondo que nadie ha visto. El calor no quema, pero lo sientes en los pulmones con cada respiración, como si el aire guardara memoria del fuego.',
      'Brasaluz y Vael vuelan en paralelo, más cerca de lo que los dragones de reinos rivales deberían estar. No les parece necesario ser enemigos.',
      'A mitad del cruce, la ruta de Sera exige un descenso peligroso, casi rozando la superficie. Una corriente ascendente golpea a Vael de costado. Yelan pierde el agarre por un instante. Solo un instante.',
      'Emrys lo ve desde Brasaluz. Tiene menos de un segundo para decidir.',
    ],
    dialogos: [
      { personaje: 'Yelan', texto: '¡Puedo recuperar el control, no—!' },
      { personaje: 'Emrys', texto: '¡Brasaluz, ya!' },
    ],
    decisiones: [
      {
        texto: 'Brasaluz empuja con el hombro contra Vael para estabilizarlo. El impacto arde, pero funciona.',
        delta: 1,
        siguiente: 'cap4_traicion',
      },
      {
        texto: 'Grito instrucciones a Yelan para que corrija él mismo. Confío en que puede.',
        delta: 0,
        siguiente: 'cap4_traicion',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // CAPÍTULO IV — LA TRAICIÓN
  // ──────────────────────────────────────────────────────────
  cap4_traicion: {
    capitulo: 'Capítulo IV — La Traición',
    titulo:   'El juego de Corvane',
    ambiente: 'tormenta',
    narracion: [
      'Llegan a la Isla del Tratado, donde planeaban establecer un canal de comunicación neutral con ambos reinos. Alguien llegó antes.',
      'Corvane está esperando. No está solo. Tiene escoltas de Aurenheim a su izquierda y de Solmarca a su derecha. Ha jugado los dos lados durante cuarenta años, y ha llegado el momento de cobrar.',
      'La trampa es elegante: si Emrys y Yelan son capturados juntos fuera de sus reinos, ambas coronas tienen el escándalo que las obliga a ir a la guerra. Corvane no quiere la paz. Nunca la quiso. Quiere el caos que alimenta a las personas que llevan décadas pagándole.',
    ],
    dialogos: [
      { personaje: 'Corvane', texto: 'Qué predecibles. Un cruce ilegal del Mar de Ceniza, un encuentro fuera de toda protocolo... Les han dado exactamente lo que necesitaba. Los dos reinos van a agradecerme esto durante generaciones.' },
      { personaje: 'Yelan', texto: '¿Siempre supiste que era así?' },
      { personaje: 'Emrys', texto: 'Lo sospeché desde el primer momento. Pero sospechar no es suficiente, y Corvane lo sabe.' },
      { personaje: 'Corvane', texto: 'No importa lo que sepáis. Lo que importa es lo que parece. Y esto... parece exactamente lo que necesito.' },
    ],
    decisiones: [
      {
        texto: '"Corvane. En este lugar, en este momento, te perdono. Pero el mundo entero va a saber lo que hiciste. Hasta el último rincón de Valdrath."',
        delta: 1,
        siguiente: 'cap5_decision',
      },
      {
        texto: 'No le hablo a Corvane. Le hablo directamente a los jinetes detrás de él, los que todavía pueden elegir.',
        delta: 1,
        siguiente: 'cap5_decision',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // CAPÍTULO V — LA DECISIÓN
  // ──────────────────────────────────────────────────────────
  cap5_decision: {
    capitulo: 'Capítulo V — La Decisión',
    titulo:   'El momento que lo define todo',
    ambiente: 'ceniza',
    narracion: [
      'Los jinetes de ambos reinos se miran entre sí. Nadie es el primero en moverse. Corvane acaba de ser nombrado traidor a los dos lados por sus propios aliados, en sus propias palabras.',
      'En el silencio que sigue, Emrys y Yelan se miran. Han llegado hasta aquí. Podrían no haber llegado. Hay un punto en el que el camino se divide y no hay manera de volver atrás.',
      'Este es ese punto.',
    ],
    dialogos: [
      { personaje: 'Yelan', texto: '¿Qué hacemos ahora?' },
      { personaje: 'Emrys', texto: 'Eso depende de lo que seamos capaces de elegir.' },
      { personaje: 'Sera', texto: '(desde atrás) Por si sirve de algo: yo ya sé lo que elegiría yo.' },
    ],
    decisiones: [
      {
        texto: 'Regreso a Solmarca. Es mi corona, mi gente, mi deber. Lo que sentí aquí no puede pesar más que todo eso.',
        delta: -2,
        siguiente: 'final_tragico',
      },
      {
        texto: 'Buscamos la paz, aunque cueste. Llevamos la evidencia de Corvane a ambos reinos y pedimos que el tratado se renueve.',
        delta: 1,
        siguiente: 'final_amargo',
      },
      {
        texto: 'No volvemos. Fundamos algo nuevo en esta isla. Un tercer reino que no le pertenece a ninguno de los que ya existían.',
        delta: 3,
        siguiente: 'final_verdadero',
        esVerdadero: true,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // FINALES
  // ──────────────────────────────────────────────────────────
  final_tragico: {
    capitulo: 'Final I — El Deber',
    titulo:   'Lo que se elige perder',
    ambiente: 'tormenta',
    esFinal:  true,
    narracion: [
      'Emrys regresa a Solmarca. Brasaluz vuela hacia el sur con la misma velocidad de siempre, pero algo en el vuelo se siente diferente. Más pesado.',
      'La guerra dura tres años. Termina no por victoria sino por agotamiento: dos reinos sangrados firman un nuevo tratado en la misma isla donde Emrys y Yelan se conocieron. Un papel que ya nadie recuerda por qué firmó.',
      'Dicen que en las noches claras, desde la Isla del Tratado, se puede ver un dragón de hielo azul volando en círculos sobre el Mar de Ceniza. Como si buscara algo que no puede encontrar.',
      'Emrys nunca vuelve a la isla. Pero tampoco deja de mirar hacia el norte cuando Brasaluz vuela alto.',
      'Hay victorias que se parecen demasiado a las derrotas.',
    ],
    dialogos: [],
  },

  final_amargo: {
    capitulo: 'Final II — La Paz Posible',
    titulo:   'El precio de la esperanza',
    ambiente: 'neutro',
    esFinal:  true,
    narracion: [
      'La evidencia contra Corvane es suficiente. Los dos reinos, avergonzados por haber sido manipulados durante décadas por el mismo hombre, firman la paz casi en silencio. No hay celebración. Hay cansancio y alivio en medidas iguales.',
      'Emrys y Yelan se separan en la Isla del Tratado. Sus reinos los necesitan de regreso. La paz recién firmada es frágil, y los dos son piezas que sus coronas no pueden perder ahora mismo.',
      'Se ven dos veces más, en reuniones diplomáticas rodeadas de consejeros y guardias y toda la maquinaria de dos estados que aún no se fían del todo el uno del otro.',
      'En la segunda reunión, mientras los consejeros discuten aranceles fronterizos, Yelan le pasa una nota doblada. Dice solo: "Vael pregunta por Brasaluz." Emrys sonríe. La primera vez en mucho tiempo.',
      'No es el final que imaginaron. Pero es un mundo donde ese final todavía es posible, algún día.',
    ],
    dialogos: [],
  },

  final_verdadero: {
    capitulo: 'Final III — El Tercer Camino',
    titulo:   'La isla que nadie había reclamado',
    ambiente: 'aurora',
    esFinal:  true,
    narracion: [
      'Nadie lo había hecho antes. Esa es, según Sera, la única razón por la que funciona.',
      'La Isla del Tratado no pertenece a ningún reino. Nunca le perteneció. Estaba en el Mar de Ceniza, que ningún rey reclamó porque ningún barco podía cruzarlo. Y los dragones no entienden de fronteras.',
      'En tres semanas llegan a la isla dieciséis personas: jinetes de ambos reinos que ya no querían seguir siendo soldados de una guerra que no habían elegido. Sera llega la segunda semana con provisiones y el gesto de alguien que lleva años esperando exactamente este momento sin querer admitirlo.',
      'Brasaluz y Vael duermen en la misma cueva por primera vez. Es, según Sera, el primer tratado de paz que realmente importa.',
      'Emrys escribe a su madre esa noche. Yelan escribe a los jinetes que le enseñaron a volar. Les dicen lo mismo: que encontraron algo que vale más que lo que dejaron atrás. Que hay espacio. Que los esperan.',
      'La isla no tiene nombre todavía. Están trabajando en eso.',
    ],
    dialogos: [
      { personaje: 'Yelan', texto: 'Vael nunca había dormido sin ventisca. Esta noche durmió.' },
      { personaje: 'Emrys', texto: 'Brasaluz tampoco apaga su fuego tan fácilmente. Esta noche también.' },
      { personaje: 'Sera', texto: '¿Sabéis lo que eso significa? Significa que esto ya tiene algo de hogar.' },
    ],
    // ── EDITA aquí el mensaje romántico personal para Emely ──
    mensajeRomantico: 'Esta historia la escribí pensando en ti, Emely. Porque creo que tú y yo también estamos construyendo algo nuevo, a mitad de camino entre Nicaragua y El Salvador, en un lugar que todavía no tiene nombre pero que ya se siente como hogar cuando hablo contigo. Gracias por existir. Con todo mi amor. 💕',
  },
};
