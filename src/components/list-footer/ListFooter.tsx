import { useTodoStore } from "@stores/todoStore";

import styles from "./ListFooter.module.css";

export const ListFooter = () => {
    const todos = useTodoStore((state) => state.todos);
    const selectedTodos = useTodoStore((state) => state.selected);
    const isAllSelected = selectedTodos.length === todos.length && todos.length > 0;

    const hasCompletedTodos = todos.some((todo) => todo.completed);
    const hasIncompleteTodos = todos.some((todo) => !todo.completed);

    const updateTodo = useTodoStore((state) => state.updateTodo);
    const deleteTodo = useTodoStore((state) => state.deleteTodo);

    const handleCompleteSelected = () => {
        for (const id of selectedTodos) {
            updateTodo(id, { completed: true });
        }
    };

    const handleIncompleteSelected = () => {
        for (const id of selectedTodos) {
            updateTodo(id, { completed: false });
        }
    };

    const handleDeleteSelected = () => {
        for (const id of selectedTodos) {
            deleteTodo(id);
        }
    };

    return selectedTodos.length > 0 ? (
        <footer className={styles.footer}>
            <button type="button" onClick={handleCompleteSelected} disabled={!hasIncompleteTodos}>
                Mark Complete
            </button>
            <button type="button" onClick={handleIncompleteSelected} disabled={!hasCompletedTodos}>
                Mark Incomplete
            </button>
            <button type="button" onClick={handleDeleteSelected} className={styles.delete}>
                Delete {isAllSelected ? "All" : "Selected"}
            </button>
        </footer>
    ) : null;
};
