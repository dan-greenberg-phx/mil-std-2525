import { render, screen } from "@testing-library/react";
import FileLoader from "./FileLoader";

test("renders learn react link", () => {
  render(<FileLoader />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
