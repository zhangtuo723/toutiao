import React, { useEffect ,useState} from "react";
import styles from "./index.module.scss";
import ArticleItem from "@/components/ArticleItem";
import { PullToRefresh,InfiniteScroll } from "antd-mobile";
import { useDispatch, useSelector } from "react-redux";
import { getArticleList } from "@/store/action/home";

// import { sleep } from 'antd-mobile/es/utils/sleep'
export default function ArticleList({ channelId, activeId }) {
  //   const [list, setList] = useState([]);

  const dispatch = useDispatch();

  const current = useSelector((state) => state.home.articles[channelId]);
  const [loading,setLoading] = useState(false)
  const [hasMore,setHasMore] = useState(true)

  useEffect(() => {
    if (current) return;
    if (channelId === activeId) {
      dispatch(getArticleList(channelId, Date.now()));
    }
  }, [channelId, activeId, dispatch, current]);
  if (!current) return null;

  const onRefresh = async ()=>{
    await dispatch(getArticleList(channelId, Date.now()));
    
  }



  const loadMore=()=>{
    
    
    if(loading) return
    setLoading(true)
    


    console.log('正在加载1');
    
  }

  return (
    <div className={styles.root}>
      <div className="articles">
        <PullToRefresh onRefresh={onRefresh}>
          {current.list.map((item) => (
            <div className="article-item" key={item.art_id}>
              <ArticleItem article={item}></ArticleItem>
            </div>
          ))}
        </PullToRefresh>

        <InfiniteScroll loadMore={loadMore}  hasMore={hasMore} />
      </div>
    </div>
  );
}
