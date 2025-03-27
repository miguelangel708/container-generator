import { useDroppable } from "@dnd-kit/core";
import "./DroppableContainer.css";

import {TECH_IMAGES, TechName} from "@/configs/tech"

interface DroppableContainerProps {
  id: string;
  items: { name: string }[];
  nombre?: string;
  puerto?: string;
  version?: string;
  red?: string;
  isSelected: boolean;
  onContainerClick: () => void;
}

export default function DroppableContainer({ id, items, nombre, puerto, version, red, isSelected, onContainerClick }: DroppableContainerProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`droppable-container ${isSelected ? "selected" : ""}`} // Agregar clase si está seleccionado
      onClick={onContainerClick}
    >
      <p><strong>Container ID {id}</strong></p>
      {nombre ? (
        <p>
          <strong>Container Name:</strong> {nombre} <br />
          <strong>Port:</strong> {puerto || "N/A"} <br />
          <strong>Version:</strong> {version || "N/A"} <br />
          <strong>Network:</strong> {red || "N/A"}
        </p>
      ) : (
        <p>Haga clic para configurar el contenedor</p>
      )}
      {items.map((item, index) => (
        <div key={index} className="dropped-item">
          <img
            src={TECH_IMAGES[item.name as TechName] || TECH_IMAGES["default" as TechName]}
            alt={item.name}
            className="dropped-image"
          />
        </div>
      ))}

    </div>
  );
}
