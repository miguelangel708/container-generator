import DroppableContainer from "@/components/DroppableContainer";

import { useContainerStore } from "@/stores/containers";

import { downloadEmptyZip } from "@/utils/zip";

const AddConatinerButton = () => {
  const add = useContainerStore((state) => state.add);

  return (
    <div className="top-add-container">
      <h2>Add New Container</h2>
      <button className="add-container-btn" onClick={add}>
        +
      </button>
    </div>
  );
};

const Containers = () => {
  const containers = useContainerStore((state) => state.containers);
  const selectedContainerId = useContainerStore((state) => state.selectedContainerId);

  const setSelectedContainerId = useContainerStore((state) => state.setSelectedContainerId);

  return (
    <>
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
            onContainerClick={() => setSelectedContainerId(container.id)}
          />
        ))}
      </div>

      {containers.length > 0 && (
        <button className="generate-btn" onClick={downloadEmptyZip}>
          Generate Project
        </button>
      )}
    </>
  );
};

export function MainContent() {
  return (
    <div className="edit-area">
      <div className="top-edit-area">
        <h1>Container Editor</h1>

        <AddConatinerButton />
      </div>

      <Containers />
    </div>
  );
}
