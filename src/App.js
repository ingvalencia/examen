import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function App() {
  const [paises, setPaises] = useState([]);
  const [nombrePais, setNombrePais] = useState('');
  const [estados, setEstados] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState('');
  const [nombreEstado, setNombreEstado] = useState('');

  useEffect(() => {
    fetchPaises();
  }, []);

  const fetchPaises = async () => {
    try {
      const response = await axios.get('http://localhost/examen/backend/crud_paises.php');
      setPaises(response.data);
    } catch (error) {
      console.error('Error al obtener países:', error);
    }
  };

  const fetchEstados = async (paisId) => {
    try {
      const response = await axios.get(`http://localhost/examen/backend/crud_estados.php?pais_id=${paisId}`);
      if (Array.isArray(response.data)) {
        setEstados(response.data);
      } else {
        console.error('La respuesta de la API no es un array:', response.data);
      }
    } catch (error) {
      console.error('Error al obtener estados:', error);
    }
  };

  const handleSubmitPais = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost/examen/backend/crud_paises.php', { nombre: nombrePais });
      fetchPaises();
      setNombrePais('');
      Swal.fire({
        icon: 'success',
        title: '¡País registrado!',
        text: 'El país ha sido registrado exitosamente.'
      });
    } catch (error) {
      console.error('Error al registrar país:', error);
    }
  };

  const handleSubmitEstado = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost/examen/backend/crud_estados.php', { nombre: nombreEstado, pais_id: paisSeleccionado });
      fetchEstados(paisSeleccionado);
      setNombreEstado('');
      Swal.fire({
        icon: 'success',
        title: '¡Estado registrado!',
        text: 'El estado ha sido registrado exitosamente.'
      });
    } catch (error) {
      console.error('Error al registrar estado:', error);
    }
  };

  const handleDeleteEstado = async (id) => {
    // Mostrar alerta de confirmación antes de eliminar
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost/examen/backend/crud_estados.php?id=${id}`);
          fetchEstados(paisSeleccionado);
          Swal.fire({
            icon: 'success',
            title: '¡Estado eliminado!',
            text: 'El estado ha sido eliminado exitosamente.'
          });
        } catch (error) {
          console.error('Error al eliminar estado:', error);
        }
      }
    });
  };

  const handleEditEstado = async (estado) => {
    const { value: nombreEstadoEditado } = await Swal.fire({
      title: 'Editar Estado',
      input: 'text',
      inputValue: estado.nombre,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return '¡Debes ingresar un nombre de estado!';
        }
      }
    });

    if (nombreEstadoEditado) {
      try {
        await axios.put(`http://localhost/examen/backend/crud_estados.php`, { id: estado.id, nombre: nombreEstadoEditado });
        fetchEstados(paisSeleccionado);
        Swal.fire({
          icon: 'success',
          title: '¡Estado actualizado!',
          text: 'El estado ha sido actualizado exitosamente.'
        });
      } catch (error) {
        console.error('Error al actualizar estado:', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1>Registro de País y Estado</h1>
      <form onSubmit={handleSubmitPais}>
        <div className="mb-3">
          <label htmlFor="nombrePais" className="form-label">Nombre del País</label>
          <input type="text" className="form-control" id="nombrePais" required
            value={nombrePais} onChange={(e) => setNombrePais(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Registrar País</button>
      </form>

      <hr />

      <h2>Seleccionar un País</h2>
      <select className="form-select mb-3" value={paisSeleccionado} onChange={(e) => { setPaisSeleccionado(e.target.value); fetchEstados(e.target.value); }}>
        <option value="">Seleccionar País</option>
        {paises.map((pais) => (
          <option key={pais.id} value={pais.id}>{pais.nombre}</option>
        ))}
      </select>

      {paisSeleccionado && (
        <>
          <h2>Listado de Estados</h2>
          <form onSubmit={handleSubmitEstado}>
            <div className="mb-3">
              <label htmlFor="nombreEstado" className="form-label">Nombre del Estado</label>
              <input type="text" className="form-control" id="nombreEstado" required
                value={nombreEstado} onChange={(e) => setNombreEstado(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Registrar Estado</button>
          </form>

          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>País</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estados.map((estado) => (
                <tr key={estado.id}>
                  <td>{estado.id}</td>
                  <td>{estado.nombre_pais}</td>
                  <td>{estado.nombre}</td>
                  
                  <td>
                    <button className="btn btn-primary mr-2" onClick={() => handleEditEstado(estado)}>Editar</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteEstado(estado.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;

