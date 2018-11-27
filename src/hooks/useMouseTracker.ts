import * as React from "react";
import { useState } from "react";

export function useMouseTracker() {
  const [isDragging, setDragging] = useState(false);
  const [subViewWidth, setSubViewWidth] = useState(800);

  document.onmousemove = e => {
    if (isDragging) setSubViewWidth(Math.max(window.innerWidth - e.pageX, 400));
  };
  document.onmouseup = () => setDragging(false);
  document.onmouseleave = () => setDragging(false);

  return [subViewWidth, isDragging, setDragging] as [
    number,
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ];
}
