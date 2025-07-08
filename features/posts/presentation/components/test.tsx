"use client";

import { useRef, useState } from "react";

const DragScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="cursor-grab overflow-x-auto border border-gray-300 p-4 whitespace-nowrap active:cursor-grabbing"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="mr-4 inline-block h-24 w-48 items-center justify-center rounded bg-blue-200"
        >
          Item {i + 1}
        </div>
      ))}
    </div>
  );
};

export default DragScroll;
