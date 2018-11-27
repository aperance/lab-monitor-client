import * as React from "react";
import { useState } from "react";

export function useMouseTracker() {
  const [isDragging, setDragging] = useState(false);
  const [subViewWidth, setSubViewWidth] = useState(800);

  document.onmousemove = e => {
    if (isDragging) {
      const position = window.innerWidth - e.pageX;
      const max = window.innerWidth - 300;
      const min = 300;
      setSubViewWidth(Math.min(Math.max(position, min), max));
    }
  };
  document.onmouseup = () => {
    if (isDragging) setDragging(false);
  };
  document.onmouseleave = () => {
    if (isDragging) setDragging(false);
  };

  return [subViewWidth, isDragging, setDragging] as [
    number,
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ];
}
