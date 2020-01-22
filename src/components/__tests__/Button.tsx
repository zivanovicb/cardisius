import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("<Button/>", () => {
  describe("<Button type='menu'/>", () => {
    it("should render menu button", () => {
      const { getByTestId } = render(
        <Button type="menu" onClick={() => {}}>
          Text 1
        </Button>
      );
      expect(getByTestId("btn-menu").textContent).toBe("Text 1");
    });

    it("should be clickable", () => {
      const fn = jest.fn();
      const { getByTestId } = render(
        <Button type="menu" onClick={fn}>
          Text 1
        </Button>
      );
      fireEvent.click(getByTestId("btn-menu"));
      expect(getByTestId("btn-menu").textContent).toBe("Text 1");
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe("<Button type='base'/>", () => {
    it("should render base button", () => {
      const { getByTestId } = render(
        <Button type="base" onClick={() => {}}>
          Text 1
        </Button>
      );
      expect(getByTestId("btn-base").textContent).toBe("Text 1");
    });
  });

  it("should be clickable", () => {
    const fn = jest.fn();
    const { getByTestId } = render(
      <Button type="base" onClick={fn}>
        Text 1
      </Button>
    );
    fireEvent.click(getByTestId("btn-base"));
    expect(getByTestId("btn-base").textContent).toBe("Text 1");
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
