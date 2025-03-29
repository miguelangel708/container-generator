import { create } from "zustand";

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

interface ISelectedContainersState {
  selectedContainerId: string | null;
  setSelectedContainerId: (containerId: string | null) => void;
}

interface IContainersState extends ISelectedContainersState {
  containers: Array<IContainerInfo>;
  update: (containerId: string, itemId: string) => void;
  save: (containerId: string, data: Partial<IContainerInfo>) => void;
  add: () => void;
  remove: (containerId: string | null) => void;
}

export const useContainerStore = create<IContainersState>((set) => ({
  containers: [],
  selectedContainerId: null,
  setSelectedContainerId: (containerId: string | null = null) => set(() => ({ selectedContainerId: containerId })),
  update: (containerId: string, itemId: string) =>
    set((state) => ({
      containers: state.containers.map((container) => {
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
    })),
  save: (containerId: string, data: Partial<IContainerInfo>) =>
    set((state) => ({
      containers: state.containers.map((container) =>
        container.id === containerId ? { ...container, ...data } : container,
      ),
    })),
  add: () =>
    set((state) => ({
      containers: [
        ...state.containers,
        {
          id: `container-${state.containers.length + 1}`,
          nombre: "",
          items: [],
          version: "",
          puerto: "",
          red: "",
        },
      ],
    })),
  remove: (containerId: string | null) =>
    set((state) => ({ containers: state.containers.filter((container) => container?.id !== containerId) })),
}));
