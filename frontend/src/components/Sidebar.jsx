import React, { useState, useEffect } from "react";
import DraggableItem from "./DraggableItem";
import Form from "./Form";

const Sidebar = ({ selectedContainer, onSave, onDelete, containers, downloadJSON, deleteContainer }) => {
  const [isTechOpen, setIsTechOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isDataOpen, setIsDataOpen] = useState(false); // Nuevo estado para la sección de estado de contenedores
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
 
  const techNames = [
    "angular",
    "react",
    "vue",
    "flask",
    "fastapi",
    "springboot",
    "node",
    "python",
    "mysql",
    "postgresql",
    "nginx",
    "Laravel",
    "mariadb"
  ];
  const images = techNames.reduce((acc, name) => {
    acc[name] = require(`../assets/${name}.png`);
    return acc;
  }, {});
  images["mongodb"] = require("../assets/mongodb.jpeg");
  const items = techNames.map((name) => ({
    id: name,
    image: images[name],
  }));



  useEffect(() => {
    if (selectedContainer) {
      setIsConfigOpen(true);
    }
  }, [selectedContainer]);

  return (
    <div className="sidebar">
      {/* Sección Tecnologías */}
      <button className="dropdown-btn" onClick={() => setIsTechOpen(!isTechOpen)}>
       Technologies {isTechOpen ? "▲" : "▼"}
      </button>

      {isTechOpen && (
        <div className="items-container">
          {items.map((item) => (
            <DraggableItem key={item.id} id={item.id} image={item.image} />
          ))}
        </div>
      )}

      {/* Sección Configuración del Contenedor */}
      <button className="dropdown-btn" onClick={() => setIsConfigOpen(!isConfigOpen)}>
      Container Configuration {isConfigOpen ? "▲" : "▼"}
      </button>

      {isConfigOpen && selectedContainer && (
        <Form containerId={selectedContainer} 
        onSave={onSave} 
        onDelete={onDelete} 
        deleteContainer={deleteContainer}/>
      )}

      {/* Sección Estado de Contenedores */}
      <button className="dropdown-btn" onClick={() => setIsDataOpen(!isDataOpen)}>
        Container Status {isDataOpen ? "▲" : "▼"}
      </button>

      {isDataOpen && (
        <div className="json-view">
          <pre>{JSON.stringify(containers, null, 2)}</pre>
          <button className="download-btn" onClick={downloadJSON}>Descargar JSON</button>
        </div>
      )}

      <button className="dropdown-btn" onClick={() => setIsNetworkOpen(!isNetworkOpen)}>
        Network configuration {isNetworkOpen ? "▲" : "▼"}
      </button>
      <button className="dropdown-btn" onClick={() => setIsNetworkOpen(!isNetworkOpen)}>
      Volume Configuration {isNetworkOpen ? "▲" : "▼"}
      </button>
    </div>
  );
};

export default Sidebar;
