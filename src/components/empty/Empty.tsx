import Plus from "@assets/plus.svg?react";
import { useTodoStore } from "@stores/todoStore";

import styles from "./Empty.module.css";

export const Empty = () => {
    const addTodo = useTodoStore((state) => state.addTodo);

    return (
        <div className={styles.wrapper}>
            <p>
                You have nothing ✨awesome✨ to do?
                <br />
                But you're so cool!
            </p>
            <button onClick={() => addTodo()}>
                Do Something Awesome
                <Plus />
            </button>
        </div>
    );
};
