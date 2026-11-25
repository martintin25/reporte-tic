import React, { useEffect, useState } from 'react';
import { tecnicoService } from '../services/tecnicoService';
import { generarReporteTecnicosPDF } from '../utils/pdfGenerator';

export const ReporteTecnicosPdf = () => {
  const [tecnicos, setTecnicos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarDatos = async (textoBusqueda = '') => {
    try {
      setLoading(true);
      setError(null);
      const data = await tecnicoService.obtenerTecnicos(textoBusqueda);
      setTecnicos(data);
    } catch (err) {
      setError('Error al conectar con Supabase. Verifique su archivo .env y la tabla tecnicos_tic.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos(filtro);
  }, [filtro]);

  const handleDescargarPDF = () => {
    generarReporteTecnicosPDF(tecnicos, filtro);
  };

  return (
    <div className="report-wrapper">
      <header className="report-header">
        <h1>Oficina de TIC — Reporte de Técnicos de Soporte</h1>
        <p>Vista previa de personal técnico registrado en Supabase y exportación a formato PDF.</p>
      </header>

      <div className="toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Filtrar por nombres, apellidos o correo..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button
          className="btn-pdf"
          onClick={handleDescargarPDF}
          disabled={loading || tecnicos.length === 0}
        >
          Descargar Reporte PDF
        </button>
      </div>

      {loading && <div className="status-box">Consultando base de datos en Supabase...</div>}
      {error && <div className="error-box">{error}</div>}

      {!loading && !error && (
        <>
          <div className="summary-bar">
            <span>Registros listos para exportar: <strong>{tecnicos.length}</strong></span>
          </div>

          <div className="table-responsive">
            <table className="tic-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Primer Nombre</th>
                  <th>Segundo Nombre</th>
                  <th>Primer Apellido</th>
                  <th>Segundo Apellido</th>
                  <th>Correo Institucional</th>
                </tr>
              </thead>
              <tbody>
                {tecnicos.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                      No se encontraron técnicos con el criterio de búsqueda.
                    </td>
                  </tr>
                ) : (
                  tecnicos.map((t) => (
                    <tr key={t.id}>
                      <td><strong>#{t.id}</strong></td>
                      <td>{t.nombre1}</td>
                      <td>{t.nombre2 || '-'}</td>
                      <td>{t.apellido1}</td>
                      <td>{t.apellido2 || '-'}</td>
                      <td>{t.correo}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};