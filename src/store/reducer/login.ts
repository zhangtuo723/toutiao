import {LOGOUT} from '../action_types/profile'

type Token = {
  token:string
  refresh_token:string
}

const initValue:Token = { token: "", refresh_token: "" };

type ActionType = {
  type:'login/token'|'profile/logout'
  payload:any
}

export default function reducer(state = initValue, action:ActionType) {
  switch (action.type) {
    case "login/token":
      return action.payload;
    case LOGOUT:
     
      return { token: "", refresh_token: "" }
    case "profile/logout":
      return {} as Token
    default:
      return state;
  }
}
