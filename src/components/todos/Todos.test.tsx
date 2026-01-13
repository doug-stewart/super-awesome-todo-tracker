import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Todos } from "./Todos";

describe("Todos", () => {
    it("Renders the Todos component", () => {
        render(<Todos />);
    });

    it("Adds a new to-do focuses on the new to-do textarea after clicking Add To-Do", async () => {
        render(<Todos />);
        const addButton = screen.getByText(/Add To-Do/i);
        fireEvent.click(addButton);
        const textarea = await screen.findByRole("textbox");
        expect(textarea).toHaveFocus();
    });

    it("Removes a to-do without confirming when a to-do with no title has its delete button clicked", async () => {
        render(<Todos />);
        const addButton = screen.getByText(/Add To-Do/i);
        fireEvent.click(addButton);
        const deleteButton = (await screen.findByTitle(/Delete To-Do/i)).closest("button")!;
        fireEvent.click(deleteButton);
        expect(deleteButton).not.toBeInTheDocument();
    });

    it("Verifies deleting a to-do with a title before deleting", async () => {
        render(<Todos />);

        const addButton = screen.getByText(/Add To-Do/i);
        fireEvent.click(addButton);

        const textarea = await screen.findByRole("textbox");
        fireEvent.change(textarea, { target: { value: "My To-Do" } });

        const deleteButton = await screen.findByTitle(/Delete To-Do/i);
        fireEvent.click(deleteButton);

        const confirmDialog = await screen.findByRole("dialog");
        expect(confirmDialog).toBeInTheDocument();

        const confirmDeleteButton = screen.getByText("Delete");
        fireEvent.click(confirmDeleteButton);

        await waitFor(() => {
            expect(screen.queryByTitle(/Delete To-Do/i)).not.toBeInTheDocument();
        });
    });

    it('Keeps a to-do when "Keep" is clicked in the delete confirmation dialog', async () => {
        render(<Todos />);

        const addButton = screen.getByText(/Add To-Do/i);
        fireEvent.click(addButton);

        const textarea = await screen.findByRole("textbox");
        fireEvent.change(textarea, { target: { value: "My To-Do" } });

        const deleteButton = await screen.findByTitle(/Delete To-Do/i);
        fireEvent.click(deleteButton);

        const confirmDialog = await screen.findByRole("dialog");
        expect(confirmDialog).toBeInTheDocument();

        const keepButton = screen.getByText("Keep");
        fireEvent.click(keepButton);

        await waitFor(() => {
            expect(screen.getByTitle(/Delete To-Do/i)).toBeInTheDocument();
            expect(screen.queryByRole("dialog")).toBeNull();
        });
    });
});
