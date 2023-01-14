import Icon from "@/components/icon";
import Input from "@/components/Input";
import NavBar from "@/components/NavBar";
import { useNavigate } from "react-router-dom";
import { useState ,useEffect, useRef} from "react";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import io from 'socket.io-client'
import { getTokenInfo } from '@/utils/storage'

const Chat = () => {


  const navigate = useNavigate();
  const [messageList, setMessageList] = useState([
    { type: "robot", text: "亲爱的用户你好，小智为您服务。" },
    { type: "user", text: "你好" },
  ]);

  const [msg,setMsg] = useState('')
  const photo = useSelector(state=>state.profile.user.photo)

  const clientRef = useRef('')
  const listRef = useRef()
  useEffect(()=>{
    const client =  io('http://geek.itheima.net', {
      query: {
        token: getTokenInfo().token
      },
      transports: ['websocket']
    })
    clientRef.current =client

    client.on('connect',function(){
        
        // Toast.show('链接服务器成功，开始聊天')
        setMessageList(messageList=>[
            ...messageList,
            {type:'robot',text:'链接成功，开始聊天！'}
        ])
    })

    // message接受到服务器的时间
    client.on('message',function(e){
        setMessageList(messageList=>[
            ...messageList,
            {type:'robot',text:e.msg}
        ])
        console.log(listRef.current.scrollHeight);
        console.log(listRef.current.style.height);
        
    })

    return ()=>{
        client.close()
    }
  },[])
  useEffect(()=>{
    listRef.current.scrollTop = listRef.current.scrollHeight-listRef.current.offsetHeight
  },[messageList])
  const onKeyUp = (e)=>{
    if(e.keyCode!==13) return
    if(!msg) return

    setMessageList([
        ...messageList,
        {type:'user',text:msg}
    ])
    setMsg('')
    console.log(clientRef.current);
    clientRef.current.emit('message',{msg,timestamp:Date.now()})
    
  }
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onLeftClick={() => navigate(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={listRef}>
        {messageList.map((item,ids) => {
          if (item.type === "robot") {
            return (
              <div key={ids} className="chat-item">
                <Icon type="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
            );
          } else {
            return (
              <div key={ids} className="chat-item user">
                <img
                  src={photo}
                  alt=""
                />
                <div className="message">{item.text}</div>
              </div>
            );
          }
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input className="no-border" value={msg} onChange={(e)=>{setMsg(e.target.value)}} onKeyUp={onKeyUp} placeholder="请描述您的问题" />
        <Icon type="iconbianji" />
      </div>
    </div>
  );
};

export default Chat;
