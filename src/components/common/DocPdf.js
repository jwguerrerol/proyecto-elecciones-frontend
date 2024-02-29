import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../../images/logo-sisprecas-soft.png'
import userIcon from '../../images/user-icon.png'
import iconVotoNulo from '../../images/opciones-de-voto/votos-nulos.png'
import iconVotoBlanco from '../../images/opciones-de-voto/votos-blancos.png'
import iconVotoNoMarcado from '../../images/opciones-de-voto/votos-no-marcados.png'
import { v4 as uuidv4 } from 'uuid';

// Create styles
const styles = StyleSheet.create({
  page: { 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    boxSizing: 'border-box',
    height: '100%',
    marginTop: '10px'
  },
  container: {
    margin: 5,
    padding: '3px',
    flexGrow: 1
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px'
  },
  logoDocumento: {
    width: '60px',
    height: 'auto'
  },
  headerMain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '3px'
  },
  headerTitulo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tituloDocumento1: {
    textAlign: 'center',
    fontSize: '14px',
    padding: '5px',
    textTransform: 'uppercase'
  },
  tituloDocumento2: {
    textAlign: 'center',
    color : 'white',
    fontSize: '14px',
    padding: '5px',
    textTransform: 'uppercase',
    backgroundColor: 'gray',
  },
  headerDatosLugar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '3px auto',
    gap: '2px'
  },
  datosLugar: {
    textAlign: 'center',
    fontSize: '10px',
    padding: '3px'
  },
  datosLugarTitulo: {
    color: 'gray'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '3px auto',
  },
  resultados: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '3px'
  },
  candidato: {
    width: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5px',
    marginTop: '5px'
  },
  imagenCandidato: {
    width: '72px',
    height: 'auto'
  },
  datosCandidato: {
    fontSize: '12px'
  },
  partidoCandidato: {
    color: 'gray',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: '3px'
  },
  votosCandidato: {
    color: 'gray',
    textTransform: 'uppercase',
    border: '1px solid gray',
    padding: '3px 10px',
    marginTop: '5px',
    width: '100%',
    textAlign: 'center'
  },
  nombreCandidato: {
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: '5px',
    textAlign: 'center'
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5px',
    backgroundColor: 'gray'
  },
  contentFooter: {
    textAlign: 'center',
    color: 'white',
    fontSize: '12px',
  }
});

const candidatosTemp = [1,2,3,4,5,6,7,8,9,10,11]

// Create Document Component
const DocPdf = ({ departamento = 'Casanare', municipio, puestodevotacion, mesa, totalMesasInstaladas = 1000, totalMesasEnviadas = 500, totalDeVotos = '1000', porcentajeMesasEnviadas = '50', candidatos = candidatosTemp, votosPorOtrasOpciones }) => {

  const tituloPrincipalParte1 = 'Departamento del Casanare'
  const tituloPrincipalParte2 = 'Reporte elecciones territoriales 2023 - Gobernación'

  return (
    <Document>
      <Page size="A4" style={ styles.page }>
        <View>
          <View style={ {...styles.header, ...styles.container } }>
            <View style={ styles.headerMain}>
              <Image src={ logo } style={ styles.logoDocumento } />
              <View style={ styles.headerTitulo}>
                {/* <Text style={styles.tituloDocumento1}>{ tituloPrincipalParte1 }</Text> */}
                <Text style={styles.tituloDocumento2}>{ tituloPrincipalParte2 }</Text>
              </View>
            </View>
            <View style={ styles.headerDatosLugar}>
              <View>
                <Text style={ styles.datosLugar }><Text style={ styles.datosLugarTitulo }>Departamento:</Text> { candidatos[0].nom_departamento } </Text>
              </View>
              { municipio !== '' && (
                <View>
                  <Text style={ styles.datosLugar }><Text style={ styles.datosLugarTitulo }>Municipio:</Text> { candidatos[0].nom_municipio } </Text>
                </View>
              )}
              { puestodevotacion !== '' && (
                <View>
                  <Text style={ styles.datosLugar }><Text style={ styles.datosLugarTitulo }>Puesto de votación:</Text> { candidatos[0].nom_puestodevotacion } </Text>
                </View>
              )}
              { mesa !== '' && (
                <View>
                  <Text style={ styles.datosLugar }><Text style={ styles.datosLugarTitulo }>Mesa:</Text> { candidatos[0].id_mesa } </Text>
                </View>
              )}
            </View>
            <View>
              <Text style={ styles.datosLugar }><Text style={ styles.datosLugarTitulo }>Mesas informadas:</Text> { porcentajeMesasEnviadas }% </Text>
            </View>
          </View>
          <View style={ {...styles.main, ...styles.container} }>
            <View style={ styles.resultados }>
              <>
              { candidatos.map ( (candidato, index )=> (
                <View key={ Math.random() + index } style={ styles.candidato }>
                  <Image src={ candidato.url_imagen } alt={ 'nombre candidato' } style={ styles.imagenCandidato } />
                  <Text style={ {...styles.datosCandidato, ...styles.partidoCandidato} }>{candidato.nom_partido}</Text>
                  <Text style={ { ...styles.datosCandidato, ...styles.votosCandidato} }> Votos: { candidato.votos }</Text>
                  <Text style={ { ...styles.datosCandidato, ...styles.nombreCandidato} }>{ candidato.nom_candidato} </Text>
                </View>
              ))}
              <div key={ uuidv4() }>
                <View style={ styles.candidato }>
                  <Image src={ iconVotoBlanco } alt={ 'imagen voto en blanco' } style={ styles.imagenCandidato } />
                  <Text style={ {...styles.datosCandidato, ...styles.partidoCandidato} }></Text>
                  <Text style={ { ...styles.datosCandidato, ...styles.votosCandidato} }> Votos: { votosPorOtrasOpciones.votos_blancos }</Text>
                  <Text style={ { ...styles.datosCandidato, ...styles.nombreCandidato} }>Votos blancos </Text>
                </View>
              </div>
              <div key={ uuidv4() }>
                <View style={ styles.candidato }>
                  <Image src={ iconVotoNulo } alt={ 'imagen voto nulo' } style={ styles.imagenCandidato } />
                  <Text style={ {...styles.datosCandidato, ...styles.partidoCandidato} }></Text>
                  <Text style={ { ...styles.datosCandidato, ...styles.votosCandidato} }> Votos: { votosPorOtrasOpciones.votos_nulos }</Text>
                  <Text style={ { ...styles.datosCandidato, ...styles.nombreCandidato} }>Votos nulos </Text>
                </View>
              </div>
              <div key={ uuidv4() }>
                <View style={ styles.candidato }>
                  <Image src={ iconVotoNoMarcado } alt={ 'nombre candidato' } style={ styles.imagenCandidato } />
                  <Text style={ {...styles.datosCandidato, ...styles.partidoCandidato} }></Text>
                  <Text style={ { ...styles.datosCandidato, ...styles.votosCandidato} }> Votos: { votosPorOtrasOpciones.votos_no_marcados }</Text>
                  <Text style={ { ...styles.datosCandidato, ...styles.nombreCandidato} }>Votos no marcados</Text>
                </View>
              </div>
              </>
            </View>
          </View>
          <View style={ styles.footer }>
              <Text style={ styles.contentFooter }>SisPreCas Soft - {new Date().getFullYear() }</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default DocPdf