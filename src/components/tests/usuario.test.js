import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Usuario from './Usuario';
import { urlBase } from '../utils/utils'
const axios = require('axios');
require('dotenv').config();
let getUsuarios

beforeAll(async() => {
  const requestUrl = `${ urlBase }/usuarios`
  const response = await axios.get(requestUrl);
  getUsuarios = response.data;

  return getUsuarios
})

describe('usuarios', () => {

  test('verificar la lectura de usuarios registrados', async () => {
  
    expect(Array.isArray(getUsuarios)).toBe(true);
  });

  /* test('verificar que se muestre un usuario al renderizar el componente Usuario', () => {
    const text = 'Texto de prueba para gestionar la validación'
    render(
      <Usuario text={ text } />
    )

    const title = screen.getByText(text)
    expect(title).toBeInTheDocument()

  }) */
})