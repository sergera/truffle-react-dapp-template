import { render } from "@testing-library/react";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from "react-redux";

import { combinedReducer } from "../state";

export const renderWithStore = (
  ui:JSX.Element,
  { ...renderOptions } = {}
) => {
  const store = configureStore({reducer: combinedReducer});
  const Wrapper = ({ children } : { children: JSX.Element}) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
