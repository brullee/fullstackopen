import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todo from "./Todo";

describe("<Todo />", () => {
  let deleteHandler, doneHandler;

  beforeEach(() => {
    deleteHandler = vi.fn();
    doneHandler = vi.fn(() => {
      todoItem.rerender(
        <Todo
          text="Run this test"
          done={true}
          onComplete={doneHandler}
          onDelete={deleteHandler}
        />,
      );
    });

    const todoItem = render(
      <Todo
        text="Run this test"
        done={false}
        onComplete={doneHandler}
        onDelete={deleteHandler}
      />,
    );
  });

  test("renders Todo text", () => {
    expect(screen.getByText("Run this test")).toBeVisible();
  });

  test("clicking delete calls onDelete", async () => {
    const user = userEvent.setup();

    const deleteButton = screen.getByText("Delete");
    await user.click(deleteButton);

    expect(deleteHandler).toHaveBeenCalledTimes(1);
  });

  test("clicking set as done marks it done", async () => {
    const user = userEvent.setup();

    const doneButton = screen.getByText("Set as done");
    await user.click(doneButton);

    const element = screen.getByText("This todo is done");

    expect(element).toBeVisible();
    expect(screen.queryByText("Set as done")).toBeNull();
  });
});
