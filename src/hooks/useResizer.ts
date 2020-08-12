import {useState, useEffect} from "react";

export function useResizer(startValue: number, onChange: (x: boolean) => void) {
  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState(startValue);

  useEffect(() => {
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
  }, [isDragging, onChange]);

  return [position, () => setDragging(true)] as [number, () => void];
}
