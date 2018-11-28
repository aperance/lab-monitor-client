import * as React from "react";
import { useState, useEffect, useRef } from "react";

export function useMouseTracker() {
  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState(800);
  const ref = useRef(null as HTMLDivElement | null);

  useEffect(
    () => {
      if (ref.current) ref.current.onmousedown = () => setDragging(true);
    },
    [ref.current]
  );

  useEffect(
    () => {
      if (isDragging) {
        document.onmousemove = e => {
          const rawPosition = window.innerWidth - e.pageX;
          const max = window.innerWidth - 300;
          const min = 300;
          setPosition(Math.min(Math.max(rawPosition, min), max));
        };
        document.onmouseup = () => setDragging(false);
        document.onmouseleave = () => setDragging(false);
      } else {
        document.onmousemove = null;
        document.onmouseup = null;
        document.onmouseleave = null;
      }
    },
    [isDragging]
  );

  return [isDragging, position, ref] as [
    boolean,
    number,
    React.RefObject<HTMLDivElement>
  ];
}
