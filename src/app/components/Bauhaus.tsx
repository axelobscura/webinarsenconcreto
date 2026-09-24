// Piezas visuales compartidas del sistema Bauhaus

export const ACENTOS = [
  { bg: 'bg-cobalt', text: 'text-white', shape: 'circle' },
  { bg: 'bg-mist', text: 'text-ink', shape: 'triangle' },
  { bg: 'bg-navy', text: 'text-white', shape: 'square' },
  { bg: 'bg-steel', text: 'text-ink', shape: 'half' },
] as const;

export const acento = (index: number) => ACENTOS[index % ACENTOS.length];

export function Shape({ tipo, className = '' }: { tipo: string, className?: string }) {
  if (tipo === 'circle') return <span className={`block rounded-full ${className}`} />;
  if (tipo === 'triangle') return <span className={`block bh-triangle ${className}`} />;
  if (tipo === 'half') return <span className={`block bh-halfcircle ${className}`} />;
  return <span className={`block ${className}`} />;
}

export function PageHeading({
  titulo,
  eyebrow,
  subtitulo,
}: {
  titulo: string,
  eyebrow?: string,
  subtitulo?: string,
}) {
  return (
    <div className='relative pt-6 pb-10 mb-10 border-b-[3px] border-ink'>
      <div className='absolute top-0 right-0 hidden gap-3 sm:flex' aria-hidden>
        <Shape tipo='circle' className='w-14 h-14 bg-cobalt' />
        <Shape tipo='square' className='w-14 h-14 bg-navy' />
        <Shape tipo='triangle' className='w-14 h-14 bg-mist' />
      </div>
      {eyebrow && (
        <p className='mb-4 bh-eyebrow'>
          <span className='w-3 h-3 bg-cobalt' /> {eyebrow}
        </p>
      )}
      <h1 className='max-w-4xl break-words bh-title'>{titulo}</h1>
      {subtitulo && <p className='max-w-2xl mt-5 text-xl font-light'>{subtitulo}</p>}
    </div>
  );
}

// Fotografía de fondo fija, en escala de grises y lavada con el color papel.
// El contenedor padre necesita `isolate` para que la capa quede detrás del contenido.
export function PageBackground({ src }: { src: string }) {
  return (
    <div className='fixed inset-0 pointer-events-none -z-10' aria-hidden>
      <div
        className='absolute inset-0 bg-center bg-cover grayscale'
        style={{ backgroundImage: `url('${src}')` }}
      />
      <div className='absolute inset-0 bg-paper/80' />
    </div>
  );
}

// Título que queda fijo bajo el encabezado al hacer scroll (72px = alto del FixedHeader).
export function StickyHeading({ titulo, eyebrow }: { titulo: string, eyebrow?: React.ReactNode }) {
  return (
    <div className='sticky top-[72px] z-40 flex items-end justify-between gap-6 px-5 py-6 border-b-[3px] border-ink bg-paper/90 backdrop-blur sm:px-10'>
      <div className='min-w-0'>
        {eyebrow && (
          <p className='mb-2 bh-eyebrow'>
            <span className='w-3 h-3 bg-cobalt' /> {eyebrow}
          </p>
        )}
        <h1 className='text-3xl font-black leading-none tracking-tight uppercase break-words hyphens-auto sm:text-5xl'>{titulo}</h1>
      </div>
      <div className='hidden gap-2 shrink-0 sm:flex' aria-hidden>
        <Shape tipo='circle' className='w-10 h-10 bg-cobalt' />
        <Shape tipo='square' className='w-10 h-10 bg-navy' />
        <Shape tipo='triangle' className='w-10 h-10 bg-mist' />
      </div>
    </div>
  );
}
