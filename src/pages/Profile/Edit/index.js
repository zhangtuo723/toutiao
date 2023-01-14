import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import NavBar from "@/components/NavBar";
import { List, DatePicker, Popup, Modal } from "antd-mobile";
import { useDispatch, useSelector } from "react-redux";
import { getprofile, updatePhoto, updateProfile,logout } from "@/store/action/profile";
import classNames from "classnames";
import EditInput from "./components/EditInput";
import { useNavigate } from "react-router-dom";
import EditList from "./components/EditList";
import dayjs from "dayjs";
import { removeTokenInfo} from '@/utils/storage'

export default function ProfileEdit() {
  const [visable, setVisable] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const navigate = useNavigate();
  const [open, setOpen] = useState({ visible: false, type: "" });
  const [listOpen, setListOpen] = useState({ visible: false, type: "" });
  const fileRef = useRef(null);
  const fileRef2 = useRef(null);
  const onCloseP = () => {
    setOpen({ visible: false, type: "" });
  };
  const onCloseList = () => {
    setListOpen({ visible: false, type: "" });
  };

  const onSelect = (name, item, idx) => {
    if (name === "gender") {
      dispatch(
        updateProfile({
          gender: item.value,
        })
      );
      onCloseList();
    } else {
      if (item.value === 1) {
        fileRef.current.click();
      } else {
        fileRef2.current.click();
      }
    }
  };
  const listConfigMap = {
    photo: {
      name: "photo",
      items: [
        {
          title: "拍照",
          value: 1,
        },
        {
          title: "本地选择",
          value: 2,
        },
      ],
    },
    gender: {
      name: "gender",
      items: [
        {
          title: "男",
          value: 0,
        },
        {
          title: "女",
          value: 1,
        },
      ],
    },
  };
  const fileClick = async (e) => {
    const fd = new FormData();
    fd.append("photo", e.target.files[0]);
    dispatch(updatePhoto(fd));

    onCloseList();
  };
  const logOut = async () => {
    // Modal.alert({
    //   title: '提示',
    //   content: '确认退出登录吗',
    //   showCloseButton: true,
    //   confirmText:<span>推出</span>,
    //   onConfirm:()=>{
    //     console.log(111);
    //   }
    // })
    Modal.alert({
      content: "退出登录",
      closeOnMaskClick: true,
      onConfirm:()=>{
        dispatch(logout())
        removeTokenInfo()
        navigate('/login')
      }
    });
  };

  useEffect(() => {
    // 拦截判断是否离开当前页面 返回时候model不会取消
    window.addEventListener(
      "popstate",
      function (e) {

        Modal.clear();
      },
      false
    );
  }, []);

  useEffect(() => {
    dispatch(getprofile());
  }, [dispatch]);
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        onLeftClick={() => {
          navigate(-1);
        }}
      >
        个人信息
      </NavBar>
      <div className="wrapper">
        <List className="profile-list">
          <List.Item
            extra={
              <span className="avatar-wrapper">
                <img src={profile.photo} alt="" />
              </span>
            }
            onClick={() => {
              setListOpen({ visible: true, type: "photo" });
            }}
          >
            头像
          </List.Item>
          <List.Item
            extra={profile.name}
            onClick={() => {
              setOpen({ visible: true, type: "name" });
            }}
          >
            昵称
          </List.Item>
          <List.Item
            extra={
              <span
                className={classNames("introl", profile.intro ? "normal" : "")}
              >
                {profile.intro || "未填写"}
              </span>
            }
            onClick={() => {
              setOpen({ visible: true, type: "intro" });
            }}
          >
            简介
          </List.Item>
        </List>

        <List className="profile-list">
          <List.Item
            extra={profile.gender === 0 ? "男" : "女"}
            onClick={() => {
              setListOpen({ visible: true, type: "gender" });
            }}
          >
            性别
          </List.Item>
          <List.Item
            extra={profile.birthday}
            onClick={() => {
              setVisable(true);
            }}
          >
            生日
          </List.Item>
        </List>

        <DatePicker
          title="时间选择"
          visible={visable}
          value={new Date(profile.birthday)}
          onClose={() => {
            setVisable(false);
          }}
          max={new Date()}
          min={new Date("1900-01-01")}
          onConfirm={(val) => {
            const days = dayjs(val);

            const ds = days.format("YYYY-MM-DD");
            dispatch(
              updateProfile({
                birthday: ds,
              })
            );
          }}
        />

        {/* 保证每次visible改变时候组件重新渲染 */}
        {open.visible && (
          <Popup
            visible={open.visible}
            onMaskClick={onCloseP}
            position="right"
            bodyStyle={{ width: "100vw" }}
          >
            {open.visible && (
              <EditInput onCloseP={onCloseP} type={open.type}></EditInput>
            )}
          </Popup>
        )}

        <div onChange={fileClick}>
          <input type="file" hidden ref={fileRef} capture="camera" />
          <input type="file" hidden ref={fileRef2} />
        </div>

        <Popup
          visible={listOpen.visible}
          onMaskClick={onCloseList}
          position="bottom"
          // bodyStyle={{ height: "30vh" }}
        >
          {/* 这个input用来选文件 */}

          <EditList
            onClose={onCloseList}
            onSelect={onSelect}
            config={listConfigMap[listOpen.type]}
          ></EditList>
        </Popup>
      </div>
      <div className="logout" onClick={logOut}>
        <button className="btn">退出登录</button>
      </div>
    </div>
  );
}
