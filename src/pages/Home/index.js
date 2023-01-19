import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Tabs from "@/components/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { getAllChannels, getUserChannels } from "@/store/action/home";
import Icon from "@/components/icon";
import { Popup } from "antd-mobile";
import Channels from './component/Channels'
import ArticleList from "./component/ArticleList";
export default function Home() {
  const channels = useSelector((state) => state.home.userChannels);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserChannels());
    dispatch(getAllChannels())
  }, [dispatch]);
  const [open, setOpen] = useState(false);
  
  const onClose = ()=>{
    setOpen(false)
  }
  const [active,setActive] = useState(0)
  return (
    <div className={styles.root}>
      <Tabs tabs={channels} index={active} onChange={(id)=>{setActive(id)}}>
        {/* 放对应数量的articlelist */}
        {
          channels.map((item)=><ArticleList key={item.id} channelId={item.id}></ArticleList>)
        }
      </Tabs>
      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon
          type="iconbtn_channel"
          onClick={() => {
            setOpen(true);
          }}
        />
      </div>
      <Popup
        visible={open}
        onMaskClick={() => {
          setOpen(false);
        }}
        position="right"
        bodyStyle={{ width: "100vw" ,overflow:'auto'}}
      >
        <Channels active={active} onClose={onClose} onChange={(id)=>{setActive(id)}}></Channels>
      </Popup>
    </div>
  );
}
