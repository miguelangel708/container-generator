import React, { useEffect } from "react";

import { useBoolean } from "../../hooks/useBoolean";

interface DropdownProps {
  label: string;
  children: React.ReactNode;
  isInitialOpen?: boolean;
  openOn?: string | null;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  children,
  isInitialOpen = false,
  openOn = null
}) => {
  const [isOpen, { toggle, on }] = useBoolean(isInitialOpen);

  useEffect(() => {
    if (openOn) {
      on();
    }
  }, [openOn, on]);

  return (
    <>
      <button className="dropdown-btn" onClick={toggle}>
        {label} {isOpen ? "▲" : "▼"}
      </button>
      {isOpen && children}
    </>
  );
};
export default Dropdown;
