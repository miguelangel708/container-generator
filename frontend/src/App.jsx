import React, { useState } from "react";
import { DndContext, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import DroppableContainer from "./components/DroppableContainer";
import "./styles/styles.css";
import Sidebar from "./components/Sidebar"; // Importamos la barra lateral
import TopBar from "./components/TopBar"; // Importa el nuevo componente
import JSZip from "jszip";

const downloadEmptyZip = () => {
  const zip = new JSZip();

  zip.generateAsync({ type: "blob" }).then((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "microservices.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};


export default function App() {

  const [selectedContainer, setSelectedContainer] = useState(null); // Estado para el formulario
  const [containers, setContainers] = useState([]);
  const sensors = useSensors(useSensor(PointerSensor));


  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (!over) return;

    const itemId = active.id;
    const containerId = over.id;

    setContainers((prev) =>
      prev.map((container) => {
        if (container.id === containerId) {
          // Verificar si el item ya existe en el contenedor
          const itemExists = container.items.some(item => item.name === itemId);
          if (itemExists) return container; // No agregarlo si ya está

          return {
            ...container,
            items: [...container.items, { name: itemId, version: container.version }],
          };
        }
        return container;
      })
    );
  };


  const handleClickContainer = (containerId) => {
    setSelectedContainer(containerId); // Muestra el formulario al hacer clic en el contenedor
  };


  const handleSaveContainerData = (containerId, data) => {
    setContainers((prev) =>
      prev.map((container) =>
        container.id === containerId ? { ...container, ...data } : container
      )
    );
    setSelectedContainer(null); // Cierra el formulario después de guardar
  };


  const addContainer = () => {
    setContainers((prev) => [
      ...prev,
      { id: `container-${prev.length + 1}`, items: [], version: null, puerto:null, red:null  },
    ]);
  };



  const downloadJSON = () => {
    const dataStr = JSON.stringify(containers, null, 2);
    const blob = new Blob([dataStr], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "contenedores.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteContainer = (containerId) => {
    setContainers((prev) => prev.filter((container) => container.id !== containerId));

    // Si el contenedor eliminado estaba seleccionado, deseleccionarlo
    if (selectedContainer === containerId) {
      setSelectedContainer(null);
    }
  };



  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="app-container">
        <TopBar />
        <Sidebar
          selectedContainer={selectedContainer}
          onSave={handleSaveContainerData}
          onDelete={() => deleteContainer(selectedContainer)}
          containers={containers} // Pasar estado de contenedores al sidebar
          downloadJSON={downloadJSON} // Pasar función de descarga al sidebar
          deleteContainer={deleteContainer}
        />

        <div className="edit-area">
          <div className="top-edit-area">
            <h1>Container Editor</h1>


            <div className="top-add-container">
              <h2>Add New Container</h2>
              <button className="add-container-btn" onClick={addContainer}>+</button>
            </div>


          </div>

          <div className="droppable-area">
            {containers.map((container) => (
              <DroppableContainer
                key={container.id}
                id={container.id}
                items={container.items}
                nombre={container.nombre}
                puerto={container.puerto}
                version={container.version}
                red={container.red}
                isSelected={selectedContainer === container.id} // Pasar si está seleccionado
                onContainerClick={() => handleClickContainer(container.id)}
              />
            ))}
          </div>
          {containers.length > 0 && (
            <button className="generate-btn" onClick={downloadEmptyZip}>
              Generate Project
            </button>
          )}

        </div>
      </div>
    </DndContext>
  );
}