'use client';
import { useState } from 'react';
import { BsFileEarmarkArrowDown, BsPersonBoundingBox, BsShieldLock } from 'react-icons/bs';
import { generarConstancia, PROPORCION_FOTO } from './constancia';

type Campo = 'nombre' | 'curp' | 'telefono' | 'foto';

// Estructura oficial de la CURP (18 caracteres)
const CURP_REGEX = /^[A-Z][AEIOUX][A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HMX][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]\d$/;
const FOTO_MAX_MB = 10;

// Deja solo los 10 dígitos del teléfono; acepta espacios, guiones y la lada +52
const limpiarTelefono = (valor: string) => {
  const digitos = valor.replace(/\D/g, '');
  return digitos.length === 12 && digitos.startsWith('52') ? digitos.slice(2) : digitos;
};

const validar = (datos: { nombre: string, curp: string, telefono: string, foto: string | null }) => {
  const errores: Partial<Record<Campo, string>> = {};
  if (datos.nombre.trim().split(/\s+/).length < 2) errores.nombre = 'Escribe tu nombre completo, con apellidos.';
  if (!CURP_REGEX.test(datos.curp.trim())) errores.curp = 'La CURP debe tener 18 caracteres con el formato oficial.';
  if (limpiarTelefono(datos.telefono).length !== 10) errores.telefono = 'Escribe un teléfono de 10 dígitos.';
  if (!datos.foto) errores.foto = 'Sube una fotografía.';
  return errores;
};

// Recorta la foto al centro con la proporción del recuadro de la constancia y la convierte a JPEG
async function prepararFoto(archivo: File): Promise<string> {
  if (!/^image\/(jpeg|png|webp)$/.test(archivo.type)) throw new Error('Usa una imagen JPG, PNG o WEBP.');
  if (archivo.size > FOTO_MAX_MB * 1024 * 1024) throw new Error(`La imagen pesa más de ${FOTO_MAX_MB} MB.`);
  const url = URL.createObjectURL(archivo);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error('No se pudo leer la imagen.'));
      i.src = url;
    });
    const alto = 806;
    const ancho = Math.round(alto * PROPORCION_FOTO);
    let sw = img.naturalWidth, sh = img.naturalHeight;
    if (sw / sh > PROPORCION_FOTO) sw = sh * PROPORCION_FOTO; else sh = sw / PROPORCION_FOTO;
    const canvas = document.createElement('canvas');
    canvas.width = ancho;
    canvas.height = alto;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No se pudo procesar la imagen.');
    ctx.fillStyle = '#FFFFFF'; // fondo blanco para PNG con transparencia
    ctx.fillRect(0, 0, ancho, alto);
    ctx.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, 0, 0, ancho, alto);
    return canvas.toDataURL('image/jpeg', 0.9);
  } finally {
    URL.revokeObjectURL(url);
  }
}

