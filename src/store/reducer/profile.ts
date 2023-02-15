import { SAVE_USER, SAVE_PROFILE } from "../action_types/profile";

export type User = {
  id: string;
  name: string;
  photo: string;
  art_count: number;
  follow_count: number;
  fans_count: number;
  like_count: number;
};
export type Profile = {
  id: string;
  photo: string;
  name: string;
  mobile: string;
  gender: number;
  birthady: string;
};

type InitType = {
  user: User;
  profile: Profile;
};

export type ProfileAction =
  | {
      type: "profile/user";
      payload: { data: User };
    }
  | {
      type: "profile/profile";
      payload: { data: Profile };
    };

const initValue = {
  user: {},
  profile: {},
} as InitType;

export default function reducer(state = initValue, action: ProfileAction) {
  if (action.type === SAVE_USER) {
    return { ...state, user: action.payload.data };
  } else if (action.type === SAVE_PROFILE) {
    return { ...state, profile: action.payload.data };
  } 
  return state;
}
