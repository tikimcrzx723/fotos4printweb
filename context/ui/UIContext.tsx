import { createContext } from 'react';

interface ContextProps {
  isMenuOpen: boolean;
  isDelivery: boolean;

  // Methods
  toggleSideMenu: () => void;
  deliveryOrStore: () => void;
}

export const UIContext = createContext({} as ContextProps);
