import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
  isMenuOpen: boolean;
  isDelivery: boolean;
  freeDelivery: boolean;
}

const UI_INITIAL_STATE: UIState = {
  isMenuOpen: false,
  isDelivery: false,
  freeDelivery: true,
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

  const closeDelivery = () => {
    dispatch({ type: '[UI] - Show Delivery' });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,

        // Methods
        toggleSideMenu,
        deliveryOrStore,
        closeDelivery,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
