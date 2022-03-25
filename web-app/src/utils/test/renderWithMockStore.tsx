import { render } from "@testing-library/react";
import configureMockStore from 'redux-mock-store';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';

interface LooseObject {
	[key: string]: any;
};

const mockStore = configureMockStore([thunk]);

const renderWithMockStore = (
  ui:JSX.Element,
  { mockState, ...renderOptions } : { mockState: LooseObject } = { mockState: {} }
) => {
  const store = mockStore(mockState);
  const Wrapper = ({ children } : { children: JSX.Element}) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export default renderWithMockStore;
