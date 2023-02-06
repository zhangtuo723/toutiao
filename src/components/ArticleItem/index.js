import "dayjs/locale/zh-cn";
import classnames from "classnames";

import Icon from "@/components/icon";
import Image from "../Img";
import styles from "./index.module.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDispatch, useSelector } from "react-redux";
import { setMoreAction } from "@/store/action/home";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

// type Props = {
//   /**
//    * 0 表示无图
//    * 1 表示单图
//    * 3 表示三图
//    */
//   type: 0 | 1 | 3
// }

const ArticleItem = ({ article,ch_id }) => {
  // console.log(article);
  const {
    cover: { type, images },
  } = article;
  const isLogin = useSelector((state) => !!state.login.token);
  const dispatch = useDispatch();
  return (
    <div className={styles.root}>
      <div
        className={classnames(
          "article-content",
          type === 3 && "t3",
          type === 0 && "none-mt"
        )}
      >
        <h3>{article.title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, i) => (
              <div key={i} className="article-img-wrapper">
                {/* <img src={item} alt="" /> */}
                <Image src={item} alt=""></Image>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames("article-info", type === 0 && "none-mt")}>
        <span>{article.aut_name}</span>
        <span>{article.comm_count}</span>
        <span>{dayjs(article.pubdate).fromNow(true)}</span>

        {isLogin && (
          <span className="close">
            <Icon
              type="iconbtn_essay_close"
              onClick={() => {
                dispatch(
                  setMoreAction({
                    visible: true,
                    articleId: article.art_id,
                    cahnnelId:ch_id
                  })
                );
              }}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default ArticleItem;
