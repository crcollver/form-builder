import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { useState } from 'react';

function Droppable(props: React.PropsWithChildren<{ id: string; }>) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="border-2 border-cyan-400">
      {props.children}
    </div>
  )
}

function Draggable(props: React.PropsWithChildren<{}>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes} className="bg-red-300">
      {props.children}
    </button>
  )
}

function App() {
  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState("");

  const draggableMarkup = (<Draggable>Drag Me</Draggable>)

  return (
    <DndContext onDragEnd={handleDragEnd}>

      {parent === "" ? draggableMarkup : null}
      {containers.map((id) => (
        <Droppable key={id} id={id}>
          {parent === id ? draggableMarkup : "Drop here"}
        </Droppable>
      ))}
    </DndContext>
  )

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;
    setParent(over ? over.id.toString() : "");
  }
}

export default App
