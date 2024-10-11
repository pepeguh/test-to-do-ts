import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("добавление новой задачи при нажатии Enter", () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText("What needs to be done?");

  fireEvent.change(inputElement, { target: { value: "Новая задача" } });

  fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

  expect(screen.getByText("Новая задача")).toBeInTheDocument();
});
test("изменение статуса задачи при нажатии на чекбокс", () => {
  render(<App />);

  const taskElement = screen.getByText("Тестовое задание");
  const taskParentElement = taskElement.closest(".MuiListItemText-root");

  const checkboxElement = screen.getByTestId("checkbox-0");

  fireEvent.click(checkboxElement);

  expect(taskParentElement).toHaveClass("completed");
});
test("фильтрация активных задач", () => {
  render(<App />);

  const activeButton = screen.getByText("Active");
  
  fireEvent.click(activeButton);

  expect(screen.queryByText("Прекрасный код")).not.toBeInTheDocument();

  expect(screen.getByText("Тестовое задание")).toBeInTheDocument();
});
