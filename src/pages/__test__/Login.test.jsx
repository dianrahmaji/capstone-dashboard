import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Login from "../Login";

describe("Login", () => {
  const initialState = {};
  const mockStore = configureStore();
  let store;

  it("should render page", () => {
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sign in to your account/i)).toBeDefined();
  });
});
