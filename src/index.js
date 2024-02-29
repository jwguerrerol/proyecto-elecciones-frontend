import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css'
import UsuariosProvider from './components/hooks/UsuariosProvider';
import MesasProvider from './components/hooks/MesasProvider';
import CandidatosProvider from './components/hooks/CandidatosProvider';
import FiltrosProvider from './components/hooks/FiltrosProvider';
import FormularioProvider from './components/hooks/FormularioProvider';
import ResultadosProvider from './components/hooks/ResultadosProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <UsuariosProvider>
        <MesasProvider>
          <CandidatosProvider>
            <FiltrosProvider>
              <FormularioProvider>
                <ResultadosProvider>
                  <App />
                </ResultadosProvider>
              </FormularioProvider>
            </FiltrosProvider>
          </CandidatosProvider>
        </MesasProvider>
      </UsuariosProvider>
  </React.StrictMode>
);
