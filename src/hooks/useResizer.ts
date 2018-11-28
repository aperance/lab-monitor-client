import * as React from "react";
import { useState, useEffect, useRef } from "react";

export function useResizer(startValue: number, onChange: (x: boolean) => void) {
  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState(startValue);
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
      onChange(isDragging);
    },
    [isDragging]
  );

  return [position, ref] as [number, React.RefObject<HTMLDivElement>];
}
