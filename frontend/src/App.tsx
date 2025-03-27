import { useState, useCallback } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";

import "./styles/styles.css";

import DroppableContainer from "@/components/DroppableContainer";
import Sidebar from "@/components/Sidebar"; // Importamos la barra lateral
import TopBar from "@/components/TopBar"; // Importa el nuevo componente

import { useContainer } from "@/contexts/container";

import { downloadEmptyZip } from "@/utils/zip";

export default function App() {
  const {
    containers,
    selectedContainer,
    selectedContainerId,
    update,
    add,
  } = useContainer();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;

    const itemId = active.id;
    const containerId = over.id;

    update(containerId as string, itemId as string);
  }, []);


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

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="app-container">
        <TopBar />
        <Sidebar
          downloadJSON={downloadJSON} // Pasar función de descarga al sidebar
        />

        <div className="edit-area">
          <div className="top-edit-area">
            <h1>Container Editor</h1>

            <div className="top-add-container">
              <h2>Add New Container</h2>
              <button className="add-container-btn" onClick={add}>
                +
              </button>
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
                isSelected={selectedContainerId === container.id} // Pasar si está seleccionado
                onContainerClick={() => selectedContainer(container.id)}
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
