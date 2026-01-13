import { Todo } from "@components/todo/Todo";
import {
    closestCorners,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useDroppable,
    useSensor,
    useSensors,
    type CollisionDetection,
    type DragOverEvent,
    type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { reorderItems } from "@helpers/index";
import { useCallback, useState } from "react";

import { useTodoStore } from "@stores/todoStore";
import { useDebouncedCallback } from "@tanstack/react-pacer";
import type { ToDo } from "src/types";
import styles from "./List.module.css";

type ListProps = {
    todos: ToDo[];
    order: Array<UniqueIdentifier>;
};

export const List = ({ todos, order }: ListProps) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const [localOrder, setLocalOrder] = useState(order);

    const setTodosOrder = useTodoStore((state) => state.setOrder);

    const [dragging, setDragging] = useState(-1);

    const { setNodeRef } = useDroppable({ id: "todos" });

    const debouncedOrderSubmit = useDebouncedCallback(
        // This is where we'd actually submit the change in order
        (order) => console.log("LOG: Order has updated:", order),
        { wait: 1000 },
    );

    const handleDragOver = (event: DragOverEvent) => {
        const newOrder = reorderItems(order, event.active.id, event.over?.id || "");
        setLocalOrder(newOrder);
    };

    const handleDragEnd = () => {
        setDragging(-1);
        setTodosOrder(localOrder);
        debouncedOrderSubmit(localOrder);
    };

    const collisionDetectionStrategy: CollisionDetection = useCallback(
        (args) => {
            // Handle when dragging a todo
            const isDraggingPlaylist = !!todos.find((todo) => todo.id === dragging);

            if (isDraggingPlaylist) {
                // We only want todos to interact with other todos
                const todoContainers = args.droppableContainers.filter((container) =>
                    order.includes(container.id),
                );
                const closestPlaylists = closestCorners({
                    ...args,
                    droppableContainers: todoContainers,
                });
                return closestPlaylists;
            }

            // Otherwise it must be a item and we don't care what it interacts with
            return closestCorners(args);
        },
        [dragging, todos, order],
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={collisionDetectionStrategy}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
        >
            <SortableContext items={todos} strategy={verticalListSortingStrategy}>
                <ul className={styles.list} ref={setNodeRef} aria-label="To-dos list">
                    {todos
                        .sort((a, b) => (order.indexOf(a.id) > order.indexOf(b.id) ? 1 : -1))
                        .map((todo) => (
                            <Todo key={todo.id} id={todo.id} />
                        ))}
                </ul>
            </SortableContext>
        </DndContext>
    );
};
