import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders my name", () => {
  render(<App />);
  const nameElement = screen.getByText(/Cindy Leochico/i);
  expect(nameElement).toBeInTheDocument();
});
