const initialState = {
  authenticated: false
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authenticated: true
      };
    case 'LOGIN_FAILURE':
      return initialState;
    default:
      return state;
  }
};

export default app;
