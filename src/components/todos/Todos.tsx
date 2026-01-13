import { AllMight } from "@components/all-might/AllMight";
import { Empty } from "@components/empty/Empty";
import { ListFooter } from "@components/list-footer/ListFooter";
import { ListHeader } from "@components/list-header/ListHeader";
import { List } from "@components/list/List";
import { useTodoStore } from "@stores/todoStore";
import styles from "./Todos.module.css";

export const Todos = () => {
    const todos = useTodoStore((state) => state.todos);
    const todosOrder = useTodoStore((state) => state.order);

    return (
        <div className={styles.wrapper}>
            <ListHeader />
            {todos.length > 0 ? <List todos={todos} order={todosOrder} /> : <Empty />}
            <ListFooter />
            <AllMight />
        </div>
    );
};
