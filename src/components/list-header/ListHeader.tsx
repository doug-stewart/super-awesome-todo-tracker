import Checked from "@assets/checked.svg?react";
import Plus from "@assets/plus.svg?react";
import Unchecked from "@assets/unchecked.svg?react";
import { useTodoStore } from "@stores/todoStore";
import styles from "./ListHeader.module.css";

export const ListHeader = () => {
    const todos = useTodoStore((state) => state.todos);
    const hasTodos = todos.length > 0;

    const selectedTodos = useTodoStore((state) => state.selected);
    const allSelected = hasTodos && selectedTodos.length === todos.length;

    const addTodo = useTodoStore((state) => state.addTodo);
    const selectTodos = useTodoStore((state) => state.selectTodos);
    const unselectTodos = useTodoStore((state) => state.unselectTodos);

    const handleSelectAll = () => {
        const allIds = todos.map((todo) => todo.id);
        if (allSelected) {
            unselectTodos(allIds);
        } else {
            selectTodos(allIds);
        }
    };

    return (
        <header className={styles.header}>
            <button onClick={handleSelectAll} type="button" disabled={!hasTodos}>
                {allSelected ? (
                    <>
                        <Checked /> Unselect All
                    </>
                ) : (
                    <>
                        <Unchecked />
                        Select All
                    </>
                )}
            </button>
            <button onClick={() => addTodo()} className={styles.add}>
                Add To-Do <Plus />
            </button>
        </header>
    );
};
