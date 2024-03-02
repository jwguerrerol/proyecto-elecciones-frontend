import axios from "axios"
import CardsResultados from "../common/CardsResultados"
import { useEffect, useState } from "react"
import imagenCandidatoLider from '../../images/candidato-lider.png'
import { useResultadosContext } from "../hooks/ResultadosProvider"
import { urlBase } from "../../utils/utils"


function Resultados() {

  const [ resultadosCandidatos, setResultadosCandidatos ] = useState([])
  const [ resultadosVotosPorOtrasOpciones, setResultadosVotosPorOtrasOpciones ] = useState({})
  const [ candidatoLider, setCandidatoLider ] = useState({})
  const [ totalDeMesas, setTotalMesas ] = useState(0)
  const [ mesasEnviadas, setMesasEnviadas ] = useState(0)
  const [ porcentajeMesasEnviadas, setPorcentajeMesasEnviadas ] = useState(0)

  const { porcentajeMesasInformadas, setPorcentajeMesasInformadas, agregarPuntosDeMil } = useResultadosContext()

  useEffect(() => {
    axios.get(`${ urlBase }/consultas/resultados/candidatos`).then(response => {
      const result = response.data
      if( result.error === 'Consulta vacia'){
        return setResultadosCandidatos([
          {
              "id_departamento": 1,
              "id_candidato": 1,
              "nom_candidato": "Cesar Augusto Ortíz Zorro",
              "id_partido": 1,
              "url_imagen": "/images/opciones-de-voto/cesar-augusto-ortiz-zorro.png",
              "votos": 0
          },
          {
              "id_departamento": 1,
              "id_candidato": 2,
              "nom_candidato": "Luis Alexis García Barrera",
              "id_partido": 2,
              "url_imagen": "/images/opciones-de-voto/luis-alexis-garcia-barrera.png",
              "votos": 0
          },
          {
              "id_departamento": 1,
              "id_candidato": 3,
              "nom_candidato": "Héctor Manuel Balaguera Quintana",
              "id_partido": 3,
              "url_imagen": "/images/opciones-de-voto/hector-manuel-balaguera-quintana.png",
              "votos": 0
          },
          {
              "id_departamento": 1,
              "id_candidato": 4,
              "nom_candidato": "Jacobo Rivera Gomez",
              "id_partido": 4,
              "url_imagen": "/images/opciones-de-voto/jacobo-rivera-gomez.png",
              "votos": 0
          },
          {
              "id_departamento": 1,
              "id_candidato": 5,
              "nom_candidato": "Alba Rocío Romero García",
              "id_partido": 5,
              "url_imagen": "/images/opciones-de-voto/alba-rocio-romero-garcia.png",
              "votos": 0
          },
          {
              "id_departamento": 1,
              "id_candidato": 6,
              "nom_candidato": "Joel Olmos Cordero",
              "id_partido": 6,
              "url_imagen": "/images/opciones-de-voto/joel-olmos-cordero.png",
              "votos": 0
          },
          {
              "id_departamento": 1,
              "id_candidato": 7,
              "nom_candidato": "Rubiela Benitez Enriquez",
              "id_partido": 7,
              "url_imagen": "/images/opciones-de-voto/rubiela-benitex-enriquez.png",
              "votos": 0
          },
          {
              "id_departamento": 1,
              "id_candidato": 8,
              "nom_candidato": "Guillermo Alexander Venlandía Granados",
              "id_partido": 8,
              "url_imagen": "/images/opciones-de-voto/guillermo-alexander-velandia-granados.png",
              "votos": 0
          },
          {
              "id_departamento": 1,
              "id_candidato": 9,
              "nom_candidato": "Marisela Duarte Rodriguez",
              "id_partido": 9,
              "url_imagen": "/images/opciones-de-voto/marisela-duarte-rodriguez.png",
              "votos": 0
          }
      ])

          

      }
      return setResultadosCandidatos(result)
    })
  }, [])

  useEffect(() => {
    axios.get(`${ urlBase }/consultas/resultados/otras-opciones`).then(response => {
      setResultadosVotosPorOtrasOpciones(response.data)
    })
  },[])

  useEffect(() => {
      setCandidatoLider( resultadosCandidatos[0] )
  }, [ resultadosCandidatos ])

  useEffect(() => {
    axios
      .get(`${ urlBase }/mesas`)
      .then(response => {
        const results = response.data
        const cantidadMesasEnviadas = results.length  
        setMesasEnviadas(cantidadMesasEnviadas)
      })
  },[])

  useEffect(() => {
    axios
      .get(`${ urlBase }/puestosdevotacion`)
      .then(response => {
        let cantidadMesas = 0
        const puestosDeVotacion = response.data
        for(let puesto of puestosDeVotacion){
          cantidadMesas = cantidadMesas +  Number(puesto.mesas_instaladas)
        }
        setTotalMesas(cantidadMesas)
        const porcentaje = ((mesasEnviadas * 100) / cantidadMesas).toFixed(2)
        setPorcentajeMesasEnviadas( porcentaje )
        setPorcentajeMesasInformadas( porcentaje)
      })
  },[ mesasEnviadas, porcentajeMesasInformadas, setPorcentajeMesasInformadas ])

  return (
    <div className="container md:w-12/12 lg:w-12/12 2xl:w-10/12">
      <h1 className="text-4xl font-bold leading-none tracking-tight text-blueBase text-center dark:text-white my-10">Resultados</h1>
      <div className="text-white grid md:grid-cols-3 gap-1 p-4 border-1 rounded-md my-4 bg-blueBase">
        <div className="flex flex-col items-center justify-center w-full">
          <div className='flex flex-col items-center justify-center max-h-36 w-full'>
            <img src={ candidatoLider?.votos === 0 || candidatoLider?.votos === undefined ? imagenCandidatoLider : candidatoLider?.url_imagen } alt='imagen-candidato' className='h-36 rounded-full' />
          </div>
          <div className='flex flex-col my-1 gap-2 items-center justify-center'>
            <p className='text-center'>{ candidatoLider?.votos === 0 || candidatoLider?.votos === undefined ? '' : candidatoLider?.nom_candidato }</p>
            <p className='text-center text-sm'>{ candidatoLider?.votos === 0 || candidatoLider?.votos === undefined ? '' : candidatoLider?.nom_partido }</p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full my-2'>
            <h2 className="text-4xl">{ candidatoLider?.votos && agregarPuntosDeMil(candidatoLider.votos) } votos</h2>
            <p className='text-center text-md border-1 border-slate-600 py-1 rounded-md w-72 my-2 bg-orange-500 hover:bg-green-400 hover:text-black transition'>Gobernador</p>
        </div>
        <div className="flex flex-col items-center justify-center w-full my-2">
          <h2 className="text-4xl">{ porcentajeMesasEnviadas && porcentajeMesasEnviadas } % </h2>
          <h2>{ mesasEnviadas && mesasEnviadas } / { totalDeMesas && totalDeMesas }</h2>
          <h3>Mesas informadas</h3>
        </div>
      </div>
      <div>
        <CardsResultados votosCandidatos={ resultadosCandidatos } votosPorOtrasOpciones={ resultadosVotosPorOtrasOpciones } />
      </div>
    </div>
  )
}

export default Resultados