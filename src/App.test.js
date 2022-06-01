import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import App from "./App";
import { UserCard } from "./components/UserCard";
import { useApi } from "./hooks/useApi";
import "@testing-library/jest-dom";

const inputSetup = () => {
  const utils = render(<App />);
  const input = screen.getByLabelText("name-input");
  return {
    input,
    ...utils,
  };
};

test("Renders top 2 Buttons and check disabled Active Button, and Send button is not disabled", () => {
  render(<App />);
  const activeButton = screen.getByText("Active");
  const inactiveButton = screen.getByText("Inactive");
  const sendButton = screen.getByText("ENVIAR");

  expect(activeButton).toBeInTheDocument();
  expect(inactiveButton).toBeInTheDocument();
  expect(sendButton).toBeInTheDocument();

  expect(activeButton).toBeDisabled();
  expect(sendButton).not.toBeDisabled();
});

test("Send Button is disabled when clicking Inactive Button", () => {
  render(<App />);
  const activeButton = screen.getByText("Active");
  const inactiveButton = screen.getByText("Inactive");

  const sendButton = screen.getByText("ENVIAR");

  expect(activeButton).toBeInTheDocument();
  expect(inactiveButton).toBeInTheDocument();
  expect(sendButton).toBeInTheDocument();

  expect(activeButton).toBeDisabled();
  expect(sendButton).not.toBeDisabled();

  fireEvent.click(inactiveButton);

  expect(activeButton).toBeDisabled();
});

test("Renders User Card, with the input value", async () => {
  const { input } = inputSetup();
  fireEvent.change(input, { target: { value: "Antoni" } });
  expect(input.value).toBe("Antoni");

  const { getUserData } = useApi();

  const userData = await getUserData();
  const result = { ...userData, name: input.value };
  render(<UserCard userData={result} />);

  const nameContainer = screen.getByText(input.value);
  const phoneContainer = screen.getByText(result.phone);

  expect(nameContainer).toBeInTheDocument();
  expect(phoneContainer).toBeInTheDocument();
});

test("Error when leaving the input blank", async () => {
  const { input } = inputSetup();
  fireEvent.change(input, { target: { value: "" } });
  expect(input.value).toBe("");

  const sendButton = screen.getByText("ENVIAR");

  expect(sendButton).toBeInTheDocument();
  expect(sendButton).not.toBeDisabled();

  fireEvent.click(sendButton);

  const errorMessage = screen.getByTestId("error-message");

  expect(errorMessage).toBeInTheDocument();
  console.log();
  expect(errorMessage.innerHTML).toBe("Introduce un nombre");
});
