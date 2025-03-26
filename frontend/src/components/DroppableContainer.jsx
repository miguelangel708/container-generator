import React from "react";
import { useDroppable } from "@dnd-kit/core";
import "./DroppableContainer.css";

export default function DroppableContainer({ id, items, nombre, puerto, version, red, isSelected, onContainerClick }) {
  const { setNodeRef } = useDroppable({ id });
  const techImages = {
    angular: require("../assets/angular.png"),
    react: require("../assets/react.png"),
    vue: require("../assets/vue.png"),
    flask: require("../assets/flask.png"),
    fastapi: require("../assets/fastapi.png"),
    springboot: require("../assets/springboot.png"),
    node: require("../assets/node.png"),
    python: require("../assets/python.png"),
    mysql: require("../assets/mysql.png"),
    postgresql: require("../assets/postgresql.png"),
    nginx: require("../assets/nginx.png"),
    mongodb: require("../assets/mongodb.jpeg"),
    Laravel: require("../assets/Laravel.png"),  // Nueva imagen
    mariadb: require("../assets/mariadb.png"),  // Nueva imagen

  };

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
            src={techImages[item.name] || techImages["default"]}
            alt={item.name}
            className="dropped-image"
          />
        </div>
      ))}

    </div>
  );
}
