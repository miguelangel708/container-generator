import React from "react";

import DraggableItem from "../DraggableItem";
import Dropdown from "../Dropdown";
import Form from "../Form";

import { TECH_ITEMS } from "../../configs/tech";

const Sidebar = ({
  selectedContainer,
  onSave,
  onDelete,
  containers,
  downloadJSON,
  deleteContainer,
}) => {
  return (
    <div className="sidebar">
      {/* Sección Tecnologías */}
      <Dropdown label="Technologies">
        <div className="items-container">
          {TECH_ITEMS.map((item) => (
            <DraggableItem key={item.id} id={item.id} image={item.image} />
          ))}
        </div>
      </Dropdown>

      {/* Sección Configuración del Contenedor */}
      <Dropdown label="Container Configuration" openOn={selectedContainer}>
        <Form
          containerId={selectedContainer}
          onSave={onSave}
          onDelete={onDelete}
          deleteContainer={deleteContainer}
        />
      </Dropdown>

      {/* Sección Estado de Contenedores */}
      <Dropdown label="Container Status">
        <pre>{JSON.stringify(containers, null, 2)}</pre>
        <button className="download-btn" onClick={downloadJSON}>
          Descargar JSON
        </button>
      </Dropdown>

      <Dropdown label="Network Configuration">
        <div className="network-container">
          <p>Network configuration</p>
        </div>
      </Dropdown>

      <Dropdown label="Volume Configuration">
        <div className="volume-container">
          <p>Volume configuration</p>
        </div>
      </Dropdown>
    </div>
  );
};

export default Sidebar;
