import React from "react";
import { useDraggable } from "@dnd-kit/core";

export default function DraggableItem({ id, image }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "none",
  };

  return (
    <img
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      src={image}
      alt={id}
      className="draggable-item"
      style={style}
    />
  );
}
