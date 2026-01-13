import { useTodoStore } from "@stores/todoStore";
import { useEffect, useRef, useState } from "react";
import styles from "./AllMight.module.css";

const THRESHOLD = 5;

export const AllMight = () => {
    const firstTime = useRef(true);
    const todos = useTodoStore((state) => state.todos);
    const [isHere, setIsHere] = useState(false);

    useEffect(() => {
        // This stops it from happening the very first time and the initial render if the user has more than 5 completed todos.
        // Ideally this would track additional things like:
        // - Unique new todos (you can just spam completing a single todo to hit this repeatedly)
        // - Time since last appearance (to avoid it happening too often)
        // - Make it inertial based (do 3+ in a short time frame and it shows up)

        if (firstTime.current) {
            firstTime.current = false;
            return;
        }

        const completedCount = todos.filter((todo) => todo.completed).length;
        const isHere = Math.random() < 0.2; // 20% chance to show up

        if (completedCount < THRESHOLD || !isHere) return;

        const start = setTimeout(() => setIsHere(true), 100);
        const end = setTimeout(() => setIsHere(false), 2800);

        return () => {
            clearTimeout(start);
            clearTimeout(end);
        };
    }, [todos]);

    return isHere ? <img className={styles.allmight} alt="" src="/allmight.gif" /> : null;
};
