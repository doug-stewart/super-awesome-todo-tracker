import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, vi } from "vitest";
import * as zustand from "zustand";

vi.mock("zustand"); // explicitly mock zustand using __mocks__/zustand.ts

beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn(function mock(this: HTMLDialogElement) {
        this.open = true;
    });

    HTMLDialogElement.prototype.showModal = vi.fn(function mock(this: HTMLDialogElement) {
        this.open = true;
    });

    HTMLDialogElement.prototype.close = vi.fn(function mock(
        this: HTMLDialogElement,
        returnValue?: string,
    ) {
        if (returnValue !== undefined) {
            this.returnValue = returnValue;
        }
        this.open = false;
        this.dispatchEvent(new Event("close"));
    });
});

afterEach(() => {
    cleanup();
    const { storeResetFns } = zustand as unknown as { storeResetFns: Set<() => void> };
    storeResetFns.forEach((resetFn) => resetFn());
});
