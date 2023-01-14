import {LOGOUT} from '../action_types/profile'


const initValue = { token: "", refresh_token: "" };

export default function reducer(state = initValue, action) {
  switch (action.type) {
    case "login/token":
      return action.payload;
    case LOGOUT:
     
      return { token: "", refresh_token: "" }
    default:
      return state;
  }
}
