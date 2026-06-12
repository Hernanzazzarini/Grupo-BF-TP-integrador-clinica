import { pool } from '../config/db.js';

export const getObrasSociales = async (req, res) => {

  const [rows] = await pool.query(`
    SELECT *
    FROM obras_sociales
    WHERE activo = 1
  `);

  res.json(rows);

};

export const getObraSocial = async (req, res) => {

  const { id } = req.params;

  const [rows] = await pool.query(`
    SELECT *
    FROM obras_sociales
    WHERE id_obra_social = ?
    AND activo = 1
  `,[id]);

  if(rows.length === 0){
    return res.status(404).json({
      message:'Obra social no encontrada'
    });
  }

  res.json(rows[0]);

};

export const createObraSocial = async (req,res) => {

  const {
    nombre,
    descripcion,
    porcentaje_descuento,
    es_particular
  } = req.body;

  const [result] = await pool.query(`
    INSERT INTO obras_sociales
    (
      nombre,
      descripcion,
      porcentaje_descuento,
      es_particular
    )
    VALUES (?,?,?,?)
  `,
  [
    nombre,
    descripcion,
    porcentaje_descuento,
    es_particular
  ]);

  res.status(201).json({
    id: result.insertId,
    message:'Obra social creada correctamente'
  });

};

export const updateObraSocial = async (req,res) => {

  const { id } = req.params;

  const {
    nombre,
    descripcion,
    porcentaje_descuento,
    es_particular
  } = req.body;

  await pool.query(`
    UPDATE obras_sociales
    SET
      nombre=?,
      descripcion=?,
      porcentaje_descuento=?,
      es_particular=?
    WHERE id_obra_social=?
  `,
  [
    nombre,
    descripcion,
    porcentaje_descuento,
    es_particular,
    id
  ]);

  res.json({
    message:'Obra social actualizada correctamente'
  });

};

export const deleteObraSocial = async (req,res) => {

  const { id } = req.params;

  await pool.query(`
    UPDATE obras_sociales
    SET activo = 0
    WHERE id_obra_social = ?
  `,[id]);

  res.json({
    message:'Obra social eliminada correctamente'
  });

};