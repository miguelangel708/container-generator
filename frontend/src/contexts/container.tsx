import { createContext, useContext, useState, useMemo, ReactNode } from "react";

export interface ContainerItem {
  name: string;
  version?: string;
}

export interface IContainerInfo {
  id: string;
  nombre: string;
  items: Array<ContainerItem>;
  version: string;
  puerto: string;
  red: string;
}

interface ContainerContextProps {
  selectedContainerId: string | null;
  containers: Array<IContainerInfo>;
  selectedContainer: (containerId: string) => void;
  update: (containerId: string, itemId: string) => void;
  save: (containerId: string, data: Partial<IContainerInfo>) => void;
  add: () => void;
  remove: (containerId: string | null) => void;
}

export const ContainerContext = createContext<ContainerContextProps>({} as ContainerContextProps);

type Props = {
  children: ReactNode;
};

export const ContainerProvider = ({ children }: Props) => {
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  const [containers, setContainers] = useState<Array<IContainerInfo>>([]);

  const callbacks = useMemo(
    () => ({
      selectedContainer: (containerId: string) => setSelectedContainerId(containerId),
      update: (containerId: string, itemId: string) => {
        setContainers((prev) =>
          prev.map((container) => {
            if (container.id === containerId) {
              const itemExists = container.items.some((item) => item.name === itemId);
              if (itemExists) return container;

              return {
                ...container,
                items: [...container.items, { name: itemId, version: container.version }],
              };
            }
            return container;
          }),
        );
      },
      save: (containerId: string, data: Partial<IContainerInfo>) => {
        setContainers((prev) =>
          prev.map((container) => (container.id === containerId ? { ...container, ...data } : container)),
        );
        setSelectedContainerId(null);
      },
      add: () => {
        setContainers((prev) => [
          ...prev,
          {
            id: `container-${prev.length + 1}`,
            nombre: "",
            items: [],
            version: "",
            puerto: "",
            red: "",
          },
        ]);
      },
      remove: (containerId: string | null) => {
        setContainers((prev) => prev.filter((container) => container?.id !== containerId));

        // Si el contenedor eliminado estaba seleccionado, deseleccionarlo
        if (selectedContainerId === containerId) {
          setSelectedContainerId(null);
        }
      },
    }),
    [],
  );

  return (
    <ContainerContext.Provider
      value={{
        selectedContainerId,
        containers,
        ...callbacks,
      }}
    >
      {children}
    </ContainerContext.Provider>
  );
};

export const useContainer = () => {
  const context = useContext(ContainerContext);

  if (!context) {
    throw new Error("useContainer must be used within a ContainerProvider");
  }

  return context;
};
