import "dayjs/locale/zh-cn";
import classnames from "classnames";

import Icon from "@/components/icon";

import styles from "./index.module.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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

const ArticleItem = ({ article }) => {
  // console.log(article);
  const {
    cover: { type, images },
  } = article;

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
                <img src={item} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames("article-info", type === 0 && "none-mt")}>
        <span>{article.aut_name}</span>
        <span>{article.comm_count}</span>
        <span>{dayjs(article.pubdate).fromNow(true)}</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  );
};

export default ArticleItem;
