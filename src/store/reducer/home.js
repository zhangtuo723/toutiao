import {
  SETUSERCHANNELS,
  SETALLCHANNELS,
  SETARTICLELIST,
} from "@/store/action_types/home";
export default function reducer(
  state = {
    userChannels: [],
    allChannels: [],
    articles: {},
    moreAction: {
      visible: false,
      articleId: "",
      cahnnelId:''
    },
  },
  action
) {
  switch (action.type) {
    case SETUSERCHANNELS:
      return { ...state, userChannels: action.payload };
    case SETALLCHANNELS:
      return { ...state, allChannels: action.payload };
    case SETARTICLELIST:
      console.log(action.payload);
      return {
        ...state,
        articles: {
          ...state.articles,
          [action.payload.channelId]: {
            timestamp: action.payload.timestamp,
            list: action.payload.loadMore
              ? [
                  ...state.articles[action.payload.channelId].list,
                  ...action.payload.list,
                ]
              : action.payload.list,
          },
        },
      };
    case 'home/setMoreAction':
      return {
        ...state,
        moreAction: action.payload,
      };
    default:
      return state;
  }
}
