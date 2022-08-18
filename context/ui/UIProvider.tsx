import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
  isMenuOpen: boolean;
  isDelivery: boolean;
}

const UI_INITIAL_STATE: UIState = {
  isMenuOpen: false,
  isDelivery: false,
};

interface Props {}

export const UIProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: '[UI] - ToggleMenu' });
  };

  const deliveryOrStore = () => {
    dispatch({ type: '[UI] - Delivery' });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,

        // Methods
        toggleSideMenu,
        deliveryOrStore,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
