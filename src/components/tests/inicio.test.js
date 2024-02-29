import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Inicio from './Inicio'
import { urlBase } from '../../utils/utils'
require('dotenv').config()

describe('verificando la pagina de Inicio', () => {
  test('verificando texto de apoyo', () => {
    render(<Inicio />)
    const title = screen.getByText(/Bienvenidos a elecciones/i)
    expect(title).toBeInTheDocument()
  })
})  