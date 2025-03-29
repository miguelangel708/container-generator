import { useCallback } from "react";
import { DndContext, useSensor, useSensors, PointerSensor, DragEndEvent } from "@dnd-kit/core";

import "./styles/styles.css";

import Sidebar from "@/components/Sidebar"; // Importamos la barra lateral
import TopBar from "@/components/TopBar"; // Importa el nuevo componente

import { useContainerStore } from "@/stores/containers";

import { MainContent } from "@components/MainContent";

const DraggableContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const update = useContainerStore((state) => state.update);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;

    const itemId = active.id;
    const containerId = over.id;

    update(containerId as string, itemId as string);
  }, []);

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  );
};

export default function App() {
  return (
    <div className="app-container">
      <TopBar />
      <DraggableContainer>
        <Sidebar />

        <MainContent />
      </DraggableContainer>
    </div>
  );
}
