import React, { useState } from 'react';

const useToggle = (initialActiveState = false) => {
  const [active, setActive] = useState(initialActiveState);

    const toggleActive = () => {
    setActive(true);
  };

  const toggleInactive = () => {
    setActive(false);
  };

  const toggle = () => {
    setActive(!active)
  };
  return {active, toggleActive, toggleInactive, toggle};
};

export default useToggle;
