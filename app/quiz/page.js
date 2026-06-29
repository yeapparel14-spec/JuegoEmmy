'use client';

import { useState } from 'react';
import Link from 'next/link';
import BackButton from '../../components/BackButton';
import { content } from '../../config/content';

const { quiz } = content;
const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);   // true/false per question
  const [finished, setFinished] = useState(false);

  const q = quiz.preguntas[current];
  const total = quiz.preguntas.length;
  const score = answers.filter(Boolean).length;

  const handleSelect = (i) => {
    if (selected !== null) return;
    setSelected(i);
  };

  const handleNext = () => {
    const correct = selected === q.respuesta;
    const newAnswers = [...answers, correct];

    if (current + 1 >= total) {
      setAnswers(newAnswers);
      setFinished(true);
    } else {
      setAnswers(newAnswers);
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
  };

  const resultMsg = () => {
    const pct = score / total;
    if (pct >= 0.8) return quiz.mensajeAprobado;
    if (pct >= 0.5) return quiz.mensajeRegular;
    return quiz.mensajeMalo;
  };

  const resultEmoji = () => {
    const pct = score / total;
    if (pct === 1)   return '🏆';
    if (pct >= 0.8)  return '🌸';
    if (pct >= 0.5)  return '💪';
    return '😄';
  };

  /* ── Results screen ─────────────────────────────────────── */
  if (finished) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center px-4 pb-12">
        <div className="animate-pop-in bg-white rounded-3xl shadow-lg border border-rosa-100
                        p-7 max-w-sm w-full text-center">
          <div className="text-5xl mb-3">{resultEmoji()}</div>
          <h2 className="font-playfair text-2xl font-bold text-rosa-900 mb-1">
            {quiz.etiquetaResultado}
          </h2>
          <div className="text-5xl font-bold text-rosa-600 my-3">
            {score}<span className="text-3xl text-rosa-300">/{total}</span>
          </div>
          <p className="text-rosa-700 text-sm leading-relaxed mb-5">{resultMsg()}</p>

          {/* Breakdown */}
          <div className="space-y-2 mb-6 text-left">
            {quiz.preguntas.map((pq, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 text-xs p-2.5 rounded-xl ${
                  answers[i]
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-red-50 text-red-600 border border-red-200'
                }`}
              >
                <span className="font-bold text-sm leading-tight mt-px">
                  {answers[i] ? '✓' : '✗'}
                </span>
                <span className="leading-snug">{pq.pregunta}</span>
              </div>
            ))}
          </div>

          <button onClick={reset} className="btn-primary w-full">
            {quiz.botonReinicio}
          </button>
          <Link
            href="/"
            className="block mt-3 text-rosa-400 text-sm hover:text-rosa-700 transition-colors"
          >
            {quiz.botonInicio}
          </Link>
        </div>
      </div>
    );
  }

  /* ── Question screen ─────────────────────────────────────── */
  return (
    <div className="min-h-dvh flex flex-col items-center px-4 pt-8 pb-14">
      <div className="self-start mb-6"><BackButton /></div>

      {/* Title */}
      <div className="page-header w-full mb-5">
        <div className="text-4xl mb-2">💭</div>
        <h1 className="page-title">{quiz.titulo}</h1>
        <p className="page-subtitle">{quiz.subtitulo}</p>
      </div>

      {/* Progress */}
      <div className="w-full max-w-sm mb-5">
        <div className="flex justify-between text-xs text-rosa-400 mb-1.5">
          <span>
            {quiz.etiquetaPregunta} {current + 1} {quiz.etiquetaDe} {total}
          </span>
          <span>{Math.round((current / total) * 100)}% {quiz.etiquetaCompletado}</span>
        </div>
        <div className="w-full h-2 bg-rosa-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rosa-600 to-rosa-400 rounded-full
                       transition-all duration-500"
            style={{ width: `${(current / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-md border border-rosa-100 p-6 mb-4 text-center">
          <p className="font-playfair text-lg font-semibold text-rosa-900 leading-relaxed">
            {q.pregunta}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {q.opciones.map((opt, i) => {
            let cls =
              'bg-white border-rosa-100 text-rosa-800 hover:border-rosa-400 hover:bg-rosa-50 cursor-pointer';
            if (selected !== null) {
              if (i === q.respuesta) {
                cls = 'bg-emerald-50 border-emerald-400 text-emerald-800 cursor-default';
              } else if (i === selected) {
                cls = 'bg-red-50 border-red-400 text-red-700 cursor-default';
              } else {
                cls = 'bg-white border-rosa-100 text-rosa-300 opacity-60 cursor-default';
              }
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm
                            font-medium transition-all duration-200 active:scale-[0.98] ${cls}`}
              >
                <span className="font-bold text-rosa-300 mr-2">{LETTERS[i]}.</span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Feedback + next */}
        {selected !== null && (
          <div className="mt-5 text-center animate-slide-up">
            <p className={`text-sm font-medium mb-3 ${
              selected === q.respuesta ? 'text-emerald-600' : 'text-red-500'
            }`}>
              {selected === q.respuesta
                ? quiz.textoCorecto
                : `${quiz.textoIncorrecto} ${q.opciones[q.respuesta]}`}
            </p>
            <button onClick={handleNext} className="btn-primary">
              {current + 1 >= total ? quiz.botonResultado : quiz.botonSiguiente}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
