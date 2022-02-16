import { useCallback, useEffect, useRef, useState, useContext } from "react";

interface UseDragFilesProps {
  handleSelectFiles: (files: FileList) => void;
  dependencies?: any[];
}

const useDragFiles = ({
  handleSelectFiles,
  dependencies = [],
}: UseDragFilesProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleDrag = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
    },
    [...dependencies]
  );

  const handleDragIn = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      dragCounter.current++;
      if (event.dataTransfer.items && event.dataTransfer.items.length)
        setIsDragging(true);
    },
    [...dependencies]
  );

  const handleDragOut = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      dragCounter.current--;

      if (dragCounter.current > 0) return;

      setIsDragging(false);
    },
    [...dependencies]
  );

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (event.dataTransfer.files && event.dataTransfer.files.length) {
        dragCounter.current = 0;
        setIsDragging(false);
        handleSelectFiles(event.dataTransfer.files);
      }
    },
    [...dependencies]
  );

  useEffect(() => {
    window.addEventListener("dragenter", handleDragIn);
    window.addEventListener("dragleave", handleDragOut);
    window.addEventListener("dragover", handleDrag);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragIn);
      window.removeEventListener("dragleave", handleDragOut);
      window.removeEventListener("dragover", handleDrag);
      window.removeEventListener("drop", handleDrop);
    };
  }, [...dependencies]);

  return { isDragging };
};

export default useDragFiles;
