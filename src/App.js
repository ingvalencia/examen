import React from 'react';
import Swal from 'sweetalert2';

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: '¡País registrado!',
      text: 'El país ha sido registrado exitosamente.'
    });
  };

  return (
    <div className="container mt-4">
      <h1>Registro de País</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombrePais" className="form-label">Nombre del País</label>
          <input type="text" className="form-control" id="nombrePais" required />
        </div>
        <button type="submit" className="btn btn-primary">Registrar País</button>
      </form>
    </div>
  );
}

export default App;
