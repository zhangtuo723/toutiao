const initValue = { token: "", refresh_token: "" };
export default function reducer(state = initValue, action) {
  switch (action.type) {
    case "login/token":
      return action.payload;
    default:
      return state;
  }
}
