import * as PdfService from '../services/pdf.service.js';

export const generarReporteTurnos = async (req, res) => {
  try {
    const buffer = await PdfService.generarReporteTurnos();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="reporte-turnos.pdf"');
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al generar el PDF' });
  }
};
