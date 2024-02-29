import '@testing-library/jest-dom/extend-expect'
import Resultados from "./Resultados";
import { render, screen } from '@testing-library/react'

describe('verificar componente resultados', () => {
  test('verificar que se muestra el título', () => {
    render(<Resultados />)
    const title = screen.getByText(/resultados/i)
    expect(title).toBeInTheDocument()
  })
})