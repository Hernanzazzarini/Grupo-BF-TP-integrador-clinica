import PDFDocument from 'pdfkit';
import * as PdfService from '../services/pdf.service.js';

export const generarReporteTurnos = async (req, res) => {
  try {
    const turnos = await PdfService.getTurnosParaReporte();

    const totalTurnos    = turnos.length;
    const totalAtendidos = turnos.filter(t => t.atentido === 1).length;
    const totalFacturado = turnos.reduce((sum, t) => sum + parseFloat(t.valor_total), 0);

    const porObraSocial = {};
    for (const t of turnos) {
      if (!porObraSocial[t.obra_social]) porObraSocial[t.obra_social] = { cantidad: 0, facturado: 0 };
      porObraSocial[t.obra_social].cantidad++;
      porObraSocial[t.obra_social].facturado += parseFloat(t.valor_total);
    }

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="reporte-turnos.pdf"');
    doc.pipe(res);

    // Encabezado
    doc.fontSize(18).font('Helvetica-Bold').text('Clínica Médica — Informe de Turnos', { align: 'center' });
    doc.fontSize(10).font('Helvetica').text(`Generado: ${new Date().toLocaleString('es-AR')}`, { align: 'center' });
    doc.moveDown(1.5);

    // Resumen general
    doc.fontSize(13).font('Helvetica-Bold').text('Resumen general');
    doc.moveDown(0.4);
    doc.fontSize(11).font('Helvetica');
    doc.text(`Total de turnos registrados : ${totalTurnos}`);
    doc.text(`Turnos atendidos            : ${totalAtendidos}`);
    doc.text(`Turnos pendientes           : ${totalTurnos - totalAtendidos}`);
    doc.text(`Total facturado             : $${totalFacturado.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`);
    doc.moveDown(1.5);

    // Por obra social
    doc.fontSize(13).font('Helvetica-Bold').text('Turnos por obra social');
    doc.moveDown(0.4);

    const colOS = 50, colCant = 310, colFact = 400;
    const yHeader = doc.y;
    doc.fontSize(10).font('Helvetica-Bold');
    doc.text('Obra social', colOS,   yHeader);
    doc.text('Cantidad',   colCant,  yHeader);
    doc.text('Facturado',  colFact,  yHeader);
    doc.moveDown(0.2);
    doc.moveTo(colOS, doc.y).lineTo(550, doc.y).strokeColor('#aaaaaa').stroke();
    doc.moveDown(0.3);
    doc.font('Helvetica').fontSize(10);

    for (const [nombre, datos] of Object.entries(porObraSocial)) {
      const y = doc.y;
      doc.text(nombre, colOS, y, { width: 240 });
      doc.text(String(datos.cantidad), colCant, y);
      doc.text(`$${datos.facturado.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`, colFact, y);
      doc.moveDown(0.5);
    }
    doc.moveDown(1.5);

    // Detalle de turnos
    doc.fontSize(13).font('Helvetica-Bold').text('Detalle de turnos');
    doc.moveDown(0.4);

    const COL = { id: 50, paciente: 80, medico: 210, os: 330, fecha: 410, valor: 480, estado: 530 };
    const yTbl = doc.y;
    doc.fontSize(9).font('Helvetica-Bold');
    doc.text('#',           COL.id,       yTbl);
    doc.text('Paciente',    COL.paciente, yTbl, { width: 120 });
    doc.text('Médico',      COL.medico,   yTbl, { width: 110 });
    doc.text('Obra social', COL.os,       yTbl, { width: 75 });
    doc.text('Fecha',       COL.fecha,    yTbl, { width: 65 });
    doc.text('Valor',       COL.valor,    yTbl, { width: 48 });
    doc.text('Estado',      COL.estado,   yTbl, { width: 40 });
    doc.moveDown(0.2);
    doc.moveTo(COL.id, doc.y).lineTo(570, doc.y).strokeColor('#aaaaaa').stroke();
    doc.moveDown(0.3);
    doc.font('Helvetica').fontSize(8);

    for (const t of turnos) {
      if (doc.y > 720) { doc.addPage(); doc.moveDown(0.5); }
      const fecha  = new Date(t.fecha_hora).toLocaleDateString('es-AR');
      const valor  = `$${parseFloat(t.valor_total).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
      const estado = t.atentido === 1 ? 'Atendido' : 'Pendiente';
      const yRow   = doc.y;
      doc.text(String(t.id_turno_reserva), COL.id,       yRow, { width: 25 });
      doc.text(t.paciente,                 COL.paciente, yRow, { width: 120 });
      doc.text(t.medico,                   COL.medico,   yRow, { width: 110 });
      doc.text(t.obra_social,              COL.os,       yRow, { width: 75 });
      doc.text(fecha,                      COL.fecha,    yRow, { width: 65 });
      doc.text(valor,                      COL.valor,    yRow, { width: 48 });
      doc.text(estado,                     COL.estado,   yRow, { width: 40 });
      doc.moveDown(0.6);
    }

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al generar el PDF' });
  }
};
