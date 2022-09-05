import { UIState } from './';

type UIActionType =
  | { type: '[UI] - ToggleMenu' }
  | { type: '[UI] - Delivery' }
  | { type: '[UI] - Show Delivery' };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case '[UI] - ToggleMenu':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };

    case '[UI] - Delivery':
      return {
        ...state,
        isDelivery: !state.isDelivery,
      };

    case '[UI] - Show Delivery':
      return {
        ...state,
        freeDelivery: !state.freeDelivery,
      };

    default:
      return state;
  }
};
