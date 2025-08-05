import { render, screen } from "@testing-library/react";

function Hello() {
  return <h1>Hello, Umair!</h1>;
}

test("renders Hello component", () => {
  render(<Hello />);
  expect(screen.getByText("Hello, Umair!")).toBeInTheDocument();
});