// Formulario para generar la constancia de aptitud; se muestra cuando el usuario aprueba el examen
export default function FormularioConstancia({ curso } : { curso: string }) {
  const [nombre, setNombre] = useState('');
  const [curp, setCurp] = useState('');
  const [telefono, setTelefono] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [errorFoto, setErrorFoto] = useState<string | null>(null);
  const [tocados, setTocados] = useState<Partial<Record<Campo, boolean>>>({});
  const [generando, setGenerando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);

  const errores = validar({ nombre, curp, telefono, foto });
  const visible = (campo: Campo) => (tocados[campo] ? errores[campo] : undefined);
  const tocar = (campo: Campo) => setTocados((t) => ({ ...t, [campo]: true }));

  const alElegirFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    e.target.value = '';
    if (!archivo) return;
    tocar('foto');
    try {
      setErrorFoto(null);
      setFoto(await prepararFoto(archivo));
    } catch (err: any) {
      setErrorFoto(err.message);
    }
  };

  const generar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTocados({ nombre: true, curp: true, telefono: true, foto: true });
    if (Object.keys(errores).length > 0 || !foto) return;
    setGenerando(true);
    setErrorGeneral(null);
    try {
      await generarConstancia({ nombre, curp, curso, foto });
    } catch (err) {
      console.error('Error al generar la constancia:', err);
      setErrorGeneral('No se pudo generar la constancia. Intenta de nuevo.');
    } finally {
      setGenerando(false);
    }
  };

  const claseCampo = (campo: Campo) => `bh-input ${visible(campo) ? '!border-red-500' : ''}`;
  const mensaje = (campo: Campo) => visible(campo) && (
    <p id={`error-${campo}`} className='mt-2 text-sm text-red-400'>{visible(campo)}</p>
  );

  return (
    <form onSubmit={generar} noValidate className='p-6 bh-card sm:p-8'>
      <p className='mb-2 bh-eyebrow'><span className='w-4 h-1 bg-gradient-to-r from-cobalt to-navy' /> Constancia de aptitud</p>
      <h3 className='text-2xl font-black uppercase'>Genera tu constancia</h3>
      <p className='mt-2 mb-8 text-steel'>Escribe tus datos tal como deben aparecer en la constancia de <span className='font-bold text-ink'>{curso}</span>.</p>

      <div className='grid grid-cols-1 gap-8 sm:grid-cols-[180px_1fr]'>
        <div>
          <label
            htmlFor='constancia-foto'
            className={`relative flex flex-col items-center justify-center w-full overflow-hidden text-center transition border-2 border-dashed rounded-md cursor-pointer aspect-[460/618] hover:border-cobalt ${visible('foto') || errorFoto ? 'border-red-500' : 'border-ink'}`}
          >
            {foto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={foto} alt='Fotografía para la constancia' className='object-cover w-full h-full' />
            ) : (
              <span className='flex flex-col items-center gap-2 p-4 text-steel'>
                <BsPersonBoundingBox className='text-4xl' />
                <span className='text-sm font-bold tracking-wide uppercase text-ink'>Subir fotografía</span>
                <span className='text-xs'>De frente, con fondo claro</span>
              </span>
            )}
          </label>
          <input id='constancia-foto' type='file' accept='image/jpeg,image/png,image/webp' onChange={alElegirFoto} className='sr-only' />
          {foto && (
            <label htmlFor='constancia-foto' className='block mt-2 text-sm font-bold text-center cursor-pointer text-sky hover:underline'>Cambiar fotografía</label>
          )}
          {(errorFoto || visible('foto')) && <p className='mt-2 text-sm text-red-400'>{errorFoto || visible('foto')}</p>}
        </div>

        <div className='flex flex-col gap-5'>
          <div>
            <label htmlFor='constancia-nombre' className='block mb-2 bh-eyebrow'>Nombre completo</label>
            <input
              id='constancia-nombre'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              onBlur={() => tocar('nombre')}
              placeholder='Ing. Nombre Apellido Apellido'
              autoComplete='name'
              aria-invalid={!!visible('nombre')}
              aria-describedby={visible('nombre') ? 'error-nombre' : undefined}
              className={claseCampo('nombre')}
            />
            {mensaje('nombre')}
          </div>
          <div>
            <label htmlFor='constancia-curp' className='block mb-2 bh-eyebrow'>CURP</label>
            <input
              id='constancia-curp'
              value={curp}
              onChange={(e) => setCurp(e.target.value.toUpperCase().replace(/\s/g, ''))}
              onBlur={() => tocar('curp')}
              maxLength={18}
              placeholder='18 caracteres'
              autoComplete='off'
              spellCheck={false}
              aria-invalid={!!visible('curp')}
              aria-describedby={visible('curp') ? 'error-curp' : undefined}
              className={`${claseCampo('curp')} font-mono tracking-wider uppercase`}
            />
            {mensaje('curp')}
          </div>
          <div>
            <label htmlFor='constancia-telefono' className='block mb-2 bh-eyebrow'>Teléfono</label>
            <input
              id='constancia-telefono'
              type='tel'
              inputMode='tel'
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              onBlur={() => tocar('telefono')}
              placeholder='55 1234 5678'
              autoComplete='tel'
              aria-invalid={!!visible('telefono')}
              aria-describedby={visible('telefono') ? 'error-telefono' : undefined}
              className={claseCampo('telefono')}
            />
            {mensaje('telefono')}
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4 mt-8 sm:flex-row sm:items-center sm:justify-between'>
        <p className='flex items-center gap-2 text-xs text-steel'>
          <BsShieldLock className='shrink-0' /> La constancia se genera en tu navegador; tu fotografía no se envía a ningún servidor.
        </p>
        <button type='submit' disabled={generando} className='text-white bh-btn shrink-0 disabled:opacity-70'>
          <BsFileEarmarkArrowDown className='text-lg' /> {generando ? 'Generando…' : 'Generar constancia'}
        </button>
      </div>
      {errorGeneral && <p role='alert' className='mt-4 text-sm text-red-400'>{errorGeneral}</p>}
    </form>
  );
}
