import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function App() {
  const [paises, setPaises] = useState([]);
  const [nombrePais, setNombrePais] = useState('');

  useEffect(() => {
    fetchPaises();
  }, []);

  const fetchPaises = async () => {
    try {
      const response = await axios.get('http://localhost/examen/backend/crud.php');
      setPaises(response.data);
    } catch (error) {
      console.error('Error al obtener países:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost/examen/backend/crud.php', { nombre: nombrePais });
      fetchPaises();
      Swal.fire({
        icon: 'success',
        title: '¡País registrado!',
        text: 'El país ha sido registrado exitosamente.'
      });
    } catch (error) {
      console.error('Error al registrar país:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Registro de País</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombrePais" className="form-label">Nombre del País</label>
          <input type="text" className="form-control" id="nombrePais" required
            value={nombrePais} onChange={(e) => setNombrePais(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Registrar País</button>
      </form>

      <hr />

      <h2>Listado de Países</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paises.map((pais) => (
            <tr key={pais.id}>
              <td>{pais.id}</td>
              <td>{pais.nombre}</td>
              <td>
                <button className="btn btn-primary mr-2">Editar</button>
                <button className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
