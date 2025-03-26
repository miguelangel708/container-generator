import React, { useEffect } from "react";

import { useBoolean } from "../../hooks/useBoolean";

const Dropdown = ({
  label,
  children,
  isInitialOpen = false,
  openOn = undefined,
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
