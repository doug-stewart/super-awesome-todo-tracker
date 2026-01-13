import type { UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export const reorderItems = (
    items: Array<UniqueIdentifier>,
    active: UniqueIdentifier,
    over: UniqueIdentifier,
) => {
    if (active === over) return items;

    const oldIndex = items.findIndex((item) => item === active);
    const newIndex = items.findIndex((item) => item === over);

    if (oldIndex === newIndex || newIndex === -1) return items;

    const update = arrayMove(items, oldIndex, newIndex);

    return update;
};

export const randomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 45) + 60;
    const lightness = Math.floor(Math.random() * 10) + 48;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
