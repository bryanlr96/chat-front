
const initialState = {
  user: null,
  activeContact: {},
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'CLEAR_USER':
      return { ...state, user: null };
    case 'ADD_ACTIVE_CONTACT':
      return { ...state, activeContact: action.payload };
    default:
      return state;
  }
};

export { chatReducer, initialState };
export default chatReducer;
