import Delete from "@assets/delete.svg?react";
import { AsyncConfirm } from "@components/async-confirm/AsyncConfirm";
import { useAsyncConfirm } from "@components/async-confirm/useAsyncConfirm";
import { Checkmark } from "@components/checkmark/Checkmark";
import { Form } from "@components/form/Form";
import { MoveHandle } from "@components/move-handle/MoveHandle";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { randomColor } from "@helpers/index";
import { useTodoStore } from "@stores/todoStore";
import clsx from "clsx";
import styles from "./Todo.module.css";

export const Todo = ({ id }: { id: UniqueIdentifier }) => {
    const allSelected = useTodoStore((state) => state.selected);
    const isSelected = allSelected.includes(id);
    const todo = useTodoStore((state) => state.todos.find((t) => t.id === id));

    const deleteTodo = useTodoStore((state) => state.deleteTodo);
    const selectTodo = useTodoStore((state) => state.selectTodos);
    const unselectTodo = useTodoStore((state) => state.unselectTodos);

    const { dialogRef, openDialog, closeDialog } = useAsyncConfirm();

    const { attributes, listeners, setNodeRef, transform } = useSortable({
        id: id,
    });

    if (!todo) return <></>;

    const bgColor = randomColor();
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    const handleSelect = () => {
        if (isSelected) {
            unselectTodo([id]);
        } else {
            selectTodo([id]);
        }
    };

    const handleDelete = async () => {
        if (todo.title.trim() === "") {
            deleteTodo(todo.id);
        } else {
            const choice = await openDialog();
            if (choice === "delete") deleteTodo(todo.id);
            closeDialog();
        }
    };

    const handleConfirmKeep = () => {
        dialogRef.current?.close("keep");
    };

    const handleConfirmDelete = () => {
        dialogRef.current?.close("delete");
    };

    return (
        <li
            ref={setNodeRef}
            className={clsx(styles.todo)}
            style={{ ...style, "--bg": bgColor } as React.CSSProperties}
            aria-label={`To-Do: ${todo.title || "Untitled"}`}
        >
            <Checkmark
                title={isSelected ? "Deselect To-Do" : "Select To-Do"}
                className={styles.select}
                checked={isSelected}
                onClick={handleSelect}
            />
            <MoveHandle attributes={attributes} listeners={listeners} className={styles.handle} />
            <Form todo={todo} />
            <button type="button" onClick={handleDelete} className={styles.delete}>
                <Delete title="Delete To-Do" />
            </button>

            <AsyncConfirm ref={dialogRef}>
                <p>Are you sure you want to delete this to-do?</p>
                <button onClick={handleConfirmDelete} className={styles.remove}>
                    Delete
                </button>
                <button onClick={handleConfirmKeep} className={styles.keep}>
                    Keep
                </button>
            </AsyncConfirm>
        </li>
    );
};
