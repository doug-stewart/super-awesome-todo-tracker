import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import clsx from "clsx";
import styles from "./MoveHandle.module.css";

type MoveHandleProps = {
    className?: string;
    attributes?: DraggableAttributes | undefined;
    listeners?: SyntheticListenerMap | undefined;
};

export const MoveHandle = ({ className, attributes, listeners }: MoveHandleProps) => (
    <button type="button" {...attributes} {...listeners} className={clsx(styles.move, className)}>
        <svg viewBox="0 0 20 20" height={20} width={20}>
            <title>Move To-Do</title>
            <path
                fill="currentColor"
                d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"
            />
        </svg>
    </button>
);
