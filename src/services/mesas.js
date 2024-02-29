import axios from "axios";
import { urlBase } from "../utils/utils";

const baseUrl = `${ urlBase }/mesas`

export const getAllMesas = axios.get(`${ urlBase }/consultas/mesas`)
  .then( response => {
    return response.data
})

export const getAllMesasEnviadas = axios.get(`${ urlBase }/consultas/mesas-enviadas`)
  .then(response => {
    return response.data
})

const mesasServices = {
  getAllMesas,
  getAllMesasEnviadas
}

export default mesasServices