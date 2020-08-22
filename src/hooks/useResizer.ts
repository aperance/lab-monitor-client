import {useState, useEffect} from "react";
import {useDispatch} from "../redux/store";
import {draggingSet} from "../redux/actionCreators";

export const useResizer = (startValue: number): [number, () => void] => {
  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState(startValue);
  const dispatch = useDispatch();

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

    dispatch(draggingSet(isDragging));
  }, [isDragging, dispatch]);

  return [position, () => setDragging(true)];
};
