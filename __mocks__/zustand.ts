import { vi } from "vitest";
import type * as ZustandExport from "zustand";

const { create: actualCreate, createStore: actualCreateStore } =
    await vi.importActual<typeof ZustandExport>("zustand");

// a variable to hold reset functions for all stores declared in the app
export const storeResetFns = new Set<() => void>();

const createUncurried = (stateCreator: any) => {
    const store = actualCreate(stateCreator);
    const initialState = store.getState();
    storeResetFns.add(() => {
        store.setState(initialState, true);
    });
    return store;
};

export const create = (stateCreator: any) => {
    return typeof stateCreator === "function" ? createUncurried(stateCreator) : createUncurried;
};

const createStoreUncurried = (stateCreator: any) => {
    const store = actualCreateStore(stateCreator);
    const initialState = store.getState();
    storeResetFns.add(() => {
        store.setState(initialState, true);
    });
    return store;
};

export const createStore = (stateCreator: any) => {
    return typeof stateCreator === "function"
        ? createStoreUncurried(stateCreator)
        : createStoreUncurried;
};
