import React from "react";

import DraggableItem from "@components/DraggableItem";
import Dropdown from "@components/Dropdown";
import Form from "@components/Form";

import { TECH_ITEMS } from "@/configs/tech";
import { useContainer } from "@/contexts/container";

interface SidebarProps {
  downloadJSON: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ downloadJSON }) => {
  const { containers, selectedContainerId } = useContainer();
  return (
    <div className="sidebar">
      {/* Sección Tecnologías */}
      <Dropdown label="Technologies">
        <div className="items-container">
          {TECH_ITEMS.map((item) => {
            console.log(item);

            return <DraggableItem key={item.id} id={item.id} image={item.image} />;
          })}
        </div>
      </Dropdown>

      {/* Sección Configuración del Contenedor */}
      <Dropdown label="Container Configuration" openOn={selectedContainerId}>
        <Form />
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
