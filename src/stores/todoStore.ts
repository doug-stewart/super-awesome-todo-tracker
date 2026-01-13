import type { ToDo } from "src/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TodoState = {
    todos: ToDo[];
    order: Array<ToDo["id"]>;
    selected: Array<ToDo["id"]>;
    addTodo: () => void;
    deleteTodo: (id: ToDo["id"]) => void;
    setOrder: (newOrder: Array<ToDo["id"]>) => void;
    selectTodos: (ids: Array<ToDo["id"]>) => void;
    unselectTodos: (ids: Array<ToDo["id"]>) => void;
    updateTodo: (id: ToDo["id"], changes: Partial<ToDo>) => void;
};

export const useTodoStore = create<TodoState>()(
    persist(
        (set) => ({
            todos: [],
            order: [],
            selected: [],
            addTodo: () => {
                set((state) => {
                    const todo: ToDo = {
                        id: Date.now(),
                        title: "",
                        completed: false,
                    };
                    return {
                        todos: [...state.todos, todo],
                        order: [...state.order, todo.id],
                    };
                });
            },
            deleteTodo: (id) => {
                set((state) => ({
                    todos: state.todos.filter((todo) => todo.id !== id),
                    order: state.order.filter((todoId) => todoId !== id),
                }));
            },
            updateTodo: (id, changes) => {
                set((state) => ({
                    todos: state.todos.map((todo) =>
                        todo.id === id ? { ...todo, ...changes } : todo,
                    ),
                    order: state.order,
                }));
            },
            setOrder: (newOrder) => {
                set(() => ({ order: newOrder }));
            },
            selectTodos: (ids) => {
                set((state) => ({
                    selected: Array.from(new Set([...state.selected, ...ids])),
                }));
            },
            unselectTodos: (ids) => {
                set((state) => ({
                    selected: state.selected.filter((selectedId) => !ids.includes(selectedId)),
                }));
            },
        }),
        {
            name: "todo-store",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ todos: state.todos, order: state.order }),
        },
    ),
);
