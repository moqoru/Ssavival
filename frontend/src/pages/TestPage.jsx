import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function TestPage() {
  const [state, setState] = useState({
    items1: [
      { id: "item-1", content: "Item 1" },
      { id: "item-2", content: "Item 2" },
      { id: "item-3", content: "Item 3" },
      { id: "item-4", content: "Item 4" },
      { id: "item-5", content: "Item 5" },
      { id: "item-6", content: "Item 6" },
    ],
    items2: [],
    items3: [],
    items4: [],
    items5: [],
    items6: [],
    items7: [],
    items8: [],
    items9: [],
    items10: [],
    items11: [],
    items12: [],
    items13: [],
    items14: [],
    items15: [],
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // 드래그앤드롭이 시작된 droppable과 끝난 droppable이 다른 경우
    if (!destination) {
      return;
    }

    // 같은 droppable 내에서 요소를 이동하는 경우
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        state[source.droppableId],
        source.index,
        destination.index
      );

      setState({
        ...state,
        [source.droppableId]: items,
      });
    } else {
      // 다른 droppable로 요소를 이동하는 경우
      const result = move(
        state[source.droppableId],
        state[destination.droppableId],
        source,
        destination
      );

      setState({
        ...state,
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId],
      });
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "yellow",
        }}
      >
        <Droppable droppableId="items1">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                backgroundColor: snapshot.isDraggingOver ? "purple" : "yellpw",
                padding: 4,
                width: 250,
                minHeight: 500,
              }}
            >
              {state.items1.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      style={{
                        userSelect: "none",
                        padding: 16,
                        margin: "0 0 8px 0",
                        minHeight: "50px",
                        backgroundColor: snapshot.isDragging
                          ? "#263B4A"
                          : "#456C86",
                        color: "white",
                        ...provided.draggableProps.style,
                      }}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {[
          { id: "items9", items: state.items9 },
          { id: "items2", items: state.items2 },
          { id: "items3", items: state.items3 },
          { id: "items4", items: state.items4 },
          { id: "items5", items: state.items5 },
          { id: "items6", items: state.items6 },
          { id: "items7", items: state.items7 },
          { id: "items8", items: state.items8 },
        ].map((droppable, droppableIndex) => (
          <Droppable key={droppable.id} droppableId={droppable.id}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
                  padding: 4,
                  width: 250,
                  minHeight: 500,
                }}
              >
                {droppable.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        style={{
                          userSelect: "none",
                          padding: 16,
                          margin: "0 0 8px 0",
                          minHeight: "50px",
                          backgroundColor: snapshot.isDragging
                            ? "#263B4A"
                            : "#456C86",
                          color: "white",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}

        {/* <Droppable droppableId="items2">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
                padding: 4,
                width: 250,
                minHeight: 500,
              }}
            >
              {state.items2.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      style={{
                        userSelect: "none",
                        padding: 16,
                        margin: "0 0 8px 0",
                        minHeight: "50px",
                        backgroundColor: snapshot.isDragging
                          ? "#263B4A"
                          : "#456C86",
                        color: "white",
                        ...provided.draggableProps.style,
                      }}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable> */}
      </div>
    </DragDropContext>
  );
}

export default TestPage;
