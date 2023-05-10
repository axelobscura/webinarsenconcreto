export async function getData() {

  const categorias = [
    {
      'nombre': 'TÉCNICO EN PRUEBAS DE CAMPO DE CONCRETO-GRADO I',
      'tipo': 'rama',
      'imagen': 'https://www.webinarsenconcreto.com/images/bk11.jpeg',
      'normas': [
        {
          'ASTM': 'ASTM C31',
          'NMX': 'NMX-C-159-ONNCCE',
          'documento': 'ASTM-C-31',
          'video': 'https://webinarimcyc.com/videos/ASTM_C_31.mp4'
        },
        {
          'ASTM': 'ASTM C138',
          'NMX': 'NMX-C-162-ONNCCE',
          'documento': 'ASTM-C-138',
          'video': 'https://webinarimcyc.com/videos/ASTM_C_138.mp4'
        }
      ]
    },
    {
      'nombre': 'TÉCNICO EN PRUEBAS DE RESISTENCIA',
      'tipo': 'rama',
      'imagen': 'https://www.webinarsenconcreto.com/images/bk4.jpeg',
    },
    {
      'nombre': 'TÉCNICO EN PRUEBAS DE AGREGADOS NIVEL I',
      'tipo': 'rama',
      'imagen': 'https://www.webinarsenconcreto.com/images/bk2.jpeg',
    },
    {
      'nombre': 'TÉCNICO LABORATORISTA NIVEL 2',
      'tipo': 'rama',
      'imagen': 'https://www.webinarsenconcreto.com/images/bk11_2022.jpg',
    }
  ]

  return new Response(JSON.stringify(categorias));
}