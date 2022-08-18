import { UIState } from './';

type UIActionType = { type: '[UI] - ToggleMenu' } | { type: '[UI] - Delivery' };

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

    default:
      return state;
  }
};
