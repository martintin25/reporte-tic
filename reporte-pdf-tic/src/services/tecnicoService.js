import { supabase } from '../api/supabaseClient';

export const tecnicoService = {
  async obtenerTecnicos(filtro = '') {
    let query = supabase
      .from('tecnicos_tic')
      .select('id, nombre1, nombre2, apellido1, apellido2, correo')
      .order('apellido1', { ascending: true });

    if (filtro.trim() !== '') {
      query = query.or(
        `nombre1.ilike.%${filtro}%,nombre2.ilike.%${filtro}%,apellido1.ilike.%${filtro}%,apellido2.ilike.%${filtro}%,correo.ilike.%${filtro}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error al consultar la tabla tecnicos_tic:', error.message);
      throw new Error(error.message);
    }

    return data || [];
  }
};