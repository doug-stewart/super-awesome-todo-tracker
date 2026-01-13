import { useTodoStore } from "@stores/todoStore";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { useDebouncedCallback } from "@tanstack/react-pacer";
import clsx from "clsx";
import type { ToDo } from "src/types";
import styles from "./Form.module.css";

type Inputs = {
    title: string;
    completed: boolean;
};

export const Form = ({ todo }: { todo: ToDo }) => {
    const updateTodo = useTodoStore((state) => state.updateTodo);

    const { control, register, handleSubmit, reset } = useForm<Inputs>({
        defaultValues: {
            title: todo.title || "",
            completed: todo.completed || false,
        },
    });

    const isCompleted = useWatch({ control, name: "completed" });

    const debouncedSubmit = useDebouncedCallback(
        (data: Inputs) => {
            // This is where we'd actually submit the change to the todo
            console.log("LOG: To-Do Updated:", data);
        },
        { wait: 1000 },
    );

    const onSubmit = (data: Inputs) => {
        updateTodo(todo.id, data);
        debouncedSubmit(data);
    };

    useEffect(() => {
        reset({
            title: todo.title || "",
            completed: todo.completed || false,
        });
    }, [todo, reset]);

    return (
        <div className={styles.container}>
            <form
                onChange={handleSubmit(onSubmit)}
                className={clsx(styles.form, isCompleted && styles.isCompleted)}
            >
                <textarea
                    autoFocus
                    className={styles.title}
                    aria-label={"Title"}
                    placeholder="What awesomeness do you want to do?"
                    {...register("title")}
                    maxLength={144}
                />
                <input
                    type="checkbox"
                    {...register("completed")}
                    aria-label="Completed?"
                    className={styles.completed}
                />
            </form>
        </div>
    );
};
