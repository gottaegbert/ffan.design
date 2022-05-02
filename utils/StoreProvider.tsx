import React, { createContext, FC, useEffect } from "react";
import { useState } from "react";

const initialState = {
  mouse: { x: 0, y: 0 },
};

export const Context = createContext(initialState);

export const StoreProvider: FC<any> = ({ children }) => {
  const [mouse, setMouse] = useState(initialState.mouse);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  const onMouseMove = (e: any) => {
    requestAnimationFrame(() => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    });
  };

  const providerValue = React.useMemo(
    () => ({
      mouse,
    }),
    [mouse]
  );

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};
