import { createContext } from 'react';

interface ContextProps {
  isMenuOpen: boolean;
  isDelivery: boolean;
  freeDelivery: boolean;

  // Methods
  toggleSideMenu: () => void;
  deliveryOrStore: () => void;
  closeDelivery: () => void;
}

export const UIContext = createContext({} as ContextProps);
