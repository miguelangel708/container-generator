import React, { useState } from "react";


const Form = ({ containerId, onSave, onDelete, deleteContainer }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    puerto: "",
    version: "",
    red: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(containerId, formData);
  };

  return (
    <div className="form-container">
      <h3>configure container {containerId}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </label>
        <label>
          Ports:
          <input type="text" name="puerto" value={formData.puerto} onChange={handleChange} required />
        </label>
        <label>
          Version:
          <input type="text" name="version" value={formData.version} onChange={handleChange} required />
        </label>
        <label>
          Network:
          <input type="text" name="red" value={formData.red} onChange={handleChange} required />
        </label>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onDelete}>Eliminar</button>
      </form>
    </div>
  );
};

export default Form;
