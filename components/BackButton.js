import Link from 'next/link';

export default function BackButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 text-rosa-400 hover:text-rosa-700
                 font-medium text-sm transition-colors duration-200 select-none"
    >
      <span className="text-base leading-none">←</span>
      <span>Inicio</span>
    </Link>
  );
}
