import NavBar from '@/components/NavBar'

import { Input,ImageUploader } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

const ProfileFeedback = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.root}>
      <NavBar onLeftClick={() => navigate(-1)}>意见反馈</NavBar>

      <div className="wrapper">
        <div className="feedback-item">
          <p className="title">简介</p>
          <div className="textarea-wrap">
            <textarea className="textarea" placeholder="请输入"></textarea>
            <div className="count">0/100</div>
          </div>
          <ImageUploader files={[]} multiple />
          <p className="image-picker-desc">最多6张，单个图片不超过20M。</p>
        </div>

        <div className="feedback-item">
          <p className="title">联系方式</p>
          {/* <InputItem placeholder="请输入手机号码便于联系（非必填）" /> */}
          <Input  placeholder="请输入手机号码便于联系（非必填）"></Input>
        </div>

        <div className="feedback-item feedback-submit">
          <button>提交反馈</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileFeedback