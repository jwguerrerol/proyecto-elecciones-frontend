import React from 'react'
import { PDFViewer } from '@react-pdf/renderer';
import DocPdf from './DocPdf';

function VistaPdf() {

  return (
    <div>
      <PDFViewer style={{ width: '100%', height: '90vh'}}>
        <DocPdf departamentoT={'Casanare'} />
      </PDFViewer>
    </div>
  )
}

export default VistaPdf
