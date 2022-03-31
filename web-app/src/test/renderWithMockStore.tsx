import { render } from "@testing-library/react";
import configureMockStore from 'redux-mock-store';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';

import { LooseObject } from "../types";

const mockStore = configureMockStore([thunk]);

export const renderWithMockStore = (
  ui:JSX.Element,
  { mockState, ...renderOptions } : { mockState: LooseObject } = { mockState: {} }
) => {
  const store = mockStore(mockState);
  const Wrapper = ({ children } : { children: JSX.Element}) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
