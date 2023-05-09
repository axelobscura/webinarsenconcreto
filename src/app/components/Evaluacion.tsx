"use client"
import { evaluacion } from '../data/evaluacion.json'

export default function Evaluacion({ categoria } : {categoria: string | null}) {

  console.log(evaluacion);

  return (
      <div className='evaluacion'>
        <h2>{categoria}</h2>
        <div className='row'>
          <div className='col-12'>
            <div className='preguntas'>
              {evaluacion.map(val => (
                <div>
                  <p>TIEMPO RESTANTE: 25:30:48</p>
                  {val.preguntas.map((preg, i) => (
                    <div className='bloque'>
                      <h4>{i + 1} - {preg.pregunta}</h4>
                      <div>
                        <ul>
                        {preg.respuestas.map(val => (
                          <li>
                            <p><input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" /> {val}</p>
                          </li>
                        ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}
