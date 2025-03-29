import React, { useState, useCallback } from "react";

import { useContainerStore } from "@/stores/containers";

interface FormProps {}

const Form: React.FC<FormProps> = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    puerto: "",
    version: "",
    red: "",
  });

  const selectedContainerId = useContainerStore((state) => state.selectedContainerId);

  const setSelectedContainerId = useContainerStore((state) => state.setSelectedContainerId);
  const save = useContainerStore((state) => state.save);
  const remove = useContainerStore((state) => state.remove);



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

  const onRemove = useCallback(() => {
    remove(selectedContainerId);
    setSelectedContainerId(null)
  }
  , [remove, selectedContainerId]);

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
        <button type="button" onClick={onRemove}>
          Eliminar
        </button>
      </form>
    </div>
  );
};

export default Form;
