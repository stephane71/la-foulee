const INITIAL_STATE = {
  foo: ""
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FOO":
      return { ...state, foo: action.payload };
    default:
      return state;
  }
};

export default reducer;
