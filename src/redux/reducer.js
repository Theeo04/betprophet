const initialState = {
  isOpen: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_OPEN":
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
};

export default rootReducer;
