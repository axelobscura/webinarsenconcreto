// Genera la constancia de aptitud en PDF (tamaño carta) en el navegador, a partir de la plantilla
// /constancias/plantilla-constancia-carta.jpg. Los datos y la foto no se envían a ningún servidor.
//
// Las posiciones, tamaños y colores se tomaron del diseño original (A4, 595.2 x 841.92 pt, CE_I.pdf).
// En la hoja carta el diseño se escala al alto de la página y queda centrado; `aCarta` hace esa conversión.

export type DatosConstancia = {
  nombre: string;
  curp: string;
  curso: string;
  foto: string; // data URL JPEG, ya recortada a la proporción del recuadro (ver PROPORCION_FOTO)
  fecha?: Date;
};

const PLANTILLA = '/constancias/plantilla-constancia-carta.jpg';
const CARTA = { ancho: 612, alto: 792 };
const A4_ALTO = 841.92;
const ESCALA = CARTA.alto / A4_ALTO;
// Margen lateral que deja el diseño A4 al escalarlo al alto de la hoja carta (72 px de 1700 en la plantilla)
const MARGEN_X = (72 / 1700) * CARTA.ancho;

const aCarta = (x: number, y: number) => ({ x: MARGEN_X + x * ESCALA, y: y * ESCALA });
const tam = (pt: number) => pt * ESCALA;

// Recuadro de la fotografía en el diseño original (pt, desde la esquina superior izquierda)
const FOTO = { x: 24.24, y: 186.96, ancho: 110.4, alto: 148.32 };
export const PROPORCION_FOTO = FOTO.ancho / FOTO.alto;

// Ancho máximo de los textos: desde la columna de texto hasta el margen derecho del diseño
const ANCHO_TEXTO = 380;

const TEXTOS = {
  nombre: { x: 183.8, y: 327.1, tam: 23.75, negrita: true, color: '#000000' },
  curp: { x: 186.3, y: 397.5, tam: 21.18, negrita: false, color: '#5B5B5B' },
  curso: { x: 185.4, y: 473.8, tam: 21.18, negrita: true, color: '#5B5B5B' },
  fecha: { x: 433.1, y: 661.8, tam: 9.93, negrita: false, color: '#232323' },
  vigencia: { x: 185.4, y: 676.1, tam: 9.37, negrita: false, color: '#232323' },
};

const formatoFecha = (fecha: Date) =>
  `${String(fecha.getDate()).padStart(2, '0')}/${String(fecha.getMonth() + 1).padStart(2, '0')}/${fecha.getFullYear()}`;

async function cargarImagen(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo cargar la plantilla (${res.status})`);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result as string);
    lector.onerror = () => reject(lector.error);
    lector.readAsDataURL(blob);
  });
}

export async function generarConstancia({ nombre, curp, curso, foto, fecha = new Date() }: DatosConstancia) {
  // jsPDF solo se descarga cuando alguien genera una constancia
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'letter', orientation: 'portrait' });
  doc.setProperties({
    title: `Constancia de aptitud - ${curso}`,
    subject: `Constancia de aptitud en ${curso}`,
    author: 'Instituto Mexicano del Cemento y del Concreto, A.C.',
    creator: 'IMCYC - Plataforma Educativa',
  });

  doc.addImage(await cargarImagen(PLANTILLA), 'JPEG', 0, 0, CARTA.ancho, CARTA.alto);

  const f = aCarta(FOTO.x, FOTO.y);
  doc.addImage(foto, 'JPEG', f.x, f.y, tam(FOTO.ancho), tam(FOTO.alto));

  // Escribe un texto reduciendo el tamaño hasta que quepa en el número de líneas indicado
  const escribir = (clave: keyof typeof TEXTOS, texto: string, { maxLineas = 1, tamMin = 12 } = {}) => {
    const t = TEXTOS[clave];
    const { x, y } = aCarta(t.x, t.y);
    const ancho = tam(ANCHO_TEXTO);
    doc.setFont('helvetica', t.negrita ? 'bold' : 'normal');
    doc.setTextColor(t.color);
    let tamano = tam(t.tam);
    let lineas: string[] = [];
    for (; ; tamano -= 0.5) {
      doc.setFontSize(tamano);
      lineas = doc.splitTextToSize(texto, ancho);
      if (lineas.length <= maxLineas || tamano <= tam(tamMin)) break;
    }
    doc.text(lineas, x, y, { lineHeightFactor: 1.2 });
  };

  const vigencia = new Date(fecha);
  vigencia.setFullYear(vigencia.getFullYear() + 1);

  escribir('nombre', nombre.trim(), { tamMin: 14 });
  escribir('curp', curp.trim().toUpperCase());
  escribir('curso', curso.trim(), { maxLineas: 2, tamMin: 13 });
  escribir('fecha', formatoFecha(fecha), { tamMin: 8 });
  escribir('vigencia', `Vigencia hasta el ${formatoFecha(vigencia)}`, { tamMin: 8 });

  const archivo = `Constancia ${curso} - ${curp.toUpperCase()}`.replace(/[\\/:*?"<>|]+/g, '').trim();
  doc.save(`${archivo}.pdf`);
}
