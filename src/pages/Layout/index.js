import Icon from "@/components/icon";
import { useLocation, useNavigate, Route, Routes } from "react-router-dom";
import classNames from "classnames";
import styles from "./index.module.scss";
import React,{Suspense} from "react";

const Home = React.lazy(() => import("@/pages/Home"));
const QA = React.lazy(() => import("@/pages/QA"));
const Video = React.lazy(() => import("@/pages/Video"));
const Profile = React.lazy(() => import("@/pages/Profile"));

const tabBar = [
  {
    title: "首页",
    icon: "iconbtn_home",
    path: "/home",
  },
  {
    title: "问答",
    icon: "iconbtn_qa",
    path: "/home/qa",
  },
  {
    title: "视频",
    icon: "iconbtn_video",
    path: "/home/video",
  },
  {
    title: "我的",
    icon: "iconbtn_mine",
    path: "/home/profile",
  },
];
export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className={styles.root}>
      {/* 区域一：点击按钮切换显示内容的区域 */}
      <div className="tab-content">
        <Suspense fallback={<div>loding...</div>}>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="qa" element={<QA></QA>}></Route>
            <Route path="video" element={<Video></Video>}></Route>
            <Route path="profile" element={<Profile></Profile>}></Route>
          </Routes>
        </Suspense>
      </div>
      {/* 区域二：按钮区域，会使用固定定位显示在页面底部 */}
      <div className="tabbar">
        {tabBar.map((item) => (
          <div
            key={item.title}
            // className="tabbar-item tabbar-item-active"
            className={classNames(
              "tabbar-item",
              location.pathname === item.path ? "tabbar-item-active" : ""
            )}
            onClick={() => {
              navigate(item.path);
            }}
          >
            <Icon
              className="icon"
              type={
                location.pathname === item.path ? item.icon + "_sel" : item.icon
              }
            />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
