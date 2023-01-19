import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@/components/icon";
import styles from "./index.module.scss";
import { useState } from "react";
import { addUserChannel, delChannel } from "@/store/action/home";
import { Toast } from "antd-mobile";

const Channels = ({ onClose ,active,onChange}) => {
  const userChannels = useSelector((state) => state.home.userChannels);
  const recommentChannels = useSelector(state=>{
    return state.home.allChannels.filter(item=>userChannels.findIndex(v=>v.id===item.id)===-1)
  })
  // 点击切换
  const onClick = (id)=>{
    if(editing) return

    onChange(id)
    
    onClose()
  }
  const dispatch = useDispatch()

  const [editing,setEditing] = useState(false)


  const del = (item,i)=>{

    if(userChannels.length<=4){
      Toast.show('别删了')
      return
    }
    console.log(i);

    if(i<active){
      onChange(active-1)
    }else if(i===active){
      onChange(0)
    }else{
      onChange(active)
    }
    
    
    dispatch(delChannel(item))
    
  }
  const add =(item)=>{
    console.log(item);
    dispatch(addUserChannel(item))
  }
  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames("channel-item",editing?'edit':'')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">{editing?'点击删除频道':'点击进入频道'}</span>
            <span className="channel-item-edit" onClick={()=>setEditing(!editing)}>{editing?'完成':'编辑'}</span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {userChannels.map((item,id) => (
              <span key={item.id} onClick={()=>{onClick(id)}} className= {classnames("channel-list-item",active===id?'selected':'')}>
                {item.name}
                {
                  item.id!==0 && <Icon type="iconbtn_tag_close" onClick={()=>del(item,id)}></Icon>
                }
              </span>
            ))}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {recommentChannels.map(item=>(
              <span key={item.id} className="channel-list-item" onClick={()=>{add(item)}}>{item.name}</span>
            ))}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;
