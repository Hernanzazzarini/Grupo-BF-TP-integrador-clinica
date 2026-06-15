export const logger = (accion, usuarioId = null) => {
  console.log(
    `[AUDITORIA] ${new Date().toISOString()} - ${accion} - Usuario: ${usuarioId}`
  );
};