import iconVotoNulo from '../../images/opciones-de-voto/votos-nulos.png'
import iconVotoBlanco from '../../images/opciones-de-voto/votos-blancos.png'
import iconVotoNoMarcado from '../../images/opciones-de-voto/votos-no-marcados.png'
import { v4 as uuidv4 } from 'uuid'
import { useResultadosContext } from '../hooks/ResultadosProvider'

function CardsResultados({ votosCandidatos, setVotosCandidatos, votosPorOtrasOpciones}) {

  const { agregarPuntosDeMil } = useResultadosContext()

  return (
    <>
      <div className='text-white md:col-start-4 md:col-end-13'>
          <div className='grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 md:gap-3 gap-3 text-md'>
              { votosCandidatos.map( (candidato, index) => {

                return (
                  <div key={ uuidv4() } className='border-1  p-2 flex flex-col items-center justify-start gap-1 rounded-md bg-white text-black font-semi-bold shadow-custom-card'>
                    <div className='grid grid-rows-3 w-full'>
                      <div className='row-start-1 row-end-4 flex flex-col'>
                        <div className='flex flex-col items-center justify-centerh-auto'>
                          <img src={ candidato?.url_imagen } alt='imagen-candidato' className=' h-auto my-2 rounded-full' />
                        </div>
                        <p className='text-center text-2xl border-1  text-blueBase border-2 border-blueBase py-1 rounded-md w-full'>{ candidato.votos && agregarPuntosDeMil(candidato.votos) }</p>
                      </div>
                      <div className='row-start-4 row-end-5 flex flex-col justify-between '>
                        {/* <p className='text-center'>votos </p> */}
                        <p className='text-center h-15'>{ candidato.nom_candidato }</p>
                        <p className='text-center text-sm'>{ candidato.nom_partido }</p>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div className='border-1 p-2 flex flex-col items-center justify-start gap-1 rounded-md bg-white text-black font-semi-bold shadow-custom-card'>
                <div className='grid grid-rows-3 w-full'>
                  <div className='row-start-1 row-end-4 flex flex-col'>
                    <div className='flex flex-col items-center justify-center h-auto'>
                      <img src={ iconVotoBlanco } alt='imagen-candidato' className=' h-auto my-2 rounded-full' />
                    </div>
                    <p className='text-center text-2xl border-1  text-blueBase border-2 border-blueBase py-1 rounded-md w-full'>{ votosPorOtrasOpciones.votos_blancos }</p>
                  </div>
                  <div className='row-start-4 row-end-5 '>
                    {/* <p className='text-center'>votos </p> */}
                    
                  </div>
                </div>
              </div>

              <div className='border-1  p-2 flex flex-col items-center justify-start gap-1 rounded-md bg-white text-black font-semi-bold shadow-custom-card'>
                <div className='grid grid-rows-3 w-full'>
                  <div className='row-start-1 row-end-4 flex flex-col'>
                    <div className='flex flex-col items-center justify-center h-auto'>
                      <img src={ iconVotoNulo } alt='imagen-candidato' className=' h-auto my-2 rounded-full' />
                    </div>
                    <p className='text-center text-2xl border-1  text-blueBase border-2 border-blueBase py-1 rounded-md w-full'>{ votosPorOtrasOpciones.votos_nulos }</p>
                  </div>
                  <div className='row-start-4 row-end-5 '>
                    {/* <p className='text-center'>votos </p> */}
                    
                  </div>
                </div>
              </div>
              <div className='border-1  p-2 flex flex-col items-center justify-start gap-1 rounded-md bg-white text-black font-semi-bold shadow-custom-card'>
                <div className='grid grid-rows-3 w-full'>
                  <div className='row-start-1 row-end-4 flex flex-col'>
                    <div className='flex flex-col items-center justify-center h-auto'>
                      <img src={ iconVotoNoMarcado } alt='imagen-candidato' className=' h-auto my-2 rounded-full' />
                    </div>
                    <p className='text-center text-2xl border-1  text-blueBase border-2 border-blueBase py-1 rounded-md w-full'>{ votosPorOtrasOpciones.votos_no_marcados }</p>
                  </div>
                  <div className='row-start-4 row-end-5 '>
                    {/* <p className='text-center'>votos </p> */}
                    
                  </div>
                </div>
              </div>
          </div>
        </div>
    </>
  )
}

export default CardsResultados
