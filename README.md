# Juegos para Emely 💕

Hub romántico de mini-juegos creado como regalo especial, construido con Next.js 15, Tailwind CSS y despliegue en Vercel.

## Juegos incluidos

| Juego | Descripción |
|-------|-------------|
| ⭕ **Gato** | Tic-tac-toe contra la máquina (IA con minimax, imbatible) |
| 🃏 **Memorama** | Juego de memoria con cartas personalizables con fotos |
| 💭 **Quiz** | "¿Cuánto me conoces?" con preguntas editables |
| 💌 **Sorpresa** | Mensajes de amor aleatorios al tocar un corazón |

## Personalizar el contenido

**Todo el contenido editable está en un solo archivo:** `config/content.js`

Desde ahí puedes cambiar sin tocar la lógica:
- Nombres y mensajes de bienvenida
- Preguntas y respuestas del quiz
- Mensajes de amor de la sorpresa
- Símbolos del juego del gato

### Agregar fotos al memorama

1. Copia tus fotos a `public/fotos/` (ej: `foto1.jpg`, `foto2.jpg`...)
2. En `config/content.js`, cambia `emoji` por `image` en cada par:

```js
// Antes:
{ id: 1, emoji: '🌹', etiqueta: 'Rosas' }

// Después:
{ id: 1, image: '/fotos/foto1.jpg', etiqueta: 'Nuestro primer encuentro' }
```

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Desplegar en Vercel

1. Sube el proyecto a un repositorio en GitHub
2. Entra a [vercel.com](https://vercel.com) → **Add New Project**
3. Importa el repositorio y haz clic en **Deploy**
4. ¡Listo! Vercel detecta Next.js automáticamente

---

Hecho con ❤️ — De Nicaragua con amor, hasta El Salvador 💕
