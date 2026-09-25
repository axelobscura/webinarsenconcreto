// Piezas visuales compartidas del sistema de diseño (estilo Fórmula 1)

export const ACENTOS = [
  { bg: 'bg-gradient-to-r from-cobalt to-navy', text: 'text-white', shape: 'circle' },
  { bg: 'bg-white', text: 'text-paper', shape: 'circle' },
  { bg: 'bg-steel', text: 'text-paper', shape: 'circle' },
  { bg: 'bg-navy', text: 'text-white', shape: 'circle' },
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
    <div className='relative pt-6 pb-10 mb-10 border-b border-ink'>
      {eyebrow && (
        <p className='mb-4 bh-eyebrow'>
          <span className='w-4 h-1 bg-gradient-to-r from-cobalt to-navy' /> {eyebrow}
        </p>
      )}
      <h1 className='block w-fit max-w-4xl pt-3 pr-6 break-words border-t-4 border-r-4 border-cobalt rounded-tr-2xl bh-title'>{titulo}</h1>
      {subtitulo && <p className='max-w-2xl mt-5 text-lg font-light text-steel'>{subtitulo}</p>}
    </div>
  );
}

// Fotografía de fondo fija, en escala de grises y oscurecida con el color de fondo.
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
    <div className='sticky top-[72px] z-40 flex items-end justify-between gap-6 px-5 py-6 border-b border-ink bg-paper/95 backdrop-blur sm:px-10'>
      <div className='min-w-0'>
        {eyebrow && (
          <p className='mb-2 bh-eyebrow'>
            <span className='w-4 h-1 bg-gradient-to-r from-cobalt to-navy' /> {eyebrow}
          </p>
        )}
        <h1 className='block w-fit pt-2 pr-5 text-2xl font-black leading-tight tracking-tight uppercase break-words border-t-4 border-r-4 hyphens-auto border-cobalt rounded-tr-2xl sm:text-4xl'>{titulo}</h1>
      </div>
    </div>
  );
}
