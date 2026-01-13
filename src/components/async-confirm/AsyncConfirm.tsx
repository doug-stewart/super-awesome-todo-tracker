import type { PropsWithChildren, RefObject } from "react";
import { createPortal } from "react-dom";
import styles from "./AsyncConfirm.module.css";

type AsyncConfirmType = PropsWithChildren & {
    ref: RefObject<HTMLDialogElement | null>;
};

export const AsyncConfirm = ({ children, ref }: AsyncConfirmType) => {
    return createPortal(
        <dialog ref={ref} className={styles.dialog}>
            {children}
        </dialog>,
        document.body,
    );
};
