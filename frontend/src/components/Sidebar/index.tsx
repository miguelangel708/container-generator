import React, { useCallback } from "react";

import DraggableItem from "@components/DraggableItem";
import Dropdown from "@components/Dropdown";
import Form from "@components/Form";

import { TECH_ITEMS } from "@/configs/tech";
import { useContainerStore } from "@/stores/containers";

interface SidebarProps {}

const Technologies = () => (
  <Dropdown label="Technologies">
    <div className="items-container">
      {TECH_ITEMS.map((item) => {
        console.log(item);

        return <DraggableItem key={item.id} id={item.id} image={item.image} />;
      })}
    </div>
  </Dropdown>
);

const ContainerStatus = () => {
  const containers = useContainerStore((state) => state.containers);

  const downloadJSON = useCallback(() => {
    const dataStr = JSON.stringify(containers, null, 2);
    const blob = new Blob([dataStr], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "contenedores.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [containers]);

  return (
    <Dropdown label="Container Status">
      <pre>{JSON.stringify(containers, null, 2)}</pre>
      <button className="download-btn" onClick={downloadJSON}>
        Descargar JSON
      </button>
    </Dropdown>
  );
};

const ContainerSettings = () => {
  const selectedContainerId = useContainerStore((state) => state.selectedContainerId);

  return (
    <Dropdown label="Container Configuration" openOn={selectedContainerId}>
      <Form />
    </Dropdown>
  );
}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="sidebar">
      {/* Sección Tecnologías */}
      <Technologies />
      {/* Sección Configuración del Contenedor */}
      <ContainerSettings />

      {/* Sección Estado de Contenedores */}
      <ContainerStatus />

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
