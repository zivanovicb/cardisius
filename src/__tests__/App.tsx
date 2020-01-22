import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "@testing-library/react";
import ConnectedApp from "../App";
import { initialState } from "../store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("<App/>", () => {
  it("should render <Menu/> if numOfPlayers hasn't been set", () => {
    const store = mockStore(initialState);
    const { getByTestId } = render(
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    );

    expect(getByTestId("menu")).not.toBe(null);
  });

  it("should render <Game/> if numofPlayers has been set", () => {
    const store = mockStore({ ...initialState, isLoading: false, numOfPlayers: 4 });
    const { getByTestId } = render(
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    );

    expect(getByTestId("game")).not.toBe(null);
  });
});
