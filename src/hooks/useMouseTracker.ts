import * as React from "react";
// @ts-ignore
import { useState, useRef } from "react";

export function useMouseTracker() {
  const [isDragging, setDragging] = useState(false);
  const [subViewWidth, setSubViewWidth] = useState(800);
  const ref: React.RefObject<HTMLDivElement> = useRef();

  if (ref.current) {
    ref.current.onmouseup = () => setDragging(false);
    ref.current.onmouseleave = () => setDragging(false);
    ref.current.onmousemove = e => {
      if (isDragging)
        setSubViewWidth(Math.max(window.innerWidth - e.pageX, 400));
    };
  }

  return [ref, subViewWidth, isDragging, setDragging];
}
