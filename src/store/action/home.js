import request from "@/utils/request";
import {
  SETUSERCHANNELS,
  SETALLCHANNELS,
  SETARTICLELIST,
} from "@/store/action_types/home";
import { getLocalChannels, hasToken, seLocalChannels } from "@/utils/storage";
export const setUserChannels = (payload) => {
  return {
    type: SETUSERCHANNELS,
    payload,
  };
};

export const setAllChannels = (payload) => {
  return {
    type: SETALLCHANNELS,
    payload,
  };
};

export const getUserChannels = () => {
  return async (dispatch) => {
    if (hasToken()) {
      const res = await request({
        url: "/user/channels",
        method: "get",
      });
      dispatch(setUserChannels(res.data.channels));
      seLocalChannels(res.data.channels);
    } else {
      const channels = getLocalChannels();
      if (channels) {
        dispatch(setUserChannels(channels));
      } else {
        const res = await request({
          url: "/user/channels",
          method: "get",
        });
        dispatch(setUserChannels(res.data.channels));
        seLocalChannels(res.data.channels);
      }
    }
  };
};

export const getAllChannels = () => {
  return async (dispatch) => {
    const res = await request({
      url: "/channels",
    });
    dispatch(setAllChannels(res.data.channels));
  };
};

export const delChannel = (item) => {
  return async (dispatch, getState) => {
    const userChannels = getState().home.userChannels;
    const newChannels = userChannels.filter((v) => v.id !== item.id);
    dispatch(setUserChannels(newChannels));
    if (hasToken()) {
      await request({
        url: "/user/channels/" + item.id,
        method: "DELETE",
      });
    } else {
      seLocalChannels(newChannels);
    }
  };
};

export const addUserChannel = (item) => {
  return async (dispatch, getState) => {
    const userChannels = getState().home.userChannels;
    dispatch(setUserChannels([...userChannels, item]));
    if (hasToken()) {
      await request({
        url: "/user/channels",
        method: "patch",
        data: { channels: [{ id: item.id }] },
      });
    } else {
      seLocalChannels([...userChannels, item]);
    }
  };
};

// 获取文章列表数据
export const getArticleList = (channelId, timestap, loadMore = false) => {
  return async (dispatch) => {
    const res = await request({
      url: "/articles",
      method: "get",
      params: { channel_id: channelId, timestamp: timestap },
    });

    dispatch(
      setArticleList({
        channelId,
        timestamp: res.data.pre_timestamp,
        list: res.data.results,
        loadMore,
      })
    );
  };
};

export const setArticleList = (payload) => {
  return { type: SETARTICLELIST, payload };
};

export const setMoreAction = (payload) => {
  return {
    type: "home/setMoreAction",
    payload,
  };
};

export const unLikeArticle = (article_id,ch_id) => {
  return async (dispatch,getState) => {
     await request({
      url: "article/dislikes",
      method: "post",
      data: { target: article_id },
    });

    
  
    // const channelId =  getState().home.moreAction.cahnnelId
    const articles = getState().home.articles[ch_id]
 
    const newarticles = articles.list.filter(item=>item.art_id!==article_id)

    const newp = {
      list:newarticles,
      timestamp:articles.timestamp,
      channelId:ch_id,
      loadMore:false
    }

    dispatch(setArticleList(newp))


    // dispatch
  };
};
