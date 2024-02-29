import axios from "axios"

const urlBase = process.env.REACT_APP_REQUEST_URL_BASE || 'build'

const modoSoloLectura = (formSelected) => {
  /* const formSelected = document.querySelector(`#${ formId }`)
  console.log({ formSelected }) */
  const inputs = formSelected.querySelectorAll('input')
  inputs.forEach( input => input.setAttribute('disabled', 'disabled'))
  const textareas = formSelected.querySelectorAll('textarea')
  textareas.forEach( input => input.setAttribute('disabled', 'disabled'))
  const selects = formSelected.querySelectorAll('select')
  selects.forEach( input => input.setAttribute('disabled', 'disabled'))
  const inputSubmit = formSelected.querySelectorAll("input[type='submit']") 
    ?
    formSelected.querySelectorAll("input[type='submit']")
    :
    formSelected.querySelector("input[type='submit']")
    ?
    formSelected.querySelector("input[type='submit']")
    :
    ''
  inputSubmit && inputSubmit?.forEach( input => input.style.display = 'none')
}

const spinner = ( elementoPadre, arrElementosHijosAEliminar = [] ) => {
  const elementoPadreSeleccionado = document.querySelector(elementoPadre)

  arrElementosHijosAEliminar.length > 0 && (
    arrElementosHijosAEliminar.forEach( elemento => {
      const elementoAEliminar = elementoPadreSeleccionado.querySelector(elemento)
      elementoPadreSeleccionado.removeChild(elementoAEliminar)
    })
  )
  const spinner = document.createElement('span')
  spinner.classList = 'loading loading-spinner text-primary my-2'
  elementoPadreSeleccionado.appendChild(spinner)
}

const votosCandidatosPorDefecto = () => {
  let candidatos = []
  axios.get(`${ urlBase }/candidatos`).then(response => {
    candidatos = response.data
    const defaultVotos = candidatos.map(candidato => candidato.votos === 0)
    return defaultVotos
  })
}

export {
  modoSoloLectura,
  spinner,
  votosCandidatosPorDefecto,
  urlBase
}
