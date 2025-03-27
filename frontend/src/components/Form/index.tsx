import React, { useState } from "react";

import { useContainer } from "@/contexts/container";

interface FormProps {}

const Form: React.FC<FormProps> = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    puerto: "",
    version: "",
    red: "",
  });

  const { selectedContainerId, save, remove } = useContainer();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedContainerId) {
      save(selectedContainerId, formData);
    }
  };

  return (
    <div className="form-container">
      <h3>configure container {selectedContainerId}</h3>
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
        <button type="button" onClick={() => remove(selectedContainerId)}>
          Eliminar
        </button>
      </form>
    </div>
  );
};

export default Form;
