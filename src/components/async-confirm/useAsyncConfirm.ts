import { useRef } from "react";

export const useAsyncConfirm = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openDialog = async () => {
        return new Promise((resolve) => {
            if (dialogRef.current === null) {
                resolve("cancel");
            } else {
                dialogRef.current.addEventListener(
                    "close",
                    (event) => resolve((event.currentTarget as HTMLDialogElement).returnValue),
                    { once: true },
                );
                dialogRef.current.showModal();
            }
        });
    };

    const closeDialog = () => {
        dialogRef.current!.close();
    };

    return { dialogRef, openDialog, closeDialog };
};
